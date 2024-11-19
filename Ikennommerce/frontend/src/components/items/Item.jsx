import React from 'react'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <>
        <div className="w-80 hover:transform hover:scale-105 duration-[600ms]">
          <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="" /></Link>
            <p className="mt-2 ml-0">{props.name}</p>
            <div className="flex gap-5">
                <div className="text-[#374151] text-[16pt] font-semibold">${props.new_price}</div>
                <div  className="text-[#8c8c8c] text-[16pt] font-medium line-through">${props.old_price}</div>
            </div>
        </div>
    </>
  )
}

export default Item