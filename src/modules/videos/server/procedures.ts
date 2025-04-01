import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videos} from "@/db/schema";
import {mux} from "@/lib/mux";

export const videosRouter = createTRPCRouter({
    create: protectedProcedure
        .mutation(async ({ctx}) => {
            const {id: userId} = ctx.user;

            const upload = await mux.video.uploads.create({
                new_asset_settings: {
                    passthrough: userId,
                    playback_policies: ["public"],
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