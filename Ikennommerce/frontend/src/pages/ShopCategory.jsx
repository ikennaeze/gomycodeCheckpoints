import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import dropdown_icon from '../components/assets/dropdown_icon.png'
import Item from '../components/items/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  return (
    <>
    <div className="flex flex-col items-center ml-[10%]">
      <img src={props.banner} className="block mr-auto mt-8" />

      <div className="flex mt-0 mr-44 justify-between items-center">
        <p>
          <span className="font-semibold">Showing 1-12</span> out of 36 products
        </p>

        <div className="pt-2 pr-5 rounded-full border-[#888]">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="mt-5 mr-44 grid space-x-6" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
        {all_product.map((item, i) => {
          if(props.category == item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }else{
            return null
          }
        })}
      </div>

      <div className="flex justify-center items-center mt-36 w-60 h-16 rounded-full bg-[#ededed] text-[#787878] font-medium">Explore more</div>
    </div>
    </> 
  )
}

export default ShopCategory