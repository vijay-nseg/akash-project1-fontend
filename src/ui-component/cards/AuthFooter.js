// material-ui
import { Link, Typography, Stack } from '@mui/material';
import config from 'config';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href={config.projectWebsite} target="_blank" underline="hover">
            {config.projectName}
        </Typography>
        <Typography variant="subtitle2" component={Link} href={config.companyWebsite} target="_blank" underline="hover">
            &copy; {config.companyName}
        </Typography>
    </Stack>
);

export default AuthFooter;
