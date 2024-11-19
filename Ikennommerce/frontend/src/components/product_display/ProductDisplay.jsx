import React, { useContext } from 'react'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props
    const {addToCart} = useContext(ShopContext);

  return (
    <>
    <div className="flex ml-28">
        <div className="flex gap-4">
            <div className="flex flex-col gap-4">
                <img src={product.image} className="h-40" />
                <img src={product.image} className="h-40" />
                <img src={product.image} className="h-40" />
                <img src={product.image} className="h-40" />
            </div>

            <div className="flex flex-col gap-4">
                <img src={product.image} className="w-[577px] h-[687px]" />
            </div>
        </div>

        <div className="ml-16 flex flex-col">
            <h1 className="text-[#3d3d3d] text-[24pt] font-bold">{product.name}</h1>

            <div className="flex items-center mt-3 gap-1 text-[#1c1c1c] text-[14pt]">
                <img src={star_icon} />
                <img src={star_icon} />
                <img src={star_icon} />
                <img src={star_icon} />
                <img src={star_dull_icon} />
                <p>(122)</p>
            </div>

            <div className="flex mt-10 gap-8 text-[16pt] font-bold">
                <div className="text-[#818181] line-through">${product.old_price}</div>
                <div className="text-[#ff4141]">${product.new_price}</div>
            </div>

            <div className="productDisplay-right-description">idk it just looks cool</div>

            <div className="productDisplay-right-size">
                <h1 className="mt-14 text-[#656565] text-[16pt] font-semibold">Select Size</h1>
                <div className="flex mt-8 gap-4">
                    <div className="p-4 bg-[#fbfbfb] border border-[#ebebeb] rounded-sm cursor-pointer">S</div>
                    <div className="p-4 bg-[#fbfbfb] border border-[#ebebeb] rounded-sm cursor-pointer">M</div>
                    <div className="p-4 bg-[#fbfbfb] border border-[#ebebeb] rounded-sm cursor-pointer">L</div>
                    <div className="p-4 bg-[#fbfbfb] border border-[#ebebeb] rounded-sm cursor-pointer">XL</div>
                    <div className="p-4 bg-[#fbfbfb] border border-[#ebebeb] rounded-sm cursor-pointer">XXL</div>
                </div>
            </div>

            <button className="p-4 mt-10 w-52 text-[14pt] text-white bg-[#ff4141] mb-10 border-none outline-none cursor-pointer" onClick={() => addToCart(product.id)}>ADD TO CART</button>
            <p className="mt-3"><span className="font-semibold">Category:</span> Women, T-Shirt, Crop Top</p>
            <p className="mt-3"><span className="font-semibold">Tags:</span> Modern, Latest</p>
        </div>
    </div>
    </>
  )
}

export default ProductDisplay