import { CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/system';
import logo from 'assets/images/al_shabhi_logo.png';
const StyledLoading = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: 'auto',
    height: '25px',
  },
  '& .circleProgress': {
    position: 'absolute',
    left: -7,
    right: 0,
    top: 'calc(50% - 25px)',
  },
}));

const MatxLoading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src={logo} alt="" />
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
}; 

export default MatxLoading;
