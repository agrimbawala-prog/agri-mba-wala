"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { logoutAdmin } from "@/lib/admin-auth";
import { updateBookingStatus, issueCertificate } from "@/lib/db";

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function updateBookingStatusAction(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));
  const status = String(formData.get("status")) as "pending" | "confirmed" | "completed" | "cancelled";

  if (bookingId && ["pending", "confirmed", "completed", "cancelled"].includes(status)) {
    await updateBookingStatus(bookingId, status);
    revalidatePath("/admin");
  }
}

export async function issueCertificateAction(formData: FormData) {
  const enrollmentId = Number(formData.get("enrollmentId"));
  if (enrollmentId) {
    await issueCertificate(enrollmentId);
    revalidatePath("/admin");
  }
}
