import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const napRouter = createTRPCRouter({
  getNaps: publicProcedure.query(async ({ ctx }) => {
    const naps = await ctx.prisma.nap.findMany();

    if (!naps) throw new TRPCError({ code: "NOT_FOUND" });

    return naps;
  }),
  getNapByBaby: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.nap.findMany({
          where: {
            babyId: input.baby_id,
          },
        });
      } catch (error) {
        console.error(
          `Error retrieving naps for baby_id: ${input.baby_id}:`,
          error
        );
        return null;
      }
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
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.nap.create({
          data: {
            babyId: input.babyId,
            milk: input.milk,
            start: input.napStart,
            end: input.napEnd,
            durationMinutes: input.durationMinutes,
          },
        });
      } catch (error) {
        console.error("Error creating nap:", error);
        return null;
      }
    }),
  deleteNap: publicProcedure
    .input(z.object({ nap_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.nap.delete({
          where: {
            id: input.nap_id,
          },
        });
      } catch (error) {
        console.error(`Error deleting nap with id: ${input.nap_id}:`, error);
        return null;
      }
    }),
});
