import { embeddings } from "../ai/embeddings.js";
import { QdrantVectorStore } from "@langchain/qdrant";
import { generateAnswer } from "../services/ragService.js";

export const searchQuestions = async (req, res) => {

  try {

    const { query, company } = req.body;

    console.log("Searching:", query);

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: "http://127.0.0.1:6333",
        collectionName: "interview_questions"
      }
    );

    console.log("Connected to Qdrant");

    const docs = await vectorStore.similaritySearch(query, 10);

    console.log("Docs retrieved:", docs.length);

    const filtered = docs.filter(
      (doc) => doc.metadata.company === company
    );

    if (filtered.length === 0) {
      return res.json({
        answer: "No questions found for this company",
        sources: []
      });
    }

    const answer = await generateAnswer(query, filtered);

    res.json({
      answer,
      sources: filtered
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Search failed"
    });

  }

};