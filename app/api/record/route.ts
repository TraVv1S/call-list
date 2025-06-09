import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const recordId = searchParams.get("record");
    const partnershipId = searchParams.get("partnership_id");

    if (!recordId || !partnershipId) {
      return NextResponse.json(
        { error: "Missing record or partnership_id parameter" },
        { status: 400 }
      );
    }

    const response = await fetch(
      process.env.BACKEND_URL +
        "/getRecord?" +
        `record=${recordId}&partnership_id=${partnershipId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error fetching audio record:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio record" },
      { status: 500 }
    );
  }
}
