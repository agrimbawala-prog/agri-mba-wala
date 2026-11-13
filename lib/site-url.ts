const fallbackUrl = "https://agrimbawala.example";

export function getSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl;
  try {
    return new URL(candidate).origin;
  } catch {
    return fallbackUrl;
  }
}
