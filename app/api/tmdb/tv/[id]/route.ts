import { NextRequest, NextResponse } from "next/server";
import { fetchSeriesDetails } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const url = await request.url;
  const id = url.split("/").pop();
  try {
    const data = await fetchSeriesDetails(Number(id));
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
