const fs = require("fs");

let ResultArray;
fs.readFile("./Assignment.txt", "utf8", function (err, contents) {
  if(err) throw new Error(err)
  ResultArray = contents.split(/Q[0-9]+\)/);
  var file = fs.createWriteStream("New_Assignment.txt");
  ResultArray.forEach((line, index) => {
    if(index) file.write("Q" + index + ") " + line);
    else file.write(line);
  });
});
