"use client";

import OpenAI from "openai";
import { Dispatch, SetStateAction } from "react";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateContent = async (
  input: string,
  {
    setContent,
    setIsThinking,
  }: {
    setContent: Dispatch<SetStateAction<string>>;
    setIsThinking: Dispatch<SetStateAction<boolean>>;
  },
) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: input }],
    model: "deepseek-flash",
    stream: true,
  });

  for await (const chunk of completion) {
    if (chunk?.choices?.[0]?.delta?.content)
      setContent((prev) => prev + chunk.choices[0].delta.content);
  }

  setIsThinking(false);
};
