import { NextResponse } from "next/server";
import { fetchPopularShows } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await fetchPopularShows();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
