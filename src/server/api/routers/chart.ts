import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const sleepTime = Array.from({ length: 24 }, (_, i) => i.toString()); // 0 to 23 hours

const calculateAverageSleep = (sleeps: Sleep[]) => {
  console.log(sleeps);
  const sleepDurations = new Array(24).fill(0);
  const sleepAmount = new Array(24).fill(0);

  sleeps.forEach((sleep: Sleep) => {
    const sleepStart = sleep.start.getHours();
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
          },
        ],
      };
    }),
});
