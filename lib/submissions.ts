import "server-only";

import { getDatabase } from "@/lib/db";
import type { SubmissionInput } from "@/lib/submission-schema";

export type SubmissionRecord = {
  id: number;
  kind: "registration" | "contact";
  audience: string | null;
  name: string;
  phone: string;
  email: string;
  district: string | null;
  village: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
};

function hasSupabaseStorage() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.ENABLE_SUPABASE_SYNC === "true");
}

function asNullable(value: string | undefined) {
  return value?.trim() || null;
}

function toRecord(row: Record<string, unknown>): SubmissionRecord {
  return {
    id: Number(row.id),
    kind: row.kind === "contact" ? "contact" : "registration",
    audience: typeof row.audience === "string" ? row.audience : null,
    name: String(row.name),
    phone: String(row.phone),
    email: String(row.email),
    district: typeof row.district === "string" ? row.district : null,
    village: typeof row.village === "string" ? row.village : null,
    subject: typeof row.subject === "string" ? row.subject : null,
    message: String(row.message),
    createdAt: String(row.created_at),
  };
}

async function createSupabaseSubmission(input: SubmissionInput) {
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        kind: input.kind,
        audience: input.audience ?? null,
        name: input.name,
        phone: input.phone,
        email: input.email,
        district: asNullable(input.district),
        village: asNullable(input.village),
        subject: asNullable(input.subject),
        message: input.message,
      }),
      cache: "no-store",
    });
  } catch {
    // Ignore remote sync failure; local SQLite will preserve record
  }
}

export async function createSubmission(input: SubmissionInput) {
  const database = getDatabase();
  database.prepare("INSERT INTO submissions (kind, audience, name, phone, email, district, village, subject, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run(
    input.kind,
    input.audience ?? null,
    input.name,
    input.phone,
    input.email,
    asNullable(input.district),
    asNullable(input.village),
    asNullable(input.subject),
    input.message,
  );

    if (hasSupabaseStorage()) {
      await createSupabaseSubmission(input);
    }
  }

  export async function listSubmissions(): Promise<SubmissionRecord[]> {
    const database = getDatabase();
    const records = database.prepare("SELECT id, kind, audience, name, phone, email, district, village, subject, message, created_at FROM submissions ORDER BY created_at DESC, id DESC").all();
    return records.map((record) => toRecord(record as Record<string, unknown>));
  }
