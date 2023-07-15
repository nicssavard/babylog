import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const napRouter = createTRPCRouter({
  getNaps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.nap.findMany();
  }),
  getNapByBaby: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.nap.findMany({
        where: {
          babyId: input.baby_id,
        },
      });
    }),
  addNap: publicProcedure
    .input(
      z.object({
        babyId: z.string(),
        milk: z.number(),
        napStart: z.date(),
        napEnd: z.date(),
        durationMinutes: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.baby;
      return ctx.prisma.nap.create({
        data: {
          babyId: input.babyId,
          milk: input.milk,
          start: input.napStart,
          end: input.napEnd,
          durationMinutes: input.durationMinutes,
        },
      });
    }),
  deleteNap: publicProcedure
    .input(z.object({ nap_id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.nap.delete({
        where: {
          id: input.nap_id,
        },
      });
    }),
});
