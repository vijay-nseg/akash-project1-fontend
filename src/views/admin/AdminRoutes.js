import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'auth/AuthGuard';
import Admin from 'views/admin/Admin';
import AdminCreate from 'views/admin/AdminCreate';
import AdminUpdate from './AdminUpdate';



// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: <AuthGuard> <MainLayout /> </AuthGuard>,
    children: [
        {
            path: '/admins',
            element: <Admin/>
        },
        {
            path: '/admins/create',
            element: <AdminCreate/>
        },
        { 
          path: '/admins/edit/:adminId', 
          element: <AdminUpdate />
        },

        
    ]
};

export default AdminRoutes;
