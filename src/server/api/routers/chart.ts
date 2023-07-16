import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const chartRouter = createTRPCRouter({
  getSleepDurationByBedTimeChart: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const sleeps = await ctx.prisma.sleep.findMany({
        where: {
          babyId: input.baby_id,
        },
      });

      const sleepTime: Array<string> = [
        "0am",
        "1am",
        "2am",
        "3am",
        "4am",
        "5am",
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "13pm",
        "14pm",
        "15pm",
        "16pm",
        "17pm",
        "18pm",
        "19pm",
        "20pm",
        "21pm",
        "22pm",
        "23pm",
      ];
      const sleepDurations: number[] = Array(24).fill(0) as number[];
      const sleepAmount: number[] = Array(24).fill(0) as number[];
      const sleepAverage: number[] = Array(24).fill(0) as number[];

      sleeps.forEach((sleep) => {
        const sleepStart = sleep.start.getHours();
        const sleepDuration = sleep.durationMinutes;
        sleepDurations[sleepStart] += sleepDuration;
        sleepAmount[sleepStart] += 1;
      });

      sleepDurations.forEach((duration, index) => {
        if (sleepAmount[index] === 0) {
          sleepAverage[index] = 0;
        } else if (sleepAmount[index] != undefined && duration != undefined) {
          //Tried to test for undiefined but it still gives me an error
          // eslint-disable-next-line
          // @ts-ignore
          sleepAverage[index] = duration / sleepAmount[index];
        }
      });

      return {
        labels: sleepTime.slice(18, 24), //slice to only show 6 hours from 18pm to 24pm
        datasets: [
          {
            label: "sleep duration (min)",
            data: sleepAverage.slice(18, 24), //slice to only show 6 hours from 18pm to 24pm
            borderWidth: 1,
          },
        ],
      };
    }),
});
