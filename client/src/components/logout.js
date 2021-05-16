import { Component } from 'react'
import { connect } from 'react-redux'


class Logout extends Component {

    componentDidMount() {
        localStorage.clear()
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps)(Logout)