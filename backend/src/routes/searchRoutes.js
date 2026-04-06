import express from "express";
import { searchQuestions } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", searchQuestions);

export default router;