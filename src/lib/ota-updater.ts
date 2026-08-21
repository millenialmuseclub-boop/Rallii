import { Capacitor } from "@capacitor/core";
import { CapacitorUpdater } from "@capgo/capacitor-updater";
import { OTA_MANIFEST_URL } from "@/lib/ota-config";

interface OtaManifest {
  version: string;
  sha: string;
  url: string;
  checksum: string;
  sessionKey: string;
}

let checkInFlight: Promise<boolean> | null = null;

/** Mark the launched native bundle as healthy so Capgo's local rollback guard is disarmed. */
export async function markAppReady(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await CapacitorUpdater.notifyAppReady();
  } catch {
    // OTA failures must never interrupt the rail guide.
  }
}

/** Poll Rallii's static R2 manifest. The updater plugin only verifies/decrypts the bundle we supply. */
export async function checkForOtaUpdate(): Promise<boolean> {
  if (checkInFlight) return checkInFlight;
  checkInFlight = check().finally(() => {
    checkInFlight = null;
  });
  return checkInFlight;
}

async function check(): Promise<boolean> {
  if (!Capacitor.isNativePlatform() || !OTA_MANIFEST_URL || !navigator.onLine) return false;

  try {
    const response = await fetch(OTA_MANIFEST_URL, { cache: "no-store" });
    if (!response.ok) return false;
    const manifest = (await response.json()) as OtaManifest;
    const { bundle } = await CapacitorUpdater.current();
    const candidateVersion = Number(manifest.version);
    const currentVersion = Number(bundle.version) || 0;
    if (!Number.isFinite(candidateVersion) || candidateVersion <= currentVersion) return false;

    const downloaded = await CapacitorUpdater.download({
      url: manifest.url,
      version: manifest.version,
      checksum: manifest.checksum,
      sessionKey: manifest.sessionKey,
    });
    await CapacitorUpdater.next({ id: downloaded.id });
    return true;
  } catch {
    return false;
  }
}
