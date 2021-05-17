import React from 'react';
import Card1 from './Card'
import Image from './Image';
import { Accordion } from '@material-ui/core';
import {Card} from '@material-ui/core'

function ProfilePage() {
  return (
    <div>
 
    <div className='cardContainer' style=
    {{'text-align': "-webkit-center"}}>
      <Card1 />
    </div>
    <Card>
    <div className=''>
      <Image />
      </div>
    </Card>
    </div>
  )
}

export default ProfilePage
