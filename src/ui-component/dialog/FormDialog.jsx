import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import useAlert from 'hooks/useAlert';
import React from 'react';

export default function FormDialog() {
  const theme = useTheme();
  const { state, updateState } = useAlert();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleClose() {
    updateState(() => {})
    // setOpen(false);
  }

  function handleSubmit() {
    state.handleSubmit()
    updateState(() => {})
  }

  return (
    <Box>
     <Dialog
        fullScreen={fullScreen}
        open={state.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Are you sure you want to delete this item?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Once deleted, you will not be able to recover this data!
          </DialogContentText>
        </DialogContent>

        <DialogActions>
        
          <Button onClick={handleSubmit} color="error">
            CONFIRM
          </Button>

          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
        
        </DialogActions>
      </Dialog>
    </Box>
  );
}
