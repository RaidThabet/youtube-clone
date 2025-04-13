import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videos, videoUpdateSchema} from "@/db/schema";
import {mux} from "@/lib/mux";
import {and, eq} from "drizzle-orm";
import {TRPCError} from "@trpc/server";
import {z} from "zod";

export const videosRouter = createTRPCRouter({
    restoreThumbnail: protectedProcedure
        .input(z.object({id: z.string().uuid()}))
        .mutation(async ({ctx, input}) => {
            const {id: userId} = ctx.user;

            const [existingVideo] = await db
                .select()
                .from(videos)
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId)
                ));

            if (!existingVideo) {
                throw new TRPCError({code: "NOT_FOUND"});
            }

            if (!existingVideo.muxPlaybackId) {
                throw new TRPCError({code: "BAD_REQUEST"});
            }

            const thumbnailUrl = `https://image.mux.com/${existingVideo.muxPlaybackId}/thumbnail.jpg`;

            const [updatedVideo] = await db
                .update(videos)
                .set({
                    thumbnailUrl
                })
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId)
                ))
                .returning();

            return updatedVideo;
        }),
    remove: protectedProcedure
        .input(z.object({id: z.string().uuid()}))
        .mutation(async ({ctx, input}) => {
            const {id: userId} = ctx.user;

            const [deletedVideo] = await db
                .delete(videos)
                .where(and(
                    eq(videos.id, input.id),
                    eq(videos.userId, userId)
                ))
                .returning();

            if (!deletedVideo) {
                throw new TRPCError({code: "NOT_FOUND"});
            }

            return deletedVideo;
        }),
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

            return updatedVideo;
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