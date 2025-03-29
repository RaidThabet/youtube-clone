import { z } from 'zod';
import {baseProcedure, createTRPCRouter, protectedProcedure} from '../init';
// import {auth} from "@clerk/nextjs/server";
// import {TRPCError} from "@trpc/server";
export const appRouter = createTRPCRouter({
    hello: protectedProcedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .query(async (opts) => {
            // does not make sense to do this every single time
            // const {userId} = await auth();
            // console.log(userId);

            // console.log(opts.ctx.clerkUserId);
            console.log({dbUser: opts.ctx.user})

            return {
                greeting: `hello ${opts.input.text}`,
            };
        }),
});
// export type definition of API
export type AppRouter = typeof appRouter;