import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { AlertProvider } from 'contexts/AlertContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { AuthProvider } from 'contexts/AuthContext';
import useAuth from 'hooks/useAuth';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const { isInitialised } = useAuth();

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <AlertProvider>
                    <SnackbarProvider>
                        <CssBaseline />
                        <NavigationScroll>
                            <AuthProvider>
                                <Routes />
                            </AuthProvider>
                        </NavigationScroll>
                    </SnackbarProvider>
                </AlertProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
