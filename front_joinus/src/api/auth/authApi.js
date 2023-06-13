import axios from "axios"


export const getAuthenticated = (accessToken) => {
    return axios.get( "https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/auth/authenticated", {params: { accessToken }});
}