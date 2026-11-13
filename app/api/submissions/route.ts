import { NextResponse } from "next/server";

import { submissionSchema } from "@/lib/submission-schema";
import { createSubmission } from "@/lib/submissions";

function validationErrors(issues: { path: PropertyKey[]; message: string }[]) {
  return Object.fromEntries(issues.map((issue) => [String(issue.path[0] || "form"), issue.message]));
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ errors: { form: "Send a valid form submission." } }, { status: 400 });
  }

  if (typeof payload === "object" && payload !== null && "company" in payload && (payload as { company?: unknown }).company) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ errors: validationErrors(parsed.error.issues) }, { status: 422 });
  }

  try {
    await createSubmission(parsed.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Submission persistence failed", error);
    return NextResponse.json({ errors: { form: "We could not save that enquiry. Please try again." } }, { status: 503 });
  }
}
