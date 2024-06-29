import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();
  const { messages, userId } = body;

  const apiKey = process.env.OPENAI_API_KEY;
  console.log(apiKey);

  if (!apiKey) {
    return NextResponse.json({ error: "API key is not defined" }, { status: 500 });
  }

  const url = "https://api.openai.com/v1/chat/completions";

  console.log("Ask GPT >>>");
  messages.map((m) =>
    console.log(" - " + m.role.toUpperCase() + ": " + m.content)
  );

  const data = {
    model: "gpt-4",
    messages,
    max_tokens: 2066,
    temperature: 1,
    user: userId,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(url, data, options);
    const answer = response.data.choices[0].message.content;
    const usage = response?.data?.usage;

    console.log(">>> " + answer);
    console.log(
      "TOKENS USED: " +
        usage?.total_tokens +
        " (prompt: " +
        usage?.prompt_tokens +
        " / response: " +
        usage?.completion_tokens +
        ")"
    );
    console.log("\n");

    return NextResponse.json({ response: answer });
  } catch (error) {
    console.error("GPT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
