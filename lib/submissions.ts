import "server-only";

import { mkdirSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";

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
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function getSqliteDatabase() {
  const workspacePath = process.cwd();
  const databasePath = resolve(/*turbopackIgnore: true*/ workspacePath, process.env.SUBMISSIONS_DB_PATH || "data/submissions.sqlite");
  if (!databasePath.startsWith(`${workspacePath}${sep}`)) {
    throw new Error("SUBMISSIONS_DB_PATH must remain inside the project directory.");
  }
  mkdirSync(dirname(databasePath), { recursive: true });
  const { DatabaseSync } = await import("node:sqlite");
  const database = new DatabaseSync(databasePath);
  database.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL,
      audience TEXT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      district TEXT,
      village TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return database;
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
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
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
  if (!response.ok) throw new Error("Submission storage is unavailable.");
}

async function listSupabaseSubmissions(): Promise<SubmissionRecord[]> {
  const fields = "id,kind,audience,name,phone,email,district,village,subject,message,created_at";
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?select=${fields}&order=created_at.desc`, {
    headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Submission storage is unavailable.");
  const rows = (await response.json()) as Record<string, unknown>[];
  return rows.map(toRecord);
}

export async function createSubmission(input: SubmissionInput) {
  if (hasSupabaseStorage()) {
    await createSupabaseSubmission(input);
    return;
  }
  const database = await getSqliteDatabase();
  try {
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
  } finally {
    database.close();
  }
}

export async function listSubmissions(): Promise<SubmissionRecord[]> {
  if (hasSupabaseStorage()) return listSupabaseSubmissions();
  const database = await getSqliteDatabase();
  try {
    const records = database.prepare("SELECT id, kind, audience, name, phone, email, district, village, subject, message, created_at FROM submissions ORDER BY created_at DESC, id DESC").all();
    return records.map((record) => toRecord(record as Record<string, unknown>));
  } finally {
    database.close();
  }
}
