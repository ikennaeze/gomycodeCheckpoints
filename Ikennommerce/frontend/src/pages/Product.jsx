import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Breadcrum from '../components/breadcrum/Breadcrum'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../components/product_display/ProductDisplay'
import DescriptionBox from '../components/description_box/DescriptionBox'
import RelatedProducts from '../components/related_products/RelatedProducts'

const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams()
  const product = all_product.find((e) => e.id == Number(productId))

  return (
    <>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </>
  )
}

export default Product