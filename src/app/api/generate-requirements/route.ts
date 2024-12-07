// src/app/api/generate-requirements/route.ts
import { NextRequest, NextResponse } from "next/server";

import { openai } from "../../../lib/openai";

export async function POST(req: NextRequest) {
  const { productName, featureName, overview, featureList, userFeedback } =
    await req.json();

  if (!productName || !featureName || !overview) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const prompt = `
      Generate a product requirement document based on the following details:
      Product Name: ${productName}
      Feature Name: ${featureName}
      Overview: ${overview}
      Feature List: ${featureList}
      User Feedback: ${userFeedback}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 500,
    });

    const requirements = response.choices[0].message.content;

    console.log("response", response);
    console.log("requirements", requirements);

    return NextResponse.json({ requirements });
  } catch (error) {
    console.error("Error generating requirements:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};