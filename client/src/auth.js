import { Component } from 'react'
import { connect } from 'react-redux'


function CanIGo (LoadThisComp) {
    
    class Auth extends Component {
       
        
        constructor(props) {
            super(props)

            if (!this.props.loggedin) {
                this.props.history.push('/')
            }
        }

            render () {
                return <LoadThisComp {...this.props} />
            }
    }

    const mapStateToProps = (state) => {
        return {
            loggedin: state.loggedin
        }
    }


return connect(mapStateToProps)(Auth)

}

export default CanIGo