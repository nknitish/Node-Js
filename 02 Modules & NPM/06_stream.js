import fs from "node:fs";

const stream = fs.createWriteStream("files/MyFiles.txt");
stream.write("Hello ");
stream.write("World");
stream.end();

// const stream = fs.createReadStream("video.mp4");

// stream.on("data", (chunk) => {
//   console.log(chunk.length);
// });
