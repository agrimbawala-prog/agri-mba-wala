import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  return <Suspense fallback={<main className="admin-shell"><p>Loading sign-in…</p></main>}><AdminLogin /></Suspense>;
}

async function AdminLogin() {
  await connection();
  if (await getAdminSession()) redirect("/admin");
  return <main className="admin-shell"><section className="admin-card"><p className="eyebrow">AGRI MBA WALA</p><h1>Submission admin</h1><p>Use the credentials stored in your environment variables to review enquiries.</p><AdminLoginForm /></section></main>;
}
