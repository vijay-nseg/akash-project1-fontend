import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'auth/AuthGuard';
import Customer from 'views/customer/Customer';
import CustomerCreate from 'views/customer/CustomerCreate';
import CustomerUpdate from './CustomerUpdate';
import TestFilter from './TestFilter';



// ==============================|| MAIN ROUTING ||============================== //

const CustomerRoutes = {
    path: '/',
    element: <AuthGuard> <MainLayout /> </AuthGuard>,
    children: [
        {
            path: '/customers',
            element: <Customer/>
        },
        {
            path: '/customers/create',
            element: <CustomerCreate/>
        },
        { 
          path: '/customers/edit/:customerId', 
          element: <CustomerUpdate />
        },
        { 
          path: '/filters', 
          element: <TestFilter />
        },

        
    ]
};

export default CustomerRoutes;
