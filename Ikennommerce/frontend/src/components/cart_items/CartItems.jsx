import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext)
  return (
    <>
    <div className="mx-44 my-24">
        <div className="grid items-center gap-20 pt-4 text-[#454545] text-xl font-semibold" style={{gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1fr 1fr"}}>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>

        <hr className="h-1 bg-[#e2e2e2] border-[0]" />
        {all_product.map((e) => {
            //if the item is greater than zero, then the cart item is available
            if(cartItems[e.id] > 0){
                return (
                    <>
                     <div>
                        <div className="grid items-center gap-20 pt-4 text-[#454545] text-xl font-medium" style={{gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1fr 1fr"}}>
                            <img src={e.image} className="h-16" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className="w-16 h-11 border-2 border-[#d6d5d5] bg-white">{cartItems[e.id]}</button>
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img className="mx-10 w-4 cursor-pointer" src={remove_icon} onClick={() => removeFromCart(e.id)} />
                        </div>
                    </div>
                    </>
                )
            }
        })}

        <div className="flex mt-24">
            <div className="flex flex-1 flex-col mr-48 gap-10">
                <h1 className="text-[20pt]">Cart Totals</h1>
                
                <div>
                    <div className="flex justify-between pt-4">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />

                    <div className="flex justify-between pt-4">
                        <p>Shipping Fee</p>
                        <p>FREE</p>
                    </div>
                    <hr />

                    <div className="flex justify-between pt-4">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>

                <button className="w-64 h-14 outline-none border-none bg-[#ff5a5a] text-white text-lg font-semibold cursor-pointer">PROCEED TO CHECKOUT</button>

            </div>

            <div className="flex-1 text-lg font-medium">
                <p className="text-[#555]">If you you have a promo code, Enter it here:</p>
                <div className="w-[504px] mt-4 pl=5 h-14 bg-[#eaeaea]">
                    <input type="text" className="border-none outline-none bg-transparent text=;g w-80 h-14" placeholder="promo code" />
                    <button className="w-44 h-14 text-lg bg-black text-white cursor-pointer">Submit</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CartItems