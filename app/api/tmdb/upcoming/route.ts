import { NextResponse } from "next/server";
import { fetchUpcomingMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await fetchUpcomingMovies();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
