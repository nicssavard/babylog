import { babyRouter } from "~/server/api/routers/baby";
import { createTRPCRouter } from "~/server/api/trpc";
import { sleepRouter } from "./routers/sleep";
import { napRouter } from "./routers/nap";
import { chartRouter } from "./routers/chart";
import { userRouter } from "./routers/user";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  baby: babyRouter,
  sleep: sleepRouter,
  nap: napRouter,
  chart: chartRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
