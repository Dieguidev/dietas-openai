import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//servir frontend
app.use("/", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Instancia de openai pasandole el api key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/nutri-chat", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
