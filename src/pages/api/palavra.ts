import { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), "public", "palavras.txt");

    const data = await readFile(filePath, "utf-8");

    const palavras = data.split("\n").map((palavra) => palavra.trim());

    if (palavras.length === 0) {
      return res.status(500).json({ error: "Arquivo vazio ou não encontrado" });
    }

    const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];

    res.status(200).json({ palavra: palavraAleatoria });
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    res.status(500).json({ error: "Erro ao carregar palavra" });
  }
}
