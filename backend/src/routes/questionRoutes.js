import express from "express";
import { addQuestion } from "../controllers/questionController.js";

const router = express.Router();

router.post("/", addQuestion);

export default router;