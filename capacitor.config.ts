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
        "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEA0TnpGNshjZhpvuwuJ1dGINYNwvbTYGblK+ryNQ8UrvQsxzg8UhDb\no9oibq1hhPy8tU0PrnuHJY6GLhCzeCzLvR9cF3GQexWXTctqMXape3yv1YxTz3/G\n8CsXNVwFEOtC1pqLXlB3sMjOdpTEn9CWgJFMcKg40Egdsd1ZqkJmqoJSJqiCNX7u\nANcdN14fBpl2K22MHBQzAXEBUm7UX5cB9A2LlrPMgDXs7YaRrNSeZiy8HorAXzPj\nGOP/MS1/Y73LuR4Xt/qvE7CPRIsbQxfAGwgEfoZHlKcHwJGg5eSmyNrr3DZfywPC\nwDSoZDS4ag/Gr1yzK9bN4RTSUAj6Z94BhwIDAQAB\n-----END RSA PUBLIC KEY-----\n",
      version: process.env.APP_BUILD_VERSION,
    },
  },
};

export default config;
