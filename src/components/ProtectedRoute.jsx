// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const currentRole = localStorage.getItem("role");

//   if (currentRole !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }



import { Navigate } from "react-router-dom";

import {
  isAuthenticated,
  getRole,
} from "../utils/auth";

export default function ProtectedRoute({
  children,
  role,
}) {

  // لو مش عامل login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // role الحالي
  const currentRole = getRole();

  // لو role غلط
  if (role && currentRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}