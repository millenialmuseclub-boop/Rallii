import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native projects deliberately consume a future static `native-web` bundle,
 * not Rallii Rail's Vercel deployment. This preserves a reviewable bundled
 * app and makes OTA updates an explicit release workflow.
 */
const config: CapacitorConfig = {
  appId: "com.rallii.rail",
  appName: "Rallii Rail",
  webDir: "native-web",
};

export default config;
