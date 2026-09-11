import { GoogleGenAI } from "@google/genai";
import { Dispatch, SetStateAction } from "react";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export const generateContent = async (
  prompt: string,
  {
    setContent,
    setIsThinking,
  }: {
    setContent: Dispatch<SetStateAction<string>>;
    setIsThinking: Dispatch<SetStateAction<boolean>>;
  },
) => {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  for await (const chunk of response) {
    setContent((prev: string) => prev + chunk.text);
  }

  setIsThinking(false);
};
