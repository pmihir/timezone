import { Navigate } from "react-router-dom";

const Protected = ({ user, children }) => {
    const isLoggedIn = Object.keys(user).length > 0;
 if (!isLoggedIn) {
 return <Navigate to="/" replace />;
 }
 return children;
};
export default Protected;