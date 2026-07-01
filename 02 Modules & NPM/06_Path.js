import path from "path";

const url = `files/myFile.txt`;
console.log(path.basename(url)); //myFile.txt
console.log(path.dirname(url)); //files
console.log(path.resolve(url)); ///Users/nitish/Workspace/NodeJS/02 Modules & NPM/files/myFile.txt
console.log(path.extname(url)); //.txt
console.log(path.parse(url));
