/*
Instructions
Now we know how to create, write and append text to an existing 
file using the fs module, lets do the following:
1. Create a new txt file using the same fs module method we have 
learned before.
2. Create a copy of the newly created txt file using a method from 
the fs module.
3. Rename one of the files using a method from the fs module.
4. Get a list of all the file names of the current directory using a 
method from the fs module.
5. Find out and implement another method for the fs module.
*/

// const fs = require("fs");
import fs from "fs";

// 1.
fs.writeFileSync("textFile.txt", "Newly created text file");

// 2.
fs.copyFileSync("textFile.txt", "copiedFile.txt");

// 3.
fs.renameSync("textFile.txt", "renamedTextFile.txt");

// 4.
const files = fs.readdirSync("./");
console.log(files);

// 5.
fs.appendFileSync("copiedFile.txt", " Extra content");
