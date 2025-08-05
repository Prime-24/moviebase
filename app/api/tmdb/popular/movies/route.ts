import { NextResponse } from "next/server";
import { fetchPopularMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await fetchPopularMovies();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
