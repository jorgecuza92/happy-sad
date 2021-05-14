import {useEffect, useState} from 'react'
import axios from 'axios'
import { Checkbox } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';


function Apptracker(props){

    const [apps, setApps] = useState([])
 
    
    useEffect(()=>{
        fetchAllApps()
    }, [])

//Grabs user's apps
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
//Search
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



//  Change application status
    const handleStatus = (e) =>{
      
        const id = e.target.id
        const decision = e.target.name
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
            return <div className="postDiv">
        
        <div style={{fontSize:'10pt'}}>{app.title}</div>
        <p style={{fontSize:'10pt'}}>{app.company}</p>

        <FormControl component="fieldset" className='haha'>
        <FormLabel component="legend">Application Status</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus}  disabled ={app.interview? true:false} id={app.id} name="interview" />}
            label="Interview"
          />
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus} disabled  ={app.assessment? true:false} id={app.id} name="assessment" />}
            label="Assessment"
          />
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus}  disabled={app.rejection? true:false} id={app.id} name="delete" />}
            label="Rejection"
          />
        </FormGroup>
       
      </FormControl>
      <IconButton onClick={handleStatus} name='hide' id={app.id} aria-label="delete">
        <DeleteIcon />
        </IconButton>
       
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

