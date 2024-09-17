const array = [];

for(let i = 0; i < 10; i++){
    // Returns a random integer from 0 to 9:
    let arrayNum = Math.floor(Math.random() * 10);

    array[i] = arrayNum
}

console.log(array)