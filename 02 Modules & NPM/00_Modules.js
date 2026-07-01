//Import Modules Core Modules
import fs from "fs";
import os from "os";
import http from "http";

//Using Core modules
fs.writeFileSync("files/WriteFilesync.txt", "Hello World");
console.log(os.hostname());
console.log(os.cpus());

//Global Objects - Which does't require to import - Console.log, Process

console.log(process.cwd());
