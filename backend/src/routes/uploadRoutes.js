import express from "express";
import { upload } from "../../utils/upload.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload-pdf", upload.single("file"), uploadFile);

export default router;