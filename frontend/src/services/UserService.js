import axios from 'axios';
import { authAtom } from '../states/authStates';
import { useRecoilState } from 'recoil';
import { history } from '../helpers/history';

function UserService() {
  const [auth, setAuth] = useRecoilState(authAtom);

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };

  function request(method) {
    return async (url, body) => {
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }

      const res = await axios.request({ requestOptions });
      return handleResponse(res);
    };
  }

  //   const login = () => {
  //     return axios.post('/shopify_api/users/login');
  //   };

  //   const register = () => {
  //     return axios.post('/shopify_api/users/register');
  //   };
  //   const forgot_password = () => {
  //     return axios.post('/shopify_api/users/forgot_password');
  //   };

  //   const getOne = () => {
  //     return axios.get('/shopify_api/users/profile');
  //   };

  //   const tokenIsValid = () => {
  //     return axios.post('/shopify_api/users/tokenIsValid');
  //   };

  //helper functions

  function authHeader(url) {
    const token = auth?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith('/shopify_api/users');
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return;
    }
  }

  function handleResponse(res) {
    return res.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!res.ok) {
        if ([401, 403].includes(res.status) && auth?.token) {
          localStorage.removeItem('user');
          setAuth(null);
          history.push('/login');
        }

        const err = (data && data.message) || res.statusText;
        return Promise.reject(err);
      }

      return data;
    });
  }
}
export default UserService();
