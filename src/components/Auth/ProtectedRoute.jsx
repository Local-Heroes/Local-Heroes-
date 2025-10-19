import { Navigate, } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requireAuth }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);




  if( requireAuth && !isAuthenticated){
    return <Navigate to="/login" replace />;
  }

 


  if(!requireAuth && isAuthenticated){
    return <Navigate to="/" replace />;
  }



  return children;
};

export default ProtectedRoute;
