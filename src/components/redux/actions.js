import axios from "axios"

const API = "http://localhost:8000/users"

export const getUsers = () => {
    return async dispatch => {
        let filter = window.location.search
        const {data} = await axios(`${API}/${filter}`)
        dispatch({
            type:"GET_USERS",
            payload:data
        })
    }
}