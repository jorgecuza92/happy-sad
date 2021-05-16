
import {useState} from 'react';


function Register (){
    const [user, setUser] = useState({})

    const newUser = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const registerUser = () => {
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
        .then(result =>{
            if (result){
               console.log('user Registered')
            }
        })
    }

    return (

        <div>
        
            <h1>Register</h1>
            <br />
            <input type = 'text' onChange={newUser} placeholder='Email' name='email' />
            <input type = 'text' onChange={newUser} placeholder='Username' name='username' />
            <input type = 'password' onChange={newUser} placeholder='Password' name='password' />
            <button onClick={registerUser}>Register</button>


        </div>
    )
}

export default Register