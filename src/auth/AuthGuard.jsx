// import { flat } from 'app/utils/utils';
import useAuth from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from 'ui-component/Loader';

const AuthGuard = ({ children }) => {
  let {
    isAuthenticated,
    isInitialised,
    user
  } = useAuth();
  const { pathname } = useLocation();

  let authenticated = isAuthenticated;
  console.log('authenticated: '+ isAuthenticated)

  if (isInitialised) {
    if (isAuthenticated) {
      // User is authenticated, allow access to the protected route.
      return <>{children}</>;
    } else {
      // User is not authenticated, redirect to the login page.
      return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
    }
  } else {
    // Authentication context is not yet initialized, display a loading indicator.
    return <Loader />;
  }
};

export default AuthGuard;
