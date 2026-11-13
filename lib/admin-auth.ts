import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const cookieName = "agri_mba_admin_session";
const sessionDurationSeconds = 60 * 60 * 8;

type SessionPayload = { role: "admin"; expiresAt: number };

function config() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return username && password && secret ? { username, password, secret } : null;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safelyMatches(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminConfigured() {
  return Boolean(config());
}

export async function getAdminSession() {
  const currentConfig = config();
  if (!currentConfig) return null;
  const value = (await cookies()).get(cookieName)?.value;
  if (!value) return null;
  const [encodedPayload, providedSignature] = value.split(".");
  if (!encodedPayload || !providedSignature || !safelyMatches(sign(encodedPayload, currentConfig.secret), providedSignature)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
    return payload.role === "admin" && payload.expiresAt > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

export async function authenticateAdmin(username: string, password: string) {
  const currentConfig = config();
  if (!currentConfig || !safelyMatches(username, currentConfig.username) || !safelyMatches(password, currentConfig.password)) return false;
  const payload: SessionPayload = { role: "admin", expiresAt: Date.now() + sessionDurationSeconds * 1000 };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const value = `${encodedPayload}.${sign(encodedPayload, currentConfig.secret)}`;
  (await cookies()).set(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionDurationSeconds,
    path: "/",
  });
  return true;
}

export async function logoutAdmin() {
  (await cookies()).delete(cookieName);
}
