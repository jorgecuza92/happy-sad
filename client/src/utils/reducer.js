const initialState = {
    loggedin: false
}

const reducer = (state = initialState, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            loggedin: true
        }
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            loggedin: false
        }
    }

    return state

}

export default reducer