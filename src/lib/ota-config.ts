const channel = process.env.NEXT_PUBLIC_OTA_CHANNEL?.trim() || "production";
const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.replace(/\/$/, "");

export const OTA_MANIFEST_URL = baseUrl
  ? `${baseUrl}/updates/com.rallii.rail/${channel}/manifest.json`
  : undefined;
