import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import AWS from "aws-sdk";

export const babyRouter = createTRPCRouter({
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
  getPresignedUrl: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      console.log(input.fileName);
      console.log("createPresignedUrl");
      AWS.config.region = process.env.AWS_REGION;
      const s3 = new AWS.S3();
      const presignedURL = s3.getSignedUrl("putObject", {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: input.fileName,
        Expires: 60 * 5,
      });
      console.log(presignedURL);
      return presignedURL;
    }),
});
