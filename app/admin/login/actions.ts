"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { authenticateAdmin, isAdminConfigured } from "@/lib/admin-auth";

export type LoginState = { error?: string };

const credentialsSchema = z.object({ username: z.string().trim().min(1), password: z.string().min(1) });

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) return { error: "Admin access is not configured. Add the required environment variables." };
  const parsed = credentialsSchema.safeParse({ username: formData.get("username"), password: formData.get("password") });
  if (!parsed.success) return { error: "Enter both your username and password." };
  if (!(await authenticateAdmin(parsed.data.username, parsed.data.password))) return { error: "Those credentials were not accepted." };
  redirect("/admin");
}
