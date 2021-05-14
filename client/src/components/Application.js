import react from 'react';
import { useState } from 'react'

function Application() {

const [application, setApplication] = useState('')

const onChange = (e) => {
  setApplication({
    ...application,
    [e.target.name]: e.target.value
  })
}

const addApp = () => {
const user = localStorage.getItem('username')
  fetch('http://localhost:8080/app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: user,
      company: application.company,
      title: application.title,
    })
  })


}

  return (
    <div>
      <form action="#">
        <h3>Fill out the following:</h3>
        <input type='text' placeholder='User Id' onChange={onChange} name='userId' required />
        <input type='text' placeholder='Company' onChange={onChange} name='company' required />
        <input type='text' placeholder='Job Title' onChange={onChange} name='title' required />
        <input type='checkbox' name='assessment' onChange={onChange} id='assessment'/>
          <label>Assessment</label>
        <input type='checkbox' onChange={onChange} name='interiew' />
          <label>Interview</label>
        <input type='checkbox' onChange={onChange} name='rejection' />
          <lable>Rejection</lable>
        <input type='checkbox' onChange={onChange} name='visibility' />
          <label>Hide Application</label>
        <button onClick={addApp}>Submit</button>
      </form>
    </div>
  )
}

export default Application