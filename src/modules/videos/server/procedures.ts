import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {videos} from "@/db/schema";
import {TRPCError} from "@trpc/server";

export const videosRouter = createTRPCRouter({
    create: protectedProcedure
        .mutation(async ({ctx}) => {
            const {id: userId} = ctx.user;

            // throw new TRPCError({code: "BAD_REQUEST", message: "Failed to add video"});

            const [video] = await db
                .insert(videos)
                .values({userId, title: "Undefined"})
                .returning();

            return {video};
        })
})