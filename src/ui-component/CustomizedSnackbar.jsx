import { Alert, Snackbar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { styled } from "@mui/system";
import useSnackbar from "hooks/useSnackbar";
import React from "react";

const ContentRoot = styled("div")(({ theme }) => ({
  "& .icon": { fontSize: 20 },
  "& .success": { backgroundColor: theme.palette.success.main },
  "& .warning": { backgroundColor: amber[700] },
  "& .error": { backgroundColor: theme.palette.error.main },
  "& .info": { backgroundColor: theme.palette.primary.main },
  "& .iconVariant": { opacity: 0.9, marginRight: theme.spacing(1) },
  "& .message": { display: "flex", alignItems: "center" },
  "& .margin": { margin: theme.spacing(1) },
}));

export default function CustomizedSnackbars() {
  
  const {snackbar, closeSnackbar} = useSnackbar();
  
  function handleClose(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar("", "")
  }

  return (
    <ContentRoot>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ m: 1 }} severity={snackbar.type ? snackbar.type : 'success'} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ContentRoot>
  );
}
