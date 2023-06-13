import axios from "axios"


export const getAuthenticated = (accessToken) => {
    return axios.get( "https://port-0-joinus-koh2xlitnedv8.sel4.cloudtype.app/auth/authenticated", {params: { accessToken }});
}