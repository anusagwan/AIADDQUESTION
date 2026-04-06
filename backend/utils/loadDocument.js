import fs from "fs";
import path from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";

export const loadDocument = async (filePath) => {

  const ext = path.extname(filePath).toLowerCase();

  console.log("Detected extension:", ext);

  if (ext === ".pdf") {
    const loader = new PDFLoader(filePath);
    return await loader.load();
  }

  if (ext === ".txt") {
    const text = fs.readFileSync(filePath, "utf8");
    return [new Document({ pageContent: text })];
  }

  if (ext === ".csv") {
    const loader = new CSVLoader(filePath);
    return await loader.load();
  }

  if (ext === ".docx") {
    const loader = new DocxLoader(filePath);
    return await loader.load();
  }

  throw new Error(`Unsupported file type: ${ext}`);
};