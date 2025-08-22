/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCIpqvdYXraSy1lduLgz1UbzMIRov4MneE"; // free/demo key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // free-tier supported model
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(userPrompt) {
  // Instruction to make it hilarious
  const hilariousInstruction = "Answer the following in a ridiculously funny, over-the-top, and sarcastic way, even if the question is serious.";
  const modifiedPrompt = `${hilariousInstruction}\nUser asked: ${userPrompt}`;

  try {
    const result = await model.generateContent(modifiedPrompt);
    const text = await result.response.text();

    console.log(text);
    return text;

  } catch (err) {
    console.log("Gemini API issue — returning a mock hilarious response!");
    const mockResponses = [
      "Quantum physics is just tiny particles having a disco party!",
      "AI works by bribing electrons with cookies 🍪",
      "The internet is secretly run by cats in lab coats 🐱‍🔬",
      "Everything you know is a simulation 😎"
    ];
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    return mockResponses[randomIndex];
  }
}


export default run;
