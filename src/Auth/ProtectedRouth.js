import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = sessionStorage.getItem("ConnectedUser");
  return user;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;