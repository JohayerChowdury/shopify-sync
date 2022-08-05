//Purpose: Create a service module that uses fetch API to send HTTP requests to backend.

import axios from 'axios';
import { authAtom } from '../states/authStates';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function useFetchWrapper() {
  const [auth] = useRecoilState(authAtom);

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
      console.log(requestOptions);
      return axios.request(requestOptions);
    };
  }

  //helper functions

  function authHeader(url) {
    const token = auth?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
      return { 'X-Access-Token': `${token}`, Accept: 'application/json' };
    } else {
      return {};
    }
  }
}
export default useFetchWrapper;
