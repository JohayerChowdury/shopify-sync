import axios from 'axios';
import { authAtom } from '../states/authStates';
import {useRecoilState} from 'recoil';

function UserService() {
    const [auth, setAuth] = useRecoilState(authAtom);

const login = () => {
    return axios.post('/shopify_api/users/login');
}

const register = () => {
    return axios.post('/shopify_api/users/register');
}
const forgot_password = () => {
    return axios.post('/shopify_api/users/forgot_password');
}

const getOne = () => {
    return axios.get('/shopify_api/users/profile');
}

const tokenIsValid = () => {
    return axios.post('/shopify_api/users/tokenIsValid');
}


return {
    login,
    register,
    forgot_password,
    getOne,
    tokenIsValid,
}

}
export default UserService();
