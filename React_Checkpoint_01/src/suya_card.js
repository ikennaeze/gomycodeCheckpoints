import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Name from './name';
import Price from './price';
import Image from './image';
import Description from './description';

const suya_card = () => {
  return (
    <Card style={{ padding: '15px', backgroundColor: 'gray', width: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image></Image>
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}><Name/></Card.Title>
        <Card.Text>
          <Description/>
        </Card.Text>
        <Button variant="primary" style={{ marginLeft: '17%', padding: '1%', backgroundColor: '#dce6e1', border: '2px #dce6e1 solid', borderRadius: '5px'}}>Buy this masterpiece</Button>
      </Card.Body>
    </Card>
  )
}

export default suya_card