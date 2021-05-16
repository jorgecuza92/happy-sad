
import { useState, useEffect } from 'react'


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
     
        <div>Add Application:
        <input type='text' placeholder='Company' onChange={onChange} name='company' required />
        <input type='checkbox' onChange={compCheck} name='seeComp' />
        <label>Hide Company</label>

        <input type='text' placeholder='Job Title' onChange={onChange} name='title' required />

        <input type='checkbox' name='seeJob' onChange={jobCheck} id='assessment' />
        <label>Hide JobTitle</label>


        <button onClick={addApp}>Submit</button></div>
  
    </div>
  )
}

export default Application