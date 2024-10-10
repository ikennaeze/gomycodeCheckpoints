let mark1 = prompt('enter mark 1')
let mark2 = prompt('enter mark 2')
let mark3 = prompt('enter mark 3')
let mark4 = prompt('entter mark 4')

function Grade(mark1, mark2, mark3, mark4) {
    grades = Number(mark1)+Number(mark2)+Number(mark3)+Number(mark4)
    average = grades/4

    if(average < 50 ){
        document.getElementById('result').innerHTML = 'you failed L bozo'
    }else{
        document.getElementById('result').innerHTML = 'Congrats you passed'
    }

    console.log(average)
}

Grade(mark1, mark2, mark3, mark4)