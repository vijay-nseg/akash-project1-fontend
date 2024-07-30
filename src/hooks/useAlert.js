import AlertContext from 'contexts/AlertContext'
import { useContext } from 'react'

const useAlert  = () => useContext(AlertContext)

export default useAlert
