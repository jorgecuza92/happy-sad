
import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';
import './Application.css'

import Button from '@material-ui/core/Button';

function Application(props) {

  const [application, setApplication] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('id')
    const username = localStorage.getItem('username')
    const profileImage = localStorage.getItem('url')
    console.log(id)
    setApplication({
      id: id,
      username: username,
      profileImage: profileImage
    })
  }, [])


  const jobCheck = (e) => {
    if (e.target.value === 'on') {
      setApplication({
        ...application,
        seeJob: 1
      })
    } else {
      setApplication({
        ...application,
        seeJob: 0
      })
    }
  }

  const compCheck = (e) => {
    if (e.target.value === 'on') {
      setApplication({
        ...application,
        seeComp: 1
      })
    } else {
      setApplication({
        ...application,
        seeComp: 0
      })
    }
  }

  const onChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value
    })
  }

  const addApp = (props) => {

    props.apps()

    console.log('id')
    fetch('https://api.succeedatfailing.com/app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: application.id,
        username: application.username,
        profileImage: application.profileImage,
        company: application.company,
        title: application.title,
        seeComp: application.seeComp,
        seeJob: application.seeJob
      })
    }) .then (result => {
      const id = localStorage.getItem('id')
    const username = localStorage.getItem('username')
    const profileImage = localStorage.getItem('url')
    console.log(id)
    setApplication({
      id: id,
      username: username,
      profileImage: profileImage,
      company: '',
      title: '',
      seeComp: '',
      seeJob: ''
    })
    })
   
  }


  return (
    <div>
     
        <div>
          <div>
          <TextField id="standard-basic" onChange={onChange}  name='company' label="Company" />
       
       <FormControlLabel
         value="top"
         control={<Checkbox style={{color:"#614878"}}  />}
         label ="Hide Company"
         onChange={compCheck}
         
         name='seeComp'
         labelPlacement="top"
       />
          </div>
        
       
        <TextField id="standard-basic" onChange={onChange}  name='title' label="Job Title" />

       
        <FormControlLabel
          value="top"
          control={<Checkbox style={{color:"#614878"}}  />}
          label="Hide Job Title"
          onChange={jobCheck}
          size='small'
          name='seeJob'
          labelPlacement="top"
        />
       
          <Button
            variant="contained"
            
            size="small"
            onClick={()=> addApp(props)}
            style={{color:"white", background: "#c85f49" }}
            startIcon={<SaveIcon />}
          >
            Save Application
          </Button>
       </div>
  
    </div>
  )
}

export default Application