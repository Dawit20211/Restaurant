import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


const AdminRoutes = () => {
    const { userDetails } = useSelector(state => state.user)
    return userDetails ? <Outlet/> : <Navigate to='/login' replace/>

}
export default AdminRoutes