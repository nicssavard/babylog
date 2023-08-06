import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(4, "60 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

const configuration = new Configuration({
  organization: "org-ZhyLKT8RaElwQbnD0ICs1kcc",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatRouter = createTRPCRouter({
  askOpenAI: publicProcedure
    .input(z.object({ messages: z.array(z.string()), userID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userID,
        },
      });
      if (!user) {
        return "No user found";
      }

      const { success } = await ratelimit.limit(input.userID);

      if (!success) {
        throw new Error("Rate limit exceeded");
      }

      let messages: Message[] = [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: "You are a helpful assistant.",
        },
      ];
      const messagesAppend: Message[] = input.messages.map((message, index) => {
        const role =
          index % 2 === 0
            ? ChatCompletionRequestMessageRoleEnum.User
            : ChatCompletionRequestMessageRoleEnum.Assistant;
        return {
          role: role,
          content: message,
        };
      });

      messages = [...messages, ...messagesAppend];

      const ChatGPTAnswer = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const messageContent = ChatGPTAnswer.data.choices[0]?.message?.content;
      return messageContent ?? "No message content found";
      //return "To help your baby sit faster, you can try the following: 1. Create a supportive environment: Start by placing your baby on a soft, padded surface or a supportive chair with a cushion. This will provide stability and security as they learn to sit. 2. Assisted sitting: Sit behind your baby and use your hands to support their back and provide balance. This will help them gradually develop core strength and stability. 3. Prop up with pillows or cushions: Use pillows or cushions to create a support system around your baby to prevent them from tipping over. This will give them additional stability and confidence as they practice sitting. 4. Encourage tummy time: Tummy time helps strengthen the muscles in your baby's neck, back, and core, which are all essential for sitting independently. Regular tummy time sessions can aid in their overall development. 5. Encourage reaching and grabbing: Place toys or objects just out of your baby's reach to encourage them to reach, grasp, and engage their core muscles. This will help them develop the necessary strength and balance for sitting. 6. Offer sitting opportunities: Provide regular opportunities for your baby to practice sitting throughout the day. Encourage sitting during playtime or while engaging in activities like reading books or playing with colorful toys. Remember that every baby develops at their own pace, so be patient and avoid rushing the process. Celebrate each small achievement and offer lots of praise and encouragement to boost your baby's confidence.";
    }),
});
