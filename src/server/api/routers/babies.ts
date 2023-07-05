import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const babiesRouter = createTRPCRouter({
  getBabies: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.baby.findMany();
  }),
  addBaby: publicProcedure
    .input(
      z.object({
        name: z.string(),
        birthDate: z.date(),
        image: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.baby.create({
        data: {
          name: input.name,
          birthDate: input.birthDate,
          image: input.image,
          userId: input.userId,
        },
      });
    }),
});
