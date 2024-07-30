import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'auth/AuthGuard';
import Emi from 'views/emi/Emi';
import EmiCreate from 'views/emi/EmiCreate';
import EmiUpdate from './EmiUpdate';



// ==============================|| MAIN ROUTING ||============================== //

const EmiRoutes = {
    path: '/',
    element: <AuthGuard> <MainLayout /> </AuthGuard>,
    children: [
        {
            path: '/emis',
            element: <Emi/>
        },
        {
            path: '/emis/create',
            element: <EmiCreate/>
        },
        {
            path: '/emis/create/:customerId',
            element: <EmiCreate/>
        },
        { 
          path: '/emis/edit/:emiId', 
          element: <EmiUpdate />
        },

        
    ]
};

export default EmiRoutes;
