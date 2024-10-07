import React from 'react'
import product from './product'
import { CardImg } from 'react-bootstrap'


const image = () => {
  return (
    <CardImg variant='top' src={product.image} width={200}></CardImg>
  )
}

export default image