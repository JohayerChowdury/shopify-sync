//Purpose: Create a service module that uses fetch API to send HTTP requests to backend.

import axios from 'axios';
import { useRecoilState } from 'recoil';

import { authAtom } from '../states';
// import { history } from './history';

function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);

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
        requestOptions.data = body;
      }

      console.log('JRC request options', requestOptions);
      return (
        axios
          .request(requestOptions)
          // .then(handleResponse)
          .catch((err) => {
            console.log(err);
          })
      );
    };
  }

  //helper functions
  function authHeader(url) {
    const token = auth?.data?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
      return { 'x-access-token': `${token}`, Accept: 'application/json' };
    } else {
      return {};
    }
  }

  // function handleResponse(response) {
  //   const data = response.data;

  //   if (!response.ok) {
  //     if ([401, 403].includes(response.status) && auth?.token) {
  //       // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
  //       localStorage.removeItem('user');
  //       setAuth(null);
  //       history.push('/login');
  //     }

  //     const error = (data && data.message) || response.statusText;
  //     return Promise.reject(error);
  //   }

  //   return data;
  // }
}
export default useFetchWrapper;
