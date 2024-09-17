function isLeapYear() {
    let year = prompt("What year is it?")

    if (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0)
        document.getElementById('leapYear').innerHTML = "The year " + year + " is a Leap Year"
    else
       document.getElementById('leapYear').innerHTML = "The year " + year + " is NOT a Leap Year"
}


function priceTicket(){
    let age = prompt("What is your age?")

    if(Number(age) <= 12){
        document.getElementById("ticketPrice").innerHTML = "Your ticket price is $10"
    }else if(Number(age) >= 13 && Number(age) <= 17){
        document.getElementById("ticketPrice").innerHTML = "Your ticket price is $15"
    }else{
        document.getElementById("ticketPrice").innerHTML = "Your ticket price is $20"
    }
}

function promptForFib(){
    let n = prompt('Type a number')
    document.getElementById('fibonacci').innerHTML = "Fibonacci of " + n + " is " + calcTheFib(Number(n))
}

function promptForPow(){
    let x = prompt('What is your base number?')
    let n = prompt('What is your exponent?')

    document.getElementById('power').innerHTML = x + " to the power of " + n + " is " + calcPow(Number(x), Number(n))
}

function calcTheFib(n){
    if(n === 0){
        return 0
    }else if(n === 1){
        return 1
    }else{
        let result = calcTheFib(n-2) + calcTheFib(n-1)
        return result
    }
}

function calcPow(x, n){
    if(n === 1){
        return x
    }else{
        let result = calcPow(x, n-1)
        result = x * result
        return result
    }
}