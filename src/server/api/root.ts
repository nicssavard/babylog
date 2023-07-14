import { basename } from "path";
import { exampleRouter } from "~/server/api/routers/example";
import { babiesRouter } from "~/server/api/routers/babies";
import { createTRPCRouter } from "~/server/api/trpc";
import { sleepRouter } from "./routers/sleep";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  baby: babiesRouter,
  sleep: sleepRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
