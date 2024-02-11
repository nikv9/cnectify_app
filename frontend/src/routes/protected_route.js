import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, children }) => {
  // console.log(auth);
  if (!auth) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
export default ProtectedRoute;
