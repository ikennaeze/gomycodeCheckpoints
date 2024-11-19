import React from 'react'
import new_collection from '../assets/new_collections'
import Item from '../items/Item'

const NewCollections = () => {
  return (
    <>
    <div className="flex flex-col items-center mt-32 font-['poppins'] gap-2 mb-28">
        <h1 className="text-[#171717] text-[24pt] font-semibold">NOW COLLECTIONS</h1>    
        <hr className="w-48 h-2 rounded-xl bg-[#252525]"/>
        <div className="grid mt-12 gap-8" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
          {new_collection.map((item, i) =>(
            <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
        </div>
    </div>
    </>
  )
}

export default NewCollections