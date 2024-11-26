let pwdMaker = require("generate-password");

let pwdCount = 0;

while(pwdCount < 5){
    console.log(pwdMaker.generate())
    pwdCount++
}