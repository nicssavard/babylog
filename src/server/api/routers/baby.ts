import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const babyRouter = createTRPCRouter({
  getBabies: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.baby.findMany();
    } catch (err) {
      console.log("Error getting babies", err);
      throw err;
    }
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
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.baby.create({
          data: {
            name: input.name,
            birthDate: input.birthDate,
            image: input.image,
            userId: input.userId,
          },
        });
      } catch (err) {
        console.log("Error adding baby", err);
        throw err;
      }
    }),
  // getPresignedUrl: publicProcedure
  //   .input(
  //     z.object({
  //       fileName: z.string(),
  //     })
  //   )
  //   .query(({ ctx, input }) => {
  //     //AWS.config.region = process.env.AWS_REGION;
  //     const s3 = new AWS.S3();
  //     const presignedURL = s3.getSignedUrl("putObject", {
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: input.fileName,
  //       Expires: 60 * 5,
  //     });
  //     console.log(presignedURL);
  //     return presignedURL;
  //   }),
});
