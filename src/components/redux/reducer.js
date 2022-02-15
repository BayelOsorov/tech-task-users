const INIT_STATE = {
    users:null
}
export const usersReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case "GET_USERS" :
            return {...state,users: action.payload}
        default:
        return state;
    }
}