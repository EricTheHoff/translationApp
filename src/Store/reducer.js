const initialState = { loggedIn: false, userId: null, userZip: null, profileImage:'user' }

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
                userId: null
            }
        case 'Active Zip':
            return {
                ...state,
                userZip: action.payload
            }
        case 'Inactive Zip':
            return {
                ...state,
                userZip: null
            }
        case 'profileImage' :
            return {
                ...state,
                profileImage: action.payload
            }
        default:
            return state
    }
}

export default reducer