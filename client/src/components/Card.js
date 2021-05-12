import React, { useState } from 'react';
import './Card.css'
import {useEffect} from 'react'



function Card() {

  const [user, setUser] = useState('Your Username')
  const [application, setApplication] = useState({})
  const [emoji, setEmoji] = useState('15, 11, 12, 4')

  const viewStats = () => {

    fetch('http://localhost:8080/app', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: application.userId,
      })
    })

  return (
    <div className="Card">
      <div className="upperContainer">
        <div className="imageContainer">
          <img src="" alt="" height='170px' width='170px' />
        </div>
      </div>
      <div className="statsContainer">
        <h3> {this.body.userId} </h3>
        <h3> {applications} </h3>
        <h3> {emoji} </h3>
      </div>
    </div>
  )
}
}

export default Card
