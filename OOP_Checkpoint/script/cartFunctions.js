const productsContainer = document.getElementById('products-container')
const product = document.getElementById('product')
const cart = document.getElementById('shopping-cart')
const cartItems = document.getElementById('cart-items')
const cartItemAmounts = document.getElementById('cart-item-amounts')
const cartItemsTotals = document.getElementById('cart-items-totals')
const cartItemsContainer = document.getElementById('cart-items-container')
let totalNumberOfItems = document.getElementById('total-items')

class Product {
    constructor(id, name, price){
        this.id = id
        this.name = name
        this.price = price
    }
}

class ShoppingCart extends Product{
    increaseQuantity = (event) => {
        let itemQuantity = event.nextElementSibling
        let subtotal = document.getElementById('subtotal')
        let taxes = document.getElementById('taxes')
        let totalPrice = document.getElementById('total-price')
        
        itemQuantity.innerHTML = Number(itemQuantity.innerHTML) + 1 //increase item quantity
        totalNumberOfItems.innerHTML = Number(totalNumberOfItems.innerHTML) + 1 //increase total number of items

         //increase item amount and its price
         for(let i = 0; i < cartItemAmounts.children.length; i++){

            let itemAmountID = cartItemAmounts.children[i].getAttribute('id') //getting the item amount name from existing item amounts
            let itemAmount = cartItemAmounts.children[i].firstElementChild.nextElementSibling.firstElementChild //item amount
            let itemAmountQuantity = cartItemAmounts.children[i].firstElementChild.children[2]

            //if the cart item amount name is the same as the item name, remove that shit too
            if(itemAmountID == event.parentElement.parentElement.getAttribute('id')){
                itemAmount.innerHTML = '$' + (Number(itemAmount.innerHTML.replace(/[$]/g, '')) + Number(itemAmount.innerHTML.replace(/[$]/g, '')))
                itemAmountQuantity.innerHTML = Number(itemAmountQuantity.innerHTML) + 1
                //increase the price
                subtotal.innerHTML = '$' + (Number(subtotal.innerHTML.replace(/[$]/g, '')) + Number(itemAmount.innerHTML.replace(/[$]/g, '')))
                taxes.innerHTML = '$' + (Number(subtotal.innerHTML.replace(/[$]/g, '')) * 0.13)
                totalPrice.innerHTML = '$' + (Number(subtotal.innerHTML.replace(/[$]/g, '')) + Number(taxes.innerHTML.replace(/[$]/g, '')))
            }
        }

    }

    decreaseQuantity = (event) => {
        let itemQuantity = event.previousElementSibling
        let lessThan1 = Number(itemQuantity.innerHTML) <= 1;
        let subtotal = document.getElementById('subtotal')
        let taxes = document.getElementById('taxes')
        let totalPrice = document.getElementById('total-price')
                
        //if the quantity is 1 or more keep it up, otherwise delete it
        if(!lessThan1){
            itemQuantity.innerHTML = Number(itemQuantity.innerHTML) - 1 //increase item quantity
            totalNumberOfItems.innerHTML = Number(totalNumberOfItems.innerHTML) - 1 //increase total number of items
        } else {
            totalNumberOfItems.innerHTML = Number(totalNumberOfItems.innerHTML) - 1
            this.removeItem(event.parentElement.parentElement, event.parentElement.parentElement.parentElement)//deletes item since the item quantity being less than means that there are no items left
        }
    }

