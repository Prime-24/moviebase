import { NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("TMDB API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}
