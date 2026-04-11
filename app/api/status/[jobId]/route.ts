import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  try {
    const jobPath = path.join("/tmp/tinystarai", "jobs.json");
    const data = await readFile(jobPath, "utf-8");
    const jobs = JSON.parse(data);
    const job = jobs[jobId];

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch {
    // If no jobs file, return a mock response for demo
    return NextResponse.json({
      id: jobId,
      status: "complete",
      step: "done",
      progress: 100,
      kidName: "Demo",
    });
  }
}
