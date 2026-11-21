import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { getAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { listSubmissions } from "@/lib/submissions";
import {
  listBookings,
  listMachinery,
  listLaborGroups,
  listPartnerCenters,
  listEnrollments,
  listCropDiagnoses,
} from "@/lib/db";
import { AdminDashboardClient } from "@/app/admin/AdminDashboardClient";

export default async function AdminPage() {
  return (
    <Suspense fallback={<main className="admin-shell"><p>Loading protected admin…</p></main>}>
      <AdminDashboard />
    </Suspense>
  );
}

async function AdminDashboard() {
  await connection();
  if (!isAdminConfigured()) redirect("/admin/login");
  if (!(await getAdminSession())) redirect("/admin/login");

  const [submissions, bookings, machinery, laborGroups, partners, enrollments, diagnoses] =
    await Promise.all([
      listSubmissions(),
      listBookings(),
      listMachinery(),
      listLaborGroups(),
      listPartnerCenters(),
      listEnrollments(),
      listCropDiagnoses(),
    ]);

  return (
    <AdminDashboardClient
      submissions={submissions}
      bookings={bookings}
      machinery={machinery}
      laborGroups={laborGroups}
      partners={partners}
      enrollments={enrollments}
      diagnoses={diagnoses}
    />
  );
}
