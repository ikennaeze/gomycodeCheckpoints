/* function for adding items */
function addItem(priceID, quantityID, pricePoint){
    increasePrice(priceID, pricePoint);
    increaseQuantity(quantityID)
}

/* function for removing items */
function removeItem(priceID, quantityID, pricePoint, deleteID){
    decreasePrice(priceID, pricePoint);
    decreaseQuantity(quantityID, deleteID)
}

/*function for deleting items */
function deleteItem(deleteID){
let cart = document.getElementsByClassName('list-products')[0]; //shopping cart
let item = document.getElementById(deleteID); //specific product

cart.removeChild(item); //deleting product with removeChild() method
}

/* function for liking product */
function turnHeartRed(heartID){
    let heart = document.getElementById(heartID); //heart item
    heart.style.color = 'red'; //turns red when clicked
}

/* function to increase quantity number after adding an item */
function increaseQuantity(quantityID){
    let currentQuantity = document.getElementById(quantityID).innerHTML; // text of quantity
    currentQuantity = Number(currentQuantity); //converting the quantity text from a string to a number
    let newQuantity = currentQuantity + 1; //increasing the quantity
    document.getElementById(quantityID).innerHTML = newQuantity; //inputting the updated quantity number in the quantity area
}

/* function to decrease quantity number after removing an item */
function decreaseQuantity(quantityID, deleteID){
    let currentQuantity = document.getElementById(quantityID).innerHTML; // text of quantity
    currentQuantity = Number(currentQuantity); //converting the quantity text from a string to a number

    let lessThan1 = currentQuantity <= 1;

    //if the quantity is 1 or more keep it up, otherwise delete it
    if(!lessThan1){
        let newQuantity = currentQuantity - 1; //decreasing quantity
        document.getElementById(quantityID).innerHTML = newQuantity; //inputting the updated quantity number in the quantity area
    } else {
        deleteItem(deleteID); //deletes item since the item quantity being less than means that there are no items left
    }
}

/* function to increase price point after adding an item*/
function increasePrice(priceID, pricePoint){

    //increasing price from pressing plus button:
    let currentPrice = document.getElementById(priceID).innerHTML; //text of price
    currentPrice = currentPrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''); //ignoring '$' character and any other special character so that I can just have the number itself (can't do aritmetic with symbols)
    currentPrice = Number(currentPrice); //converting the price text from a string to a number
    let newPrice = currentPrice + pricePoint; //increasing price
    document.getElementById(priceID).innerHTML = newPrice + ' $'; //putting the updated price into the text with the '$' symbol

    //increasing the total price
    let currentTotalPrice = document.getElementsByClassName('total')[0].innerHTML; //text of total price
    currentTotalPrice = currentTotalPrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''); //ignoring '$' character and any other special character so that I can just have the number itself (can't do aritmetic with symbols)
    currentTotalPrice = Number(currentTotalPrice); //converting the price text from a string to a number
    let newTotalPrice = currentTotalPrice + pricePoint; //increasing total price
    document.getElementsByClassName('total')[0].innerHTML = newTotalPrice + '$';//putting the updated price into the text with the '$' symbol
}   

/* function to increase price point after removing an item*/
function decreasePrice(priceID, pricePoint){
    //decreasing price from pressing plus button:
    let currentPrice = document.getElementById(priceID).innerHTML; //text of price
    currentPrice = currentPrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');  //ignoring '$' character and any other special character so that I can just have the number itself (can't do aritmetic with symbols)
    currentPrice = Number(currentPrice); //converting the price text from a string to a number
    let newPrice = currentPrice - pricePoint; //decreasing price
    document.getElementById(priceID).innerHTML = newPrice + ' $'; //putting the updated price into the text with the '$' symbol

     //decreasing the total price
     let currentTotalPrice = document.getElementsByClassName('total')[0].innerHTML; //text of total price
     currentTotalPrice = currentTotalPrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''); //ignoring '$' character and any other special character so that I can just have the number itself (can't do aritmetic with symbols)
     currentTotalPrice = Number(currentTotalPrice); //converting the price text from a string to a number
     let newTotalPrice = currentTotalPrice - pricePoint; //decreasing total price
     document.getElementsByClassName('total')[0].innerHTML = newTotalPrice + '$';//putting the updated price into the text with the '$' symbol
}


/* function to subtract item price from the total price with the item gets deleted */
function subtractFromTotal(priceID){
    //getting the total item price
    let currentPrice = document.getElementById(priceID).innerHTML; //text of price
    currentPrice = currentPrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');  //ignoring '$' character and any other special character so that I can just have the number itself (can't do aritmetic with symbols)
    currentPrice = Number(currentPrice); //converting the price text from a string to a number

    //decreasing the total price
    let currentTotalPrice = document.getElementsByClassName('total')[0].innerHTML; //text of total price
    currentTotalPrice = currentTotalPrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''); //ignoring '$' character and any other special character so that I can just have the number itself (can't do aritmetic with symbols)
    currentTotalPrice = Number(currentTotalPrice); //converting the price text from a string to a number
    let newTotalPrice = currentTotalPrice - currentPrice; //subtracting current item to price from the total price
    document.getElementsByClassName('total')[0].innerHTML = newTotalPrice + '$';//putting the updated price into the text with the '$' symbol
}