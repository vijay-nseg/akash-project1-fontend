import SnackbarContext from 'contexts/SnackbarContext'
import { useContext } from 'react'

const useSnackbar = () => useContext(SnackbarContext)

export default useSnackbar