    addItem = (event) => {
        console.log()

        //creating item
        let item = new Product()
        item.id = event.parentElement.getAttribute('id')
        item.name = event.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
        item.icon = event.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('src')
        item.price = event.previousElementSibling.previousElementSibling.innerHTML.replace(/[$]/g, '') //remove any symbols
        item.price = Number(item.price)

        if(Number(totalNumberOfItems.innerHTML) == 0){
            var firstCartItem = `
            <div class="flex flex-row items-center justify-between bg-slate-400 p-3" id=${item.id}>
                <img src=${item.icon} alt="" class="w-[75px]">
                <h1 class="font-['poppins'] text-[20pt] font-semibold">${item.name}</h1>
                <div class="flex flex-col">
                    <button id="increaseQuantity" onclick="increaseQuantity(this)"><span class="material-symbols-outlined">arrow_drop_up</span></button>
                    <p class="text-center">1</p>
                    <button id="decreaseQuantity" onclick="decreaseQuantity(this)"><span class="material-symbols-outlined">arrow_drop_down</span></button>
                </div>
            </div>`
            
            var firstCartItemAmount =`
                <div class="flex justify-between mt-3 bg-[#acb6c4] p-2" id=${item.id}>
                    <div>
                        <h3 class="inline font-['roboto'] text-[14.5pt]">${item.name}</h3>
                        <h3 class="inline font-['roboto'] text-[14.5pt]">x</h3>
                        <h3 class="inline font-['roboto'] text-[14.5pt]">1</h3>
                    </div>
                    <div><h3 class="inline font-['roboto'] text-[14.5pt]">$${item.price}</h3></div>
                </div>
            `

            var firstCartItemTotals = `
                <div class="mt-9 bg-[#acb6c4] p-2">
                    <div class="flex flex-row justify-between">
                        <h3 class="inline font-['roboto'] text-[14.5pt]"> SUBTOTAL:</h3>
                        <h3 class="inline font-['roboto'] text-[14.5pt] ml-24" id="subtotal">$${item.price}</h3>
                    </div>
                    <div class="flex flex-row justify-between">
                        <h3 class="inline font-['roboto'] text-[14.5pt]"> TAXES:</h3>
                        <h3 class="inline font-['roboto'] text-[14.5pt] ml-[132px]" id="taxes">$${item.price * 0.13}</h3>
                    </div>
                </div>

                <div class="mt-9 bg-[#9ba8ba] p-2">
                    <h3 class="inline font-['roboto'] text-[14.5pt] font-bold"> TOTAL:</h3>
                    <h3 class="inline font-['roboto'] text-[14.5pt] ml-32 font-bold" id="total-price">$${item.price + (item.price*0.13)}</h3>
                </div>
            `

            cartItemsContainer.removeChild(cartItemsContainer.firstElementChild)
            cartItems.innerHTML = firstCartItem
            cartItemAmounts.innerHTML = firstCartItemAmount
            cartItemsTotals.innerHTML = firstCartItemTotals

        }else{
            
            
                //if the item isn't in the cart, add the item
                
                    //item itself
                    var cartItem = `
                    <div class="flex flex-row items-center justify-between space-x-10 bg-slate-400 p-3 mt-3" id=${item.id}>
                        <img src=${item.icon} alt="" class="w-[75px]">
                        <h1 class="font-['poppins'] text-[20pt] font-semibold">${item.name}</h1>
                        <div class="flex flex-col">
                            <button id="increaseQuantity" onclick="increaseQuantity(this)"><span class="material-symbols-outlined">arrow_drop_up</span></button>
                            <p class="text-center">1</p>
                            <button id="decreaseQuantity" onclick="decreaseQuantity(this)"><span class="material-symbols-outlined">arrow_drop_down</span></button>
                        </div>
                    </div>
                `
                    //amount of items and its price tag
                    var carItemAmount = `
                    <div class="flex justify-between mt-3 bg-[#acb6c4] p-2" id=${item.id}>
                        <div>
                            <h3 class="inline font-['roboto'] text-[14.5pt]">${item.name}</h3>
                            <h3 class="inline font-['roboto'] text-[14.5pt]">x</h3>
                            <h3 class="inline font-['roboto'] text-[14.5pt]">1</h3>
                        </div>
                        <div><h3 class="inline font-['roboto'] text-[14.5pt]">$${item.price}</h3></div>
                    </div>
        `
                    cartItems.innerHTML = cartItems.innerHTML + cartItem
                    cartItemAmounts.innerHTML = cartItemAmounts.innerHTML + carItemAmount
        }

        //showing total number of items in cart
        totalNumberOfItems.style.display = 'block'
        totalNumberOfItems.innerHTML = Number(totalNumberOfItems.innerHTML) + 1
    }

    removeItem = (item, parent) => {
        let itemName = item.children[1].innerHTML //name of item that's going to be deleted
        let subtotal = document.getElementById('subtotal')
        let taxes = document.getElementById('taxes')
        let totalPrice = document.getElementById('total-price')

        //looping through existing cart item amounts
        for(let i = 0; i < cartItemAmounts.children.length; i++){

            let itemAmountName = cartItemAmounts.children[i].firstElementChild.firstElementChild.innerHTML //getting the item amount name from existing item amounts
            let itemAmount = Number(cartItemAmounts.children[i].firstElementChild.nextElementSibling.firstElementChild.innerHTML.replace(/[$]/g, '')) //item amount

            //if the cart item amount name is the same as the item name, remove that shit too
            if(itemAmountName == itemName){
                cartItemAmounts.removeChild(cartItemAmounts.children[i])
                //lower the price now that the item is gone
                subtotal.innerHTML = '$' + (Number(subtotal.innerHTML.replace(/[$]/g, '')) - itemAmount)
                taxes.innerHTML = '$' + (Number(subtotal.innerHTML.replace(/[$]/g, '')) * 0.13)
                totalPrice.innerHTML = '$' + (Number(subtotal.innerHTML.replace(/[$]/g, '')) + Number(taxes.innerHTML.replace(/[$]/g, '')))
            }
        }

        parent.removeChild(item) //remove the cart item afterwards

        if(Number(totalNumberOfItems.innerHTML) <= 0){
            var statusQuo = `
            <h1>No items in cart</h1>
            <div id="cart-items"></div>
            <div id="cart-item-amounts"></div>
            <div id="cart-items-totals"></div>
            `

            cartItemsContainer.innerHTML = statusQuo
            totalNumberOfItems.style.display = 'none'
        }
    }
}


//show cart items when the cart is clicked
cart.addEventListener("click", () => {
    cartItemsContainer.style.opacity = '0'
    cartItemsContainer.style.transition = 'opacity 0.75s'

    if(cartItemsContainer.style.display == 'block'){
        setTimeout(() => {
            cartItemsContainer.style.display = 'none'
        }, 750)
        cartItemsContainer.style.opacity = '0'
        cartItemsContainer.style.transition = 'opacity 0.75s'
        
        cartItemsContainer.animate([
            // key frames
            { transform: 'translateY(0px)'},
            { transform: 'translateY(20px)' }
        ], {
            // sync options
            duration: 750,
            iterations: 1
        });
    }else{
        setTimeout(() => {
            cartItemsContainer.style.opacity = '1'
        }, 0)
        cartItemsContainer.style.display = 'block'
        cartItemsContainer.animate([
            // key frames
            { transform: 'translateY(20px)'},
            { transform: 'translateY(0px)' }
        ], {
            // sync options
            duration: 750,
            iterations: 1
        });
    }
})


//add item to cart when user presses 'ADD TO CART' button
const addToCartEventListener = (event) => {
    let cart = new ShoppingCart()
    cart.addItem(event)
}

//increase quantity of item when upper arrow is clicked
const increaseQuantity = (event) => {
    let cart = new ShoppingCart()
    cart.increaseQuantity(event)
}

//decrease quantity of item when lower arrow is clicked
const decreaseQuantity = (event) => {
    let cart = new ShoppingCart()
    cart.decreaseQuantity(event)
}