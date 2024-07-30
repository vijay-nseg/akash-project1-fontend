import React, { createContext, useState } from 'react'

const SnackbarContext = createContext({
    snackbar: {},
    closeSnackbar: () => {},
    openSnackbar: () => {},
})

export const SnackbarProvider = ({ children }) => {
    const [currentSnackbar, setCurrentSnackbar] = useState(
        {
            open: false,
            type: "",
            message: "",
        }
    )

    const handleCloseSnackbar = (type, message) => {
        const newSnackbar = { open: false, message: message, type: type}
        setCurrentSnackbar(newSnackbar);
    }
    
    const handleOpenSnackbar = (type, message) => {
        const newSnackbar = { open: true, message: message, type: type}
        setCurrentSnackbar(newSnackbar);
    }

    return (
        <SnackbarContext.Provider
            value={{
                snackbar: currentSnackbar,
                closeSnackbar: handleCloseSnackbar,
                openSnackbar: handleOpenSnackbar,
            }}
        >
            {children}
        </SnackbarContext.Provider>
    )
}

export default SnackbarContext
