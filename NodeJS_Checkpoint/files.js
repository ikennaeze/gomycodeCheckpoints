let fs = require("fs") //importing file system module

let nameOfFile = 'welcome.text'
let fileContent = 'Hello Node'

/* opening, writing, and reading a file */
let buf = new Buffer.alloc(1024);//The buffer acts like an array with indices/indexes. Each index is a KB in size

//Creating and opening file
console.log("Going to create and open the file\n");
fs.open(nameOfFile, 'a+', (err, fd) => { //r+ : read/write flag; third parameter (mode) is optional
    if (err) {
        return console.error(err.stack);
    }
    console.log("File created and opened successfully!\n");

//Writing content in the file
    fs.write(fd, fileContent + "\n", (err) => {
        if(err) {
            return console.error(err);
        }
        console.log("Content added to file!\n");
    })

//Reading file content
    fs.read(fd, buf, 0, buf.length, 0, function(err, kb){
        if (err){
            return console.log(err);
        }
        console.log("Going to read the file\n");
        console.log(kb + " KB read\n");
        
        // Print only read bytes to avoid junk.
        if(kb > 0){
            const content = buf.slice(0, kb).toString(); //read the buffer from the first array index and convert it to a string
            console.log("The file content: " + content); 
        }
    });

    // Close the opened file.
    fs.close(fd, function(err) {
        if (err) {
            return console.error(err);
        } 
        console.log("File closed successfully.\n");
    });
});



