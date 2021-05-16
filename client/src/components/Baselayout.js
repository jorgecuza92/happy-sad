import './App.css'

import {Component} from 'react'
import Navbar from './Navbar/Navbar'
import {connect} from 'react-redux'


 class BaseLayout extends Component{
    constructor() {
        super()
        this.state = {
            loggedin: null
        }
    }


componentDidMount(props) {
const token = localStorage.getItem('jsonwebtoken')
if (token) {
console.log('token present')
}
else {
    console.log('else')
}
}

    render(){
            return(
                <div>
                  <Navbar />  
                    {this.props.children}                 
                </div>
                )
        }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.loggedin
    }
}

export default connect(mapStateToProps)(BaseLayout)