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

      Make sure the output is markdown formatted with #, ##, etc.
    `;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
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
