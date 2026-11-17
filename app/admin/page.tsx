import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { logoutAction } from "@/app/admin/actions";
import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { listSubmissions } from "@/lib/submissions";

export default async function AdminPage() {
  return <Suspense fallback={<main className="admin-shell"><p>Loading protected admin…</p></main>}><AdminDashboard /></Suspense>;
}

async function AdminDashboard() {
  await connection();
  if (!isAdminConfigured()) redirect("/admin/login");
  if (!(await getAdminSession())) redirect("/admin/login");
  const submissions = await listSubmissions();
  return <main className="admin-shell admin-dashboard"><div className="admin-dashboard-header"><div><p className="eyebrow">AGRI MBA WALA</p><h1>Form submissions</h1><p>{submissions.length} stored enquiry{submissions.length === 1 ? "" : "ies"}.</p></div><form action={logoutAction}><button className="button button-outline" type="submit">Sign out</button></form></div><div className="admin-table-wrap"><table><thead><tr><th>Received</th><th>Type</th><th>Name</th><th>Contact</th><th>Area</th><th>Details</th></tr></thead><tbody>{submissions.length ? submissions.map((submission) => <tr key={submission.id}><td>{formatSubmissionDate(submission.createdAt)}</td><td>{submission.audience ?? submission.kind}</td><td>{submission.name}</td><td><a href={`tel:${submission.phone}`}>{submission.phone}</a><br /><a href={`mailto:${submission.email}`}>{submission.email}</a></td><td>{[submission.village, submission.district].filter(Boolean).join(", ") || "—"}</td><td><strong>{submission.subject || "—"}</strong><br />{submission.message}</td></tr>) : <tr><td colSpan={6}>No submissions have been received yet.</td></tr>}</tbody></table></div></main>;
}

function formatSubmissionDate(value: string) {
  const normalized = value.includes("T") ? value : `${value.replace(" ", "T")}Z`;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(date);
}
