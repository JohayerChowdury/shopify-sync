import { Route, Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../states/authStates';

export { PrivateRoute };

function PrivateRoute({ children }) {
  const location = useLocation();
  const auth = useRecoilValue(authAtom);
  return auth ? (
    children
  ) : (
    <Navigate to="/welcome" replace state={{ from: location }} />
  );
}
