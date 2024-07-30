import { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, styled } from '@mui/material';
 
import Breadcrumb from 'ui-component/Breadcrumb';
import { capitalizeFirstLetter } from 'utils/helper';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const title = 'Dashboard';
    const [isLoading, setLoading] = useState(true);
    const [countData, setCountData] = useState({'products': 0, 'categories': 0, 'subCategories': 0, 'productRequest': 0});

    const Container = styled('div')(({ theme }) => ({
        margin: '30px',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
        '& .breadcrumb': {
            marginBottom: '30px',
            [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
        }
    }));

    const LogoImg = styled('img')(({ theme }) => ({
        animation: 'rotateAnimation 1s infinite',

        '@keyframes rotateAnimation': {
            from: {
                transform: 'rotateY(45deg)'
            },
            to: {
                transform: 'rotateY(225deg)'
            }
        }
    })); 

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: capitalizeFirstLetter(title), path: '/' + title }]} />
            </Box> 
        </Container>
    );
};

export default Dashboard;
