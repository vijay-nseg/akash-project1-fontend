import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography, useMediaQuery, IconButton } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import LogoutIcon from '@mui/icons-material/Logout';
// assets
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from 'hooks/useAuth';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const { logout } = useAuth();
    const handleLogout = async () => {
        try {
           logout();
        }catch(error){
            console.log(error);
        }
    };
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    {/* <LogoSection /> */}
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <MenuIcon />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            
            <Typography
                color="primary"
                variant={matchDownSM ? 'h5' : 'h1'}            >
                Akash powered by Vijay
            </Typography>
            &nbsp;
            &nbsp;
            <Typography
                color="secondary"
                variant={matchDownSM ? 'h5' : 'h1'}            >
                 {/* AUGMENTED REALITY */}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <div onClick={handleLogout}>
            <IconButton>
                <LogoutIcon color={'secondary'}  />
            </IconButton>
            </div>
            {/* notification & profile */}
            {/* <NotificationSection /> */}
            {/* <ProfileSection /> */}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
