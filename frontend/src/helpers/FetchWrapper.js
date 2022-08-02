//Purpose: Create a service module that uses fetch API to send HTTP requests to backend.

import axios from 'axios';
import { authAtom } from '../states/authStates';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };

  function request(method) {
    return (url, body) => {
      const requestOptions = {
        url: url,
        method: method,
        headers: authHeader(url),
      };

      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        // requestOptions.data = { body };
        requestOptions.data = body;
      }
      // return fetch(url, requestOptions).then(handleResponse);
      return axios.request(requestOptions).then(handleResponse);
    };
  }

  //helper functions

  function authHeader(url) {
    const token = auth?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse(res) {
    console.log(res);
    if (!res.ok) {
      if ([401, 403].includes(res.status) && auth?.token) {
        localStorage.removeItem('user');
        setAuth(null);
        navigate('/login');
      }

      return Promise.reject(res.statusText);
    }
    // return data;
  }
}
export default useFetchWrapper;
