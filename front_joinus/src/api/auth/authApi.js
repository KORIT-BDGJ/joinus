import axios from "axios"


export const getAuthenticated = (accessToken) => {
    return axios.get( "http://3.39.18.64/auth/authenticated", {params: { accessToken }});
}