/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDvptWk25it6QxjZpAzkKmT2YVfSzhGP5c"; // replace with your new free API key
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
  // Randomize roast style for fun
  const roastStyles = [
    "like a sarcastic villain",
    "with grim humor",
    "like a ruthless stand-up comedian",
    "with dark, clever sarcasm",
    "as a brutally honest narrator"
  ];
  const style = roastStyles[Math.floor(Math.random() * roastStyles.length)];

  // Prepend dark roast instruction
  const darkRoastInstruction = `Respond to the user's prompt in a dark roast style (${style}). Make it funny, clever, and sarcastic, but avoid real personal attacks.`;
  const modifiedPrompt = `${darkRoastInstruction}\nUser asked: ${userPrompt}`;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(modifiedPrompt);
    const text = await result.response.text();

    console.log(text);
    return text;

  } catch (err) {
    console.log("Gemini API issue — returning a random dark roast fallback!");

    // Random fallback dark roast if API fails
    const mockResponses = [
      `Oh, "${userPrompt}"? I didn’t know basic questions were considered groundbreaking.`,
      `You asked "${userPrompt}"? Clearly your ambition exceeds your comprehension.`,
      `"${userPrompt}"? Fascinating — said no intelligent person ever.`,
      `Ah yes, "${userPrompt}" — a question worthy of a nap.`,
      `Trying to ask "${userPrompt}"? Bold move for someone who thinks that counts as genius.`
    ];

    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    return mockResponses[randomIndex];
  }
}

export default run;
