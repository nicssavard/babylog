import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const sleepTime = Array.from({ length: 24 }, (_, i) => i.toString()); // 0 to 23 hours

const calculateAverageSleep = (sleeps: Sleep[]) => {
  const sleepDurations = new Array(24).fill(0);
  const sleepAmount = new Array(24).fill(0);

  sleeps.forEach((sleep) => {
    const sleepStart = sleep.start.getUTCHours();
    const sleepDuration = sleep.durationMinutes;
    sleepDurations[sleepStart] += sleepDuration;
    sleepAmount[sleepStart] += 1;
  });

  return sleepDurations.map((duration, index) => {
    if (sleepAmount[index] === 0) {
      return 0;
    }
    return duration / sleepAmount[index] / 60;
  });
};

export const chartRouter = createTRPCRouter({
  getSleepDurationByBedTimeChart: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const sleeps = await ctx.prisma.sleep.findMany({
        where: {
          babyId: input.baby_id,
        },
      });

      const sleepAverage = calculateAverageSleep(sleeps);

      return {
        labels: sleepTime.slice(18), // slice to only show hours from 18 to 23
        datasets: [
          {
            label: "sleep duration by bed time",
            data: sleepAverage.slice(18), // slice to only show hours from 18 to 23
            borderWidth: 1,
            backgroundColor: "rgb(96 165 250)",
            borderColor: "rgb(96 165 250)",
          },
        ],
      };
    }),
  getSleepDurationByDateChart: publicProcedure
    .input(
      z.object({ baby_id: z.string(), month: z.number(), year: z.number() })
    )
    .query(async ({ ctx, input }) => {
      const sleeps = await ctx.prisma.sleep.findMany({
        where: {
          babyId: input.baby_id,
        },
      });
      const month = input.month;
      const year = input.year;

      const filteredSleeps = sleeps.filter((sleep) => {
        return (
          sleep.start.getFullYear() === year &&
          sleep.start.getMonth() + 1 === month // getMonth() returns 0 to 11
        );
      });
      const sleepDuration = filteredSleeps.map((sleep) => {
        return sleep.durationMinutes;
      });
      const dates = filteredSleeps.map((sleep) => {
        return sleep.start.getDate();
      });

      return {
        labels: dates,
        datasets: [
          {
            label: "sleep duration by date",
            data: sleepDuration,
            borderWidth: 1,
            backgroundColor: "rgb(96 165 250)",
            borderColor: "rgb(96 165 250)",
          },
        ],
      };
    }),
  getSleepMonthList: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const sleeps = await ctx.prisma.sleep.findMany({
        where: {
          babyId: input.baby_id,
        },
      });
      const monthList = new Set<number>();
      sleeps.forEach((sleep) => {
        monthList.add(sleep.start.getMonth() + 1);
      });
      return Array.from(monthList);
    }),
  getSleepYearList: publicProcedure
    .input(z.object({ baby_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const sleeps = await ctx.prisma.sleep.findMany({
        where: {
          babyId: input.baby_id,
        },
      });
      const yearList = new Set<number>();
      sleeps.forEach((sleep) => {
        yearList.add(sleep.start.getFullYear());
      });
      return Array.from(yearList);
    }),
});
