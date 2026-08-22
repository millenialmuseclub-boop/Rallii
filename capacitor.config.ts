import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.rallii.rail",
  appName: "Rallii Rail",
  webDir: "out",
  plugins: {
    CapacitorUpdater: {
      // Rallii polls its own static R2 manifest in src/lib/otaUpdater.ts.
      // Keeping automatic checks off means the plugin never contacts Capgo.
      autoUpdate: false,
      publicKey:
        "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAjieUlnHyiFvYV8Y0sgKPKL2EJ68TnTjM5EiLH5Co6/aCw06S8aLj\ncKF1onAo+zSjJ+QmyF33mnX/eMegU9WeoSUJeGlFD0g6n9rn3ZOuG4NDRTaM61Sv\nHwEpQKljaEfbEUG7VKFAuk/HCP0rYjplg6b9ViusSFZK11YZpgndezFsDh6+4fpG\nGyU/ZeOMaz4/1fLIVWbqlrAU0o52xrzj8UN0mWzevuJANMiMS90ybxFNCQujUPsA\nDvdoCr5te/tis0zAykx1VfjGRBhvYQnXGHqWcrjJTYUOYO2d1WmaQErBH9vLvKYU\nlGK/Dz8aV+gc65gx97ZkFTRrDrNqnA2DPwIDAQAB\n-----END RSA PUBLIC KEY-----\n",
      version: process.env.APP_BUILD_VERSION,
    },
  },
};

export default config;
