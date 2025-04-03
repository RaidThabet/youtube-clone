import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videos, videoUpdateSchema} from "@/db/schema";
import {mux} from "@/lib/mux";
import {and, eq} from "drizzle-orm";
import {TRPCError} from "@trpc/server";

export const videosRouter = createTRPCRouter({
    update: protectedProcedure
        .input(videoUpdateSchema)
        .mutation(async ({ctx, input}) => {
            const {id: userId} = ctx.user;

            if (!input.id) {
                throw new TRPCError({code: "BAD_REQUEST"});
            }

            const [updatedVideo] = await db
                .update(videos)
                .set({
                    title: input.title,
                    description: input.description,
                    categoryId: input.categoryId,
                    videoVisibility: input.videoVisibility,
                    updatedAt: input.updatedAt
                })
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId)
                ))
                .returning();

            if (!updatedVideo) {
                throw new TRPCError({code: "NOT_FOUND"})
            }

        }),
    create: protectedProcedure
        .mutation(async ({ctx}) => {
            const {id: userId} = ctx.user;

            const upload = await mux.video.uploads.create({
                new_asset_settings: {
                    passthrough: userId,
                    playback_policies: ["public"],
                    inputs: [
                        {
                            generated_subtitles: [
                                {
                                    language_code: "en",
                                    name: "English"
                                }
                            ]
                        }
                    ]
                },
                cors_origin: "*" // TODO: in production, set to your url
            })

            // throw new TRPCError({code: "BAD_REQUEST", message: "Failed to add video"});

            const [video] = await db
                .insert(videos)
                .values({
                    userId,
                    title: "Undefined",
                    muxStatus: "waiting",
                    muxUploadId: upload.id
                })
                .returning();

            return {video, url: upload.url};
        })
})