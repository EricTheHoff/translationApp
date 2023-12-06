const initialState = { loggedIn: false, userId: null }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Logged In':
            return {
                ...state,
                loggedIn: true
            }
        case 'Logged Out':
            return {
                ...state,
                loggedIn: false
            }
        case 'Active User':
            return {
                ...state,
                userId: action.payload
            }
        case 'Inactive User':
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state
    }
}

export default reducer