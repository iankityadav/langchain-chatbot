// @ts-check
import express, { json } from "express";
import { ChatOllama } from "@langchain/ollama";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { RedisChatMessageHistory } from "@langchain/redis";

// Tools
const getPolicyInfo = tool(
  async ({ policyId }) => {
    const res = await fetch(`http://host.docker.internal:3001/api/policy/${policyId}`);
    return await res.json();
  },
  {
    name: "getPolicyInfo",
    description: "Fetch policy info by ID.",
    schema: z.object({ policyId: z.string() })
  }
);

const updatePolicyStatus = tool(
  async ({ policyId, newStatus }) => ({
    id: policyId,
    updated_status: newStatus,
    message: "Policy status updated successfully!"
  }),
  {
    name: "updatePolicyStatus",
    description: "Update status for a given policy ID.",
    schema: z.object({ policyId: z.string(), newStatus: z.string() })
  }
);

const sessionId = "session-1";
const history = new RedisChatMessageHistory({
  sessionId,
  config: {
    url: "redis://localhost:6379"
  }
});

const llm = new ChatOllama({ model: "llama3.1", temperature: 0.7 });
const llmWithTools = llm.bindTools([getPolicyInfo, updatePolicyStatus]);

const app = express();
app.use(json());
const PORT = 3000;

app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body.message;

    const messages = await history.getMessages();

    const conversation = [
      ...messages,
      { role: "user", content: userInput }
    ];

    const result = await llmWithTools.invoke(
      conversation,
    );

    await history.addUserMessage(userInput);
    await history.addAIMessage(typeof result === "string" ? result : JSON.stringify(result));

    res.json({
      response: typeof result === "string" ? result : JSON.stringify(result)
    });
  } catch (err) {
    console.error("Error processing chat:", err);
    res.status(500).json({ error: err.toString() });
  }
});

app.use(express.static("."));
app.listen(PORT, () =>
  console.log(`Chatbot (LangChain+Llama3+Redis) running on port ${PORT}`)
);
