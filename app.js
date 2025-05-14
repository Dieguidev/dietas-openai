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

let userData = {};

app.post("/api/nutri-chat", async (req, res) => {
  const userMessage = req.body.message;
  const userId = req.body.userId;

  if (!userData[userId]) {
    userData[userId] = {};
  }

  if (!userData[userId].peso) {
    userData[userId].peso = userMessage;
    return res.json({ reply: "¿Cuánto mides en (cm)?" });
  }

  if (!userData[userId].altura) {
    userData[userId].altura = userMessage;
    return res.json({
      reply: "¿Cuál es tu objetivo? (adelgazar, mantener o subir de peso)",
    });
  }

  if (!userData[userId].objetivo) {
    userData[userId].objetivo = userMessage;
    return res.json({ reply: "¿Tienes alguna alergia?" });
  }

  if (!userData[userId].alergias) {
    userData[userId].alergias = userMessage;
    return res.json({ reply: "¿Qué alimentos no te gustan?" });
  }

  if (!userData[userId].noGusta) {
    userData[userId].noGusta = userMessage;
    return res.json({ reply: "¿Cuántas comidas quieres hacer cada dia?" });
  }

  if (!userData[userId].comidas) {
    userData[userId].comidas = userMessage;
  }

  userData[userId] = {};

  return res.json({
    reply:
      "Gracias por tus respuestas. Ya tienes tu dieta creada, usa los ingredientes para hacer una receta",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
