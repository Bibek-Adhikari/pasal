import { generateStoreResponse } from "./services/geminiService";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "Yes" : "No");

async function test() {
  console.log("--- Test 1: Valid Shop Inquiry ---");
  const resp1 = await generateStoreResponse("What is the address of Vinayak Suppliers?");
  console.log("Response:", resp1);

  console.log("\n--- Test 2: Invalid General Inquiry ---");
  const resp2 = await generateStoreResponse("Who is the Prime Minister of Nepal?");
  console.log("Response:", resp2);

  console.log("\n--- Test 3: Product Inquiry ---");
  const resp3 = await generateStoreResponse