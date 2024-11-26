//String Manipulation Functions

/* Reversing a String */
function stringReverser(str){
    let strRev = "";

    //For loop to start from the last character of input string and one by one, add each character from there to the strRev variable
    for (let i = str.length - 1; i >= 0; i--) {
        strRev += str[i];
    }
    console.log(strRev);
}

console.log("Reversing String:")
stringReverser("Jollof Rice is the best thing Nigeria has graced upon the universe")

console.log("\n") //line break


/* Counting characters in string */
function charCounter(str){
    let counter = 0;

    //For loop to count character of input string each time it goes through one
    for (let i = 0; i < str.length; i++){
        counter++
    }
    console.log(counter)
}

console.log("Counting total characters in String:")
charCounter("Jollof Rice is the best thing Nigeria has graced upon the universe")

console.log("\n") //line break


/* Capitalizing first letter of each word in a sentence */
function wordCapitalizer(sentence){
    let cappedStr = "";
    let words = sentence.split(" "); //put each word in the sentence into an array

    /* - Iterate through each word in word array and capitalize each letter.
       - After capitalizing the first letter of the word, concatenate it with the rest of the word string.
       - Move onto the next word in the 'words' array and keep doing this process until there are no words left in the array.
     */
    for(let i = 0; i < words.length; i++){ 
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    //Make the capitalized words a sentence by joining them together, separate it by a space and return it as a string.
    cappedStr = words.join(" ")

    //print the new sentence
    console.log(cappedStr)
}

console.log("Capitalizing first letter of each word in a sentence:")
wordCapitalizer("Jollof Rice is the best thing Nigeria has graced upon the universe");

console.log("\n") //line break


//Array Functions

let array = [2, 4, 3, 6, 5, 8, 7, 10] //the main array to be used in this section

/* Maximum and minimum of numbers in an array*/
function maxAndMinFinder(numArray){
    let maxNum = -Infinity //smallest number ever
    let minNum = Infinity //biggest number ever

    for(let i = 0; i < numArray.length; i++){

        //If the current pointed index is lower than the current minimum number, make it the minimum number
        if(numArray[i] < minNum){
            minNum = numArray[i];
        }

         //If the current pointed index is higher than the current maximum number, make it the maximum number
        if(numArray[i] > maxNum){
            maxNum = numArray[i]
        }
    }

    console.log("The minimum number is " + minNum + " and the maximum number is " + maxNum)
}

console.log("Maximum and minimum of numbers in an array")
maxAndMinFinder(array)

console.log("\n") //line break


/* Sum of all elements in array */
function sumAllElements(numArray){
    let sum = 0;

    //Iterate through each element in the array and add it to the sum each time
    for(let i = 0; i < numArray.length; i++){
        sum += numArray[i]
    }

    console.log("The sum of all elements in this array is " + sum)
}

sumAllElements(array)

console.log("\n") //line break


/* Filtering elements in array*/
function filterElements(nums){
    return nums > 5
}

console.log("Filtering elements in array. If the element is less than 5, it will get filtered. \n" + array.filter(filterElements))

console.log("\n") //line break


//Mathematical Functions

/* Factorial of a given number */
function factorialCalculator(n){
    let ans = 1;

    //0! is 1
    if(n == 0){
        return ans
    }

    //Will start multiplying by 2 and will keep incrementing the multiplier until it reaches the given number
    for (let i = 2; i <= n; i++){
        ans *= i; 
    }
    return ans;  
}

console.log("Factorial of a number. The factorial of 7 is " + factorialCalculator(7))

console.log("\n") //line break


/* Prime Number finder */

function primeOrNo(n){
        //Prime numbers can't be less than or equal to 1
        if(n <= 1){
            return "No."
        }
        else {
            // Check if numbers from 2 to n are divisible by n. If so, then it's not a prime number
            for (let i = 2; i < n; i++)
                if (n % i == 0)
                    return "No."
        }

        //If the given number clears all the other conditions, then it is a prime number
        return "Yes."
    }

console.log("Is 7 a prime number? " + primeOrNo(7))

console.log("\n") //line break

/* Fibonacci Sequence */
function fibonacciOf(n){

    //default starting numbers
    let num1 = 0
    let num2 = 1
    let sum;

    //f(1) = 0
    if(n == 1){
        return num1;
    
    //f(2) = 1
    } else if(n == 2){
        return num2;
    
    //Start the fibonacci sequence from f(3)
    } else {
        for(let i = 3; i < n; i++){
            sum = num1 + num2; //sum of f(i)
            num1 = num2; //Make num1 become what was num2
            num2 = sum; //Since the sum is equal to the next term in the fibonacci seuqence, num2 will be equal to the next term
        }
        return num2;
    } 
}

console.log("Fibonnacci sequence. Fibonacci of 7: " + fibonacciOf(7));
