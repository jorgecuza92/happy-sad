import {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar';

function Top5() {


    const [top, setTop] = useState([])


    useEffect(() => {
        fetchTop5()
    }, [])

    const fetchTop5 = () => {
        fetch('http://localhost:8080/top')
        .then(response => response.json())
        .then (top => {
            console.log(top)
            setTop(top)
        })

    }

    let topApps = top.map((app, index) => {
        return (
            <div>
                # {index + 1}
                <br />
                <br />
                <Avatar alt="Remy Sharp" src={app.profileImage} />
    
                <br />
                {app.username} with <br />
                {app.total_apps} Applicationsapp
                <br />
                <br/>
                <br />
            </div>
        )
    })


    return (
        <div className='topBoxes' style={{'text-align': "-webkit-center"}}>
            <h1>Top 5</h1>
            <br />
            {topApps}
        </div>
    )

}

export default Top5