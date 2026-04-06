import { HuggingFaceTransformersEmbeddings } 
from "@langchain/community/embeddings/huggingface_transformers";

import { QdrantVectorStore } from "@langchain/qdrant";

let vectorStore = null;

export const getVectorStore = async () => {

  if (vectorStore) {
    return vectorStore;
  }

  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: "Xenova/all-MiniLM-L6-v2"
  });

  vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://127.0.0.1:6333",
      collectionName: "interview_questions"
    }
  );

  return vectorStore;
};