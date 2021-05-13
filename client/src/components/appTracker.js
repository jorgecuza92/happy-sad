import {useEffect, useState} from 'react'
import axios from 'axios'

function Apptracker(props){

    const [apps, setApps] = useState([])
 
    
    useEffect(()=>{
        fetchAllApps()
    }, [])


    const fetchAllApps = () =>{
        const username = localStorage.getItem('username')

        axios.get(`http://localhost:8080/profile/${username}`)
        .then(response => {
            if(response.data.error){
                console.log(response.data.error)
            } else {
                setApps(response.data)
                
            }
        })

    }

    const handleChange = (e) => {
     
        if (e.target.value === "") {
            fetchAllApps();
          } else {
        const username = localStorage.getItem('username')
        axios
        .get(`http://localhost:8080/search/${e.target.value},${username}`)
        .then((response) => {
          if (response.data == "") {
            fetchAllApps();
          } else {
            setApps(response.data);
         
          }
        
        });
    }
    }

    const handleDel = (e) =>{
        const id = e.target.name
        fetch('http://localhost:8080/delete/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
        .then(result =>{
            if (result){
                fetchAllApps();
            } else {
                console.log('error')
            }
        })
    }


    

    const applications = apps.map((app)=>{
        if(app.hide_application){
            return null
        } else {
            return <div className="postDiv">
        
        <div style={{fontSize:'10pt'}}>{app.title}</div>
        <p style={{fontSize:'10pt'}}>{app.company}</p>
        <button onClick={handleDel} name={app.id} >Rejection</button>
        </div>
        }
       
    })

    return (

        <div>
            <h1>App Tracker</h1>
            <input type="text" placeholder = 'Title or Company ' onChange={handleChange}  name ='name '/>
            {/* <button onClick={handleSearch}>Search</button> */}

            {applications}
        </div>
    )


}

export default Apptracker

