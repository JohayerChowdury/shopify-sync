import { useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authAtom, userAtom } from '../states';
import useFetchWrapper from '../helpers/FetchWrapper';

function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const fetchWrapper = useFetchWrapper();

  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate();
  const location = useLocation();

  return {
    login,
    logout,
    profile,
    verifyUser,
    forgotPassword,
    changePassword,
    // uploadPicture,
  };

  async function login(newUser, route) {
    try {
      const overallRoute = `${baseUrl}${route}`;
      const user = await fetchWrapper.post(overallRoute, newUser);
      //store user details and jwt token in local storage to keep user logged in between page refreshes
      if (user) {
        if (route === '/login') {
          localStorage.setItem('user', JSON.stringify(user));
          setAuth(user);
          setUser(user);
          //get return url from location state or default to home page
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
          toast.success('Successful Login!');
        } else if (route === '/register') {
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
          toast.success('Registered succesfully!');
        }
      } else {
        toast.error('Email or password is invalid. Please try again.');
      }
      return user;
    } catch (err) {
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function logout() {
    try {
      // remove user from local storage, set auth state to null and redirect to login page
      localStorage.removeItem('user');
      setAuth(null);
      navigate('/login');
      toast.success('Succesfully logged out.');
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  function profile() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async function verifyUser(user) {
    try {
      const overallRoute = `${baseUrl}/verify_user`;
      return await fetchWrapper.post(overallRoute, user);
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function forgotPassword(user) {
    try {
      const overallRoute = `${baseUrl}/forgot_password`;
      return await fetchWrapper.post(overallRoute, user);
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  async function changePassword(user) {
    try {
      const overallRoute = `${baseUrl}/change_password`;
      return await fetchWrapper.post(overallRoute, user);
    } catch (err) {
      console.log(err);
      toast.error(`Please try again as the following error occured. ${err}`);
    }
  }

  // async function uploadPicture()
}

export { useUserActions };
