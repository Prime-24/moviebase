import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(
        query
      )}&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
