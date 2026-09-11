import { Dispatch, SetStateAction } from "react";

const aiWorker = new Worker(new URL("./ai-worker.ts", import.meta.url), {
  type: "module",
});
aiWorker.postMessage({ type: "init" });
aiWorker.onmessage = (event) => {
  console.log("aiworkerRef", event.data);
};

export const generateContent = async (
  prompt: string,
  {
    setCoverLetter,
    setIsThinking,
  }: {
    setCoverLetter: Dispatch<SetStateAction<string>>;
    setIsThinking: Dispatch<SetStateAction<boolean>>;
  },
) => {
  aiWorker.postMessage({ type: "generate", prompt });

  setIsThinking(false);
};
