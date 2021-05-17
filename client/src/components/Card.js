import React, { useState } from "react";
import "./Card.css";
import {useEffect} from 'react'
import {Card} from '@material-ui/core'

function ProfileCard(props) {

  const [user, setUser] = useState({})
  
  useEffect(() => {
    fetchAllStats()
  },[])


  const fetchAllStats = () => {

    const token = localStorage.getItem('jsonwebtoken')
    const id = localStorage.getItem('id')

    fetch(`http://localhost:8080/user/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(user => {
        localStorage.setItem('id', user.id)
        setUser(user)
    })
  }

  
  // const profileURL = URL.createObjectURL(`${user.profileImage}`)
  
    return (
          <Card>
        <div>
          <div className="Card">
            <div className="upperContainer">
              <div className="imageContainer">
                <img src={user.profileImage} alt="profileImage" height="170px" width="170px" />
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
              <div className="totalAppsContainer">
                
              </div>
            </div>
          </div>
        </div>
          </Card>
      );

}



export default ProfileCard;
