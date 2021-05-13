import React, { useState } from "react";
import { Component } from "react";
import "./Card.css";
import {useEffect} from 'react'

function Card(props) {

  const [user, setUser] = useState({})
  
  useEffect(() => {
    fetchAllStats()
  },[])


  const fetchAllStats = () => {
    const token = localStorage.getItem('jsonwebtoken')
    fetch(`http://localhost:8080/user/2`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(user => {
        console.log(user)
        setUser(user)
    })
  }

  
  const profileURL = URL.createObjectURL(`${user.profileImage}`)
  
    return (
        <div>
          <div className="Card">
            <div className="upperContainer">
              <div className="imageContainer">
                <img src={user.profileImage} alt="" height="170px" width="170px" />
              </div>
            </div>
            <div className="statsContainer">
              <h3> {user.username}'s stats: </h3>
              <div className='emojiStatsContainer'><br></br>
                <h4>Raised Hands: 🙌  {user.raised_hands}</h4>
                <h4>Heart: 💛 {user.heart}</h4>
                <h4>Tada: 🎉  {user.tada}</h4>
                <h4>Grinning: 😊  {user.grinning}</h4>
              </div>
            </div>
          </div>
        </div>
      );

}



export default Card;
