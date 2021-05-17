import React from 'react';
import Card1 from './Card'
import Image from './Image';
import { Accordion } from '@material-ui/core';
import {Card} from '@material-ui/core'
import './Image.css'
import './ProfilePage.css'

function ProfilePage() {
  return (
    <div className='overallDiv' style=
    {{'text-align': "-webkit-center"}}>
 
    <div className='cardContainer' style=
    {{'text-align': "-webkit-center"}}>
      <br />
      <Card1 />
      <br></br>
    </div>
    <div className='inputContainer'>
      <Image />
    <div className='updateEmail'>
    </div>
      </div>
    </div>
  )
}

export default ProfilePage
