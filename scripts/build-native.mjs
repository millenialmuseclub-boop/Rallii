import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));

execFileSync(process.execPath, [nextCli, "build"], {
  env: { ...process.env, NATIVE_BUILD: "1" },
  stdio: "inherit",
});
