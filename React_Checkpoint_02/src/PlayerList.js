import React from 'react'
import players from './players'
import { Button, Card } from 'react-bootstrap'

const PlayerList = () => {
for(let i = 0; i < players.length; i++)
  return (
    <>
    
    {players.map(player => (
        <Card key={player.name} style={{ padding: '15px', backgroundColor: 'gray', width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card.Img src={player.portrait} width={200} height={200}></Card.Img>
            <Card.Body style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Card.Title style={{fontFamily: 'poppins'}}><h2>{player.name}</h2></Card.Title>
                <Card.Text>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{fontFamily: 'roboto'}}><b>TEAM:&nbsp;&nbsp;</b></p>
                        <p style={{fontFamily: 'roboto'}}>{player.team}</p>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{fontFamily: 'roboto'}}><b>NATIONALITY:&nbsp;&nbsp;</b></p>
                        <p style={{fontFamily: 'roboto'}}>{player.nationality}</p>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{fontFamily: 'roboto'}}><b>JERSEY NUMBER:&nbsp;&nbsp;</b></p>
                        <p style={{fontFamily: 'roboto'}}>{player.jerseyNumber}</p>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{fontFamily: 'roboto'}}><b>AGE:&nbsp;&nbsp;</b></p>
                        <p style={{fontFamily: 'roboto'}}>{player.age}</p>
                    </div>
                </Card.Text>
                <Button variant="primary" style={{fontFamily: 'roboto', width: '60%', padding: '2.5%', backgroundColor: '#dce6e1', border: '2px #dce6e1 solid'}}>LEARN MORE</Button>
            </Card.Body>
    </Card>
    ))}
    </>
  )
}

export default PlayerList