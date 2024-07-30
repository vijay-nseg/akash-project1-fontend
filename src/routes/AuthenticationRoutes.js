import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const DownloadApplication = Loadable(lazy(() => import('views/pages/authentication/authentication3/DownloadApplication')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'session/signin',
            element: <AuthLogin3 />
        },
        {
            path: 'download-application',
            element: <DownloadApplication />
        }
    ]
};

export default AuthenticationRoutes;
