import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


const PrivateRoutes = () => {
    const { userDetails } = useSelector(state => state.user)
    return userDetails ? <Outlet/> : <Navigate to='/login' replace/>

}
export default PrivateRoutes