import fs from "fs";
import { Document } from "@langchain/core/documents";
import { getVectorStore } from "../ai/vectorStore.js";
import { loadDocument } from "../../utils/loadDocument.js";

export const uploadFile = async (req,res)=>{

  try{

    const { company, role, experience } = req.body;

    if(!req.file){
      return res.status(400).json({error:"No file uploaded"});
    }

    const filePath = req.file.path;

    console.log("Loading document...");

    const docs = await loadDocument(filePath);

    const vectorStore = await getVectorStore();

    const formattedDocs = docs.map(doc =>
      new Document({
        pageContent: doc.pageContent,
        metadata:{
          company: company?.toLowerCase(),
          role,
          experience,
          source:"upload"
        }
      })
    );

    await vectorStore.addDocuments(formattedDocs);

    fs.unlinkSync(filePath);

    res.json({
      message:"File uploaded successfully",
      totalChunks: formattedDocs.length
    });

  }catch(err){

    console.error(err);

    res.status(500).json({
      error:"Upload failed"
    });

  }

};