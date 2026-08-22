/* eslint-disable @typescript-eslint/no-require-imports */
const os = require("node:os");

const nativeUserInfo = os.userInfo;

os.userInfo = (...arguments_) => {
  try {
    return nativeUserInfo(...arguments_);
  } catch {
    return {
      uid: -1,
      gid: -1,
      username: process.env.USERNAME ?? "rallii",
      homedir: process.cwd(),
      shell: process.env.COMSPEC ?? "cmd.exe",
    };
  }
};
