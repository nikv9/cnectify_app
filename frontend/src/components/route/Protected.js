import { Navigate } from "react-router-dom";

const Protected = ({ auth, children }) => {
  // console.log(auth);
  if (!auth) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
export default Protected;
