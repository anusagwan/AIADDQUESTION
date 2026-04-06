import { Ollama } from "@langchain/ollama";

export const generateAnswer = async (query, docs) => {

  const model = new Ollama({
    model: "llama3",
    temperature: 0.2
  });

  const context = docs
    .map((doc) => doc.pageContent)
    .join("\n");

  const prompt = `
You are an AI interview assistant.

Use the following interview questions as context.

Context:
${context}

User Question:
${query}

Provide a helpful answer.
`;

  const response = await model.invoke(prompt);

  return response;
};