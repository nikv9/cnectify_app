import { Navigate } from "react-router-dom";

const Protected = ({ auth, children }) => {
  // console.log(auth);
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
