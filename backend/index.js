import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import questionRoutes from "./src/routes/questionRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/search", searchRoutes);
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});