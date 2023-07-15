import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const chartRouter = createTRPCRouter({
  getSleeps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.sleep.findMany();
  }),
  getSleepByBaby: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.sleep.findMany({
        where: {
          babyId: input.baby_id,
        },
      });
    }),
  addSleep: publicProcedure
    .input(
      z.object({
        babyId: z.string(),
        milk: z.number(),
        sleepStart: z.date(),
        sleepEnd: z.date(),
        durationMinutes: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.baby;
      return ctx.prisma.sleep.create({
        data: {
          babyId: input.babyId,
          milk: input.milk,
          start: input.sleepStart,
          end: input.sleepEnd,
          durationMinutes: input.durationMinutes,
        },
      });
    }),
  deleteSleep: publicProcedure
    .input(z.object({ sleep_id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.sleep.delete({
        where: {
          id: input.sleep_id,
        },
      });
    }),
  getSleepDurationByBedTimeChart: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(({ ctx, input }) => {
      const sleeps = ctx.prisma.sleep.findMany({
        where: {
          babyId: input.baby_id,
        },
      });
      return "hello";
    }),
});
