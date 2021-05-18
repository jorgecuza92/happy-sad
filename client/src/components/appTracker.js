import {useEffect, useState} from 'react'
import axios from 'axios'
import { Checkbox } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Application from './Application';
import Switch from '@material-ui/core/Switch';
import './appTracker.css'
import {Animated} from 'react-animated-css'



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
//Search user apps 
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
        console.log(id)
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
            return <div className="appList" key={app.id}>
        
        {/* <div style={{fontSize:'10pt', color:"#c85f49"}}>{app.title}</div>
        <p style={{fontSize:'10pt', color:"#c85f49"}}>{app.company}</p> */}

        <FormControl component="fieldset" className='haha'>
        <FormLabel  style={{color:"#c85f49"}} component="legend">{app.title}<br></br>{app.company} </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus} style={{color:"#614878"}} disabled ={app.interview? true:false} value={app.id} name="interview" />}
            label="Interview"
          />
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus}  style={{color:"#614878"}} disabled  ={app.assessment? true:false} value={app.id} name="assessment" />}
            label="Assessment"
          />
          <FormControlLabel
            control={<Checkbox  onChange={handleStatus} style={{color:"#614878"}}  disabled={app.rejection? true:false} value={app.id} name="delete" />}
            label="Rejection"
            
          />
           
        </FormGroup>
        <Animated animationIn='hinge'>
          <FormControlLabel
        control={<Switch  onChange={handleStatus} style={{color:"#c85f49"}} color='primary' value={app.id}  name="hide" />}
        label="Hide Application"
      />
      </Animated>
      </FormControl>
    
        </div>
        }
       
    })

    return (
        <div className='overallContainer'>
        <div className='appTrackerContainer'>
       
       <br />
           
            
            <br />
            <div className='appSearchInputContainer'>
            <TextField
          id="outlined"
        
          style={{ 'margin': "8px auto", background: 'white', placeholder: 'purple'}}
          placeholder="Search for Title or Company Name"
          color = 'white'
          onChange={handleChange}
          fullWidth
          size='medium'
          name ='name '
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
            </div>
            <br />
            
            <div className='appContent'>

            <div className="trackDiv">
                <Application />
            </div>
            
          <div className='applications'>
            {applications}
            </div>
            

            </div>
        </div>
        </div>
    )


}

export default Apptracker


// display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between;
// }

