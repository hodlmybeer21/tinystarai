import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const photo = formData.get("photo") as File | null;
    const kidName = formData.get("kidName") as string;
    const interests = JSON.parse(formData.get("interests") as string || "[]");
    const email = formData.get("email") as string | null;

    if (!photo || !kidName || interests.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const jobId = randomUUID();

    // Save photo
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join("/tmp/tinystarai", jobId);
    await mkdir(uploadDir, { recursive: true });
    const ext = photo.name.split(".").pop() || "jpg";
    const photoPath = path.join(uploadDir, `photo.${ext}`);
    await writeFile(photoPath, buffer);

    // Create job file
    const job = {
      id: jobId,
      status: "processing",
      step: "upload",
      progress: 5,
      photoPath,
      kidName,
      interests,
      email: email || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const jobPath = path.join("/tmp/tinystarai", "jobs.json");
    let jobs: Record<string, object> = {};
    try {
      const { readFile } = await import("fs/promises");
      const existing = await readFile(jobPath, "utf-8");
      jobs = JSON.parse(existing);
    } catch {
      // fresh
    }
    jobs[jobId] = job;
    await writeFile(jobPath, JSON.stringify(jobs, null, 2));

    return NextResponse.json({ jobId, message: "Job created" });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
