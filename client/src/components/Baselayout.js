import './App.css'

import { Component } from 'react'
import Navbar from './Navbar/Navbar'
import { connect } from 'react-redux'


class BaseLayout extends Component {
    constructor() {
        super()
        this.state = {
            loggedin: false
        }
    }


    componentDidMount(props) {
        const token = localStorage.getItem('jsonwebtoken')
        if (token) {
            this.props.onLogin()
        }
    }

    render() {
        return (
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: () => dispatch({ type: 'LOGIN' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)