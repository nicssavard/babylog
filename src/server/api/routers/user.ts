import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
  addUser: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const saltRounds = 10;
      const myPlaintextPassword = input.password;

      let password;
      bcrypt.genSalt(
        saltRounds,
        function (err: Error | undefined, salt: string) {
          bcrypt.hash(
            myPlaintextPassword,
            salt,
            async function (err: Error | undefined, hash: string) {
              password = hash;
              console.log(password);
              const user = await ctx.prisma.user.create({
                data: {
                  firstName: input.firstName,
                  lastName: input.lastName,
                  email: input.email,
                  password: password,
                },
              });
              console.log(user);
              return user;
            }
          );
        }
      );
    }),
});
