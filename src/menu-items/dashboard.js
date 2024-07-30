// assets
import DashboardIcon from '@mui/icons-material/Dashboard';
// constant
const icons = { 
    // IconDashboard 
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: DashboardIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
