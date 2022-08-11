import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom, userAtom } from '../states';
import { useLocation, useNavigate } from 'react-router-dom';

import useFetchWrapper from '../helpers/FetchWrapper';

function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const fetchWrapper = useFetchWrapper();

  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  const auth = useRecoilValue(authAtom);

  const navigate = useNavigate();
  const location = useLocation();

  return {
    login,
    logout,
    profile,
  };

  async function login(user, route) {
    try {
      const overallRoute = `${baseUrl}${route}`;
      const user_1 = await fetchWrapper.post(overallRoute, user);
      //store user details and jwt token in local storage to keep user logged in between page refreshes
      if(route == '/login'){
      localStorage.setItem('user', JSON.stringify(user_1));
      setAuth(user_1);
      setUser(user_1);
      //get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from);
      }

    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    try {
      // remove user from local storage, set auth state to null and redirect to login page
      localStorage.removeItem('user');
      setAuth(null);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }


  function profile() {
   return  (JSON.parse(localStorage.getItem("user")));

  }
}

export { useUserActions };
