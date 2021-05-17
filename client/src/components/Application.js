
import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

function Application() {

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

  const addApp = () => {

    console.log('id')
    fetch('http://localhost:8080/app', {
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
        <TextField id="standard-basic" onChange={onChange}  name='company' label="Company" />
        {/* <input type='text' placeholder='Company' onChange={onChange} name='company' required /> */}
        <FormControlLabel
          value="top"
          control={<Checkbox color="primary" />}
          label="Hide Company"
          onChange={compCheck}
          size='small'
          name='seeComp'
          labelPlacement="top"
        />
        {/* <input type='checkbox' onChange={compCheck} name='seeComp' />
        <label>Hide Company</label> */}
        <TextField id="standard-basic" onChange={onChange}  name='title' label="Job Title" />

        {/* <input type='text' placeholder='Job Title' onChange={onChange} name='title' required /> */}
        <FormControlLabel
          value="top"
          control={<Checkbox color="primary" />}
          label="Hide Job Title"
          onChange={jobCheck}
          size='small'
          name='seeJob'
          labelPlacement="top"
        />
        {/* <input type='checkbox' name='seeJob' onChange={jobCheck} id='assessment' />
        <label>Hide JobTitle</label> */}
          <Button
            variant="contained"
            color="default"
            size="small"
            onClick={addApp}
            startIcon={<CloudUploadIcon />}
          >
            Add Application
          </Button>
       </div>
  
    </div>
  )
}

export default Application