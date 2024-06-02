import { Navigate } from "react-router-dom"
import { isAuthenticated } from "./Helper"

const ProtectedRoute=({element})=>{
    return isAuthenticated()?element:<Navigate to="/auth"/>
}
export default ProtectedRoute