import { useSetRecoilState } from 'recoil';
import { authAtom, userAtom } from '../states';

import UserService from '../services/UserService';
import { history } from '../helpers/history';

export { useUserActions };

function useUserActions() {
  const baseUrl = `${process.env.API_URL}/users`;
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(userAtom);

  return {
    login,
    logout,
    register,
    forgot_password,
    getAll,
  };

  async function login(email, password) {
    const user = await UserService.post(`${baseUrl}/login`, {
      email,
      password,
    });
    //store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    setAuth(user);
    //get return url from location state or default to home page
    const { from } = history.location.state || { from: { pathname: '/' } };
    history.push(from);
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth(null);
    history.push('/login');
  }

  async function register(email, username, password) {
    const user = await UserService.post(`${baseUrl}/register`, {
      email,
      username,
      password,
    });
    //store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    setAuth(user);
    //get return url from location state or default to home page
    const { from } = history.location.state || { from: { pathname: '/' } };
    history.push(from);
  }

  function forgot_password(email, username, password) {}

  function getAll() {
    return UserService.get(baseUrl).then(setUsers);
  }
}
