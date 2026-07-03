import os from "node:os";
console.log({
  platform: os.platform(),
  arch: os.arch(),
  hostname: os.hostname(),
  cpuCores: os.cpus().length,
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
});

console.log(os.userInfo());
