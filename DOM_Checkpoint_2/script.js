document.addEventListener("DOMContentLoaded", itsLoadedBrothas);

function itsLoadedBrothas(){
    let colorBox = document.getElementById('color-box');
    let changeColor = document.getElementById('change-color-btn')

    changeColor.addEventListener("click", changeBtnBGColor)
    
}

function getRandomColor(){
    var hexChars = '0123456789ABCDEF'; //hexadecimals
    var color = '#';
    
    let i = 0;
    while(i < 6){
        color += hexChars[Math.floor(Math.random() * 16)]; //gets a random character from the hexadecimals list and in case the number ends up being a float number, the number gets rounded to the nearest integer
        i++
    }

    return color; //color code
}

function changeBtnBGColor(){
    let colorBox = document.getElementById('color-box');
    colorBox.style.backgroundColor = getRandomColor();
}



