import React from 'react'
import data_product from '../assets/data'
import Item from '../items/Item'

const RelatedProducts = () => {
  return (
    <>
    <div className="flex flex-col items-center mt-6 gap-3 h-[90vh]">
        <h1 className="text-[#171717] font-28pt] font-semibold">Related Products</h1>
        <hr className="w-48 h-2 rounded-xl bg-[#252525]" />

        <div className="mt-12 flex gap-8">
            {data_product.map((item, i) => (
                <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            ))}
        </div>
    </div>
    </>
  )
}

export default RelatedProducts