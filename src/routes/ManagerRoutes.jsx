import { Navigate, useLocation } from "react-router-dom";
import { useManager } from "../hooks/useManager";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Others/Loading";



const ManagerRoutes = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();
  const [isManager, isManagerLoading] = useManager()

  if (loading || isManagerLoading) {
    return <Loading></Loading>
  }
  if (user && user?.email && isManager) {
    return children;
  }
  return (
    <Navigate state={location.pathname} to="/login"></Navigate>
  );

};

export default ManagerRoutes;