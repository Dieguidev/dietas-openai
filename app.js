import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai/index.mjs";

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

app.post("/api/traducir", async (req, res) => {
  const { text, targetLang } = req.body;

  const prompSystem1 = "Eres un traductor profesional.";
  const prompSystem2 =
    "Solo puedes responder con una traduccion directa del texto que el usuario te envie." +
    "Cualquier otra respuesta o conversacion esta prohibida";
  const prompUser = `Traduce el siguiente texto al ${targetLang}: ${text.trim()}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompSystem1 },
        { role: "system", content: prompSystem2 },
        { role: "user", content: prompUser },
      ],
      max_tokens: 500,
      response_format: { type: "text" },
    });

    const translatedText = completion.choices[0].message.content;

    return res.status(200).json({
      translatedText,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error al traducir el texto",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
