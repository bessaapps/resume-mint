import { pipeline } from "@huggingface/transformers";

let generator = null;

self.addEventListener("message", async (event) => {
  const { type, text } = event.data;

  if (type === "init") {
    generator = await pipeline(
      "text-generation",
      "HuggingFaceTB/SmolLM2-135M-Instruct",
      {
        dtype: "q4",
        device: "webgpu",
        progress_callback: (info) => {
          if (info.status === "progress") {
            console.log("downloading: ", info.file, info.progress);
          }
        },
      },
    );
  }

  if (type === "generate") {
    const messages = [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: text },
    ];

    const output = await generator(messages, { max_new_tokens: 50 });
    console.log("output", output);
    self.postMessage(output?.[0]?.generated_text?.[2]?.content);
  }
});
