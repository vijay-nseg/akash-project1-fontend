// assets
import GroupIcon from '@mui/icons-material/Group';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// ==============================|| JOB WORK MENU ITEMS ||============================== //

const userManagement = {
    id: 'user',
    // title: 'Users',
    type: 'group',
    children: [
        {
            id: 'emi',
            title: 'Emi',
            type: 'item',
            url: '/emis',
            icon: GroupIcon,
            breadcrumbs: false
        },
        {
            id: 'customer',
            title: 'Customer',
            type: 'item',
            url: '/admins',
            icon: SupervisorAccountIcon,
            breadcrumbs: false
        },
                
    ]
};

export default userManagement;
