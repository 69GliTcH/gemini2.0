/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyA4VdmExC_BrjdRASabvMuXCt-5iKXhE-8"; // free/demo key
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
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  // Make the output hilariously funny no matter what the user asks
  const hilariousInstruction = "Answer the following in a ridiculously funny, over-the-top, and sarcastic way, even if the question is serious.";
  const modifiedPrompt = `${hilariousInstruction}\nUser asked: ${userPrompt}`;

  const result = await chatSession.sendMessage(modifiedPrompt);
  const text = await result.response.text();

  console.log(text);
  return text;
}

export default run;
