import { QdrantVectorStore } from "@langchain/qdrant";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { Document } from "@langchain/core/documents";

export const addQuestion = async (req, res) => {

  const { company, role, experience, questions } = req.body;

  const embeddings = new HuggingFaceTransformersEmbeddings();

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "interview_questions",
    }
  );

  const doc = questions.map((q) =>
      new Document({
        pageContent: q,   // THIS is the important field
        metadata: {
          company,
          role,
          experience
        }
      })
    );
  await vectorStore.addDocuments(doc);

  res.json({ message: "Question added successfully" });
};