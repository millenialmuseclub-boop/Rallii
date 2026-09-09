export interface OtaManifest {
  appId: "com.rallii.rail";
  version: string;
  sha: string;
  url: string;
  checksum: string;
  sessionKey: string;
}

/** Never install another app's bundle, even if a delivery manifest is misplaced. */
export function parseOtaManifest(value: unknown, manifestUrl: string): OtaManifest {
  if (!value || typeof value !== "object") throw new Error("Invalid OTA manifest");
  const manifest = value as OtaManifest;
  if (manifest.appId !== "com.rallii.rail") throw new Error("OTA app identity mismatch");
  if (!/^\d+$/.test(manifest.version) || !/^[a-f0-9]{40}$/.test(manifest.sha)) throw new Error("Invalid OTA version");
  const expectedUrl = new URL(`bundles/${manifest.sha}.zip`, manifestUrl).href;
  if (manifest.url !== expectedUrl || !manifest.checksum || !manifest.sessionKey) throw new Error("Invalid OTA bundle");
  return manifest;
}
