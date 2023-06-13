import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticatedState } from '../../../atoms/Auth/AuthAtoms';

const AuthRoute = ({ path, element }) => {
    const navigate = useNavigate();
    const [ authState, setAuthState ] = useRecoilState(authenticatedState); 

    const { isLoading } = useQuery(
        ["authenticated"], 
        async () => {
            const option = {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}` ,
                },
            };
            return await axios.get("https://port-0-joinus-dihik2mlitgq33u.sel4.cloudtype.app/auth/authenticated", option);
        },{
            onSuccess: (response) => {
                if(response.status === 200 && response.data){
                    setAuthState(true);
                    if(path.startsWith("/auth") || path === "/"){
                        navigate("/main");
                    }    
                }else{
                    if(path.startsWith("/user") || path.startsWith("/main") || path.startsWith("/post")){
                        navigate('/auth/login');
                    }
                }
            }
        }
    );

    if(isLoading){
        return <></>
    }

    return element;
};

export default AuthRoute;