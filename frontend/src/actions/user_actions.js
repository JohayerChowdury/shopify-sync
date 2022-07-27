import { useSetRecoilState } from 'recoil';
import { authAtom, usersAtom } from 'states';
import UserService from '../services/UserService';

export { useUserActions };

function useUserActions () {
    // const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const setAuth = useSetRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);

    return {
        login,
        logout,
        getAll
    }

    function login(username, password) {
        const loginResponse = UserService.login
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/login');
    }