import React from 'react'
import arrow_icon from '../assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <>
    <div className="flex items-center ml-28 mb-6 gap-2 text-[#5e5e5e] font-semibold mt-14 mr-44" style={{textTransform: "capitalize"}}>
        HOME <img src={arrow_icon} /> SHOP <img src={arrow_icon} /> {product.category} <img src={arrow_icon} /> {product.name}
    </div>
    </>
  )
}

export default Breadcrum