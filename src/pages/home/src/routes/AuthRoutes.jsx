import { Route } from "react-router-dom";

import LoginUser from "../pages/Auth/User.login";
import LoginDoctor from "../pages/Auth/Doctor.login";
import ChooseAccountType from "../pages/Auth/Choose.account.jsx";

const authRoutes = (
  <>
    <Route path="/login-user" element={<LoginUser />} />
    <Route path="/login-doctor" element={<LoginDoctor />} />
    <Route path="/choose-account" element={<ChooseAccountType />} />
  </>
);

export default authRoutes;