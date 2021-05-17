import {useEffect, useState} from 'react'
import axios from 'axios'
import { Checkbox } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Application from './Application';



function Apptracker(props){

    const [apps, setApps] = useState([])
 
    
    useEffect(()=>{
        fetchAllApps()
    }, [])

//Grabs user's apps
    const fetchAllApps = () =>{
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('jsonwebtoken')

        fetch(`http://localhost:8080/profile/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
                setApps(response)     
        })

    }
//Search
    const handleChange = (e) => {
     
        if (e.target.value === "") {
            fetchAllApps();
          } else {
        const username = localStorage.getItem('username')
        axios
        .get(`http://localhost:8080/search/${e.target.value},${username}`)
        .then((response) => {
          if (response.data === "") {
            fetchAllApps();
          } else {
            setApps(response.data);
         
          }
        
        });
    }
    }



//  Change application status
    const handleStatus = (e) =>{
      
        const id = e.target.value
        const decision = e.target.name
        console.log(decision)
        fetch(`http://localhost:8080/${decision}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then((response)=>{
            console.log(response)
            fetchAllApps();
        })

    }

    

    const applications = apps.map((app)=>{
        if(app.hide_application){
            return null
        } else {
            return <div className="postDiv" key={app.id}>
        
        <div style={{fontSize:'10pt'}}>{app.title}</div>
        <p style={{fontSize:'10pt'}}>{app.company}</p>

        <FormControl component="fieldset" className='haha'>
        <FormLabel component="legend">Application Status</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus}  disabled ={app.interview? true:false} value={app.id} name="interview" />}
            label="Interview"
          />
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus} disabled  ={app.assessment? true:false} value={app.id} name="assessment" />}
            label="Assessment"
          />
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus}  disabled={app.rejection? true:false} value={app.id} name="delete" />}
            label="Rejection"
          />
        </FormGroup>
       
      </FormControl>
      <IconButton onClick={handleStatus} name='hide' value={app.id} aria-label="delete">
        <DeleteIcon />
        </IconButton>
       
        </div>
        }
       
    })

    return (

        <div>
            <h1>App Tracker</h1>
            <TextField
          id="outlined-full-width"
        
          style={{ margin: 8 }}
          placeholder="Title or Company Name"
          
          onChange={handleChange}
          fullWidth
          name ='name '
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
            
            {/* <button onClick={handleSearch}>Search</button> */}

            {applications}
        </div>
    )


}

export default Apptracker

