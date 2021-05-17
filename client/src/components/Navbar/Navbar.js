import React, { Component } from 'react';
import './Navbar.css';
import { Button } from '../Button';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'



class Navbar extends Component {
    state = { clicked: false }

 

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }




    render() {
        return (
            <nav className="NavbarItems">
                <NavLink to="/">
                    <h1 className="navbar-logo">SAF<i className="fab fa-react"></i></h1>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                </NavLink>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>

                    <li key="Home">
                        <NavLink to="/" onClick={this.handleClick} className="nav-links">Home</NavLink>
                    </li>
                    <li key="Tracker">
                        <NavLink to="/app-track" onClick={this.handleClick} className="nav-links">Tracker</NavLink>
                    </li>
                    <li key="Profile">
                        <NavLink to="/profile" onClick={this.handleClick} className="nav-links">Profile</NavLink>
                    </li>
                    {this.state.clicked ? <div>{this.props.loggedin ? null : <NavLink className="nav-links" onClick={this.handleClick} to="/register">Register</NavLink>}</div> : null}
                    {this.state.clicked ? <div> {this.props.loggedin ? null :<NavLink className="nav-links" onClick={this.handleClick} to="/login">Login</NavLink>}</div> : null}
                    {this.state.clicked ? <div>{this.props.loggedin ? <NavLink className="nav-links" onClick={this.handleClick} to="/logout">Logout</NavLink> : null }</div> : null}
                </ul>
                
                {this.props.loggedin ? null : <NavLink className="nav-links" to="/register"><Button>Register</Button></NavLink>}
                {this.props.loggedin ? null :<NavLink to="/login"><Button>Login</Button></NavLink>}
                {this.props.loggedin ? <NavLink to="/logout"><Button>Logout</Button></NavLink> : null }

            </nav>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        loggedin: state.loggedin
    }
}



export default connect(mapStateToProps)(Navbar);
