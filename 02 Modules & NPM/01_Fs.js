import fs from "fs";

const path = `files/MyFile.txt`;
//Create a file
fs.writeFileSync(path, "Hello World");

//Append File
fs.appendFileSync(path, " How are you ?");

//Read File
console.log(fs.readFileSync(path, "utf-8"));

//Delete file
//fs.unlinkSync(path);
