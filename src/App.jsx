import { BrowserRouter, Routes, Route } from "react-router-dom";

// ── Shared ────────────────────────────────────────────────────────────────────
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";

// ── Public: Auth ──────────────────────────────────────────────────────────────
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UserSignup from "./pages/auth/UserSignup";
import DoctorLogin from "./pages/auth/DoctorLogin";
import DoctorSignup from "./pages/auth/DoctorSignup";

import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ResetSuccessPage from "./pages/auth/ResetSuccessPage";

// ── Public: Home ──────────────────────────────────────────────────────────────
import Landing from "./pages/home/Landing";

// ── Protected: Home ───────────────────────────────────────────────────────────
import DoctorLayout from "./pages/home/src/layouts/Doctor.layout.jsx";
import PatientHome from "./pages/home/PatientHome";
import DoctorHome from "./pages/home/src/pages/Home/Doctor/doctor.home.jsx";
import Appointments from "./pages/home/src/pages/Home/Doctor/doctor.Appointments.jsx";
import Patients from "./pages/home/src/pages/Home/Doctor/doctor.Patients.jsx";
import Articles from "./pages/home/src/pages/Home/Doctor/doctor.Articles.jsx";

// ── Protected: Profile ────────────────────────────────────────────────────────
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import MedicalProfile from "./pages/profile/MedicalProfile";
import CompleteProfile from "./pages/profile/CompleteProfile";
import CompleteDoctorProfile from "./pages/profile/CompleteDoctorProfile";

// ── Protected: Files ──────────────────────────────────────────────────────────
import FilesPage from "./pages/files/FilesPage";
import UploadFilePage from "./pages/files/UploadFilePage";

// ── Protected: Chatbot ────────────────────────────────────────────────────────
import Chatbot from "./pages/chatbot/Chatbot";

// ── Protected: Notifications ──────────────────────────────────────────────────
import NotificationsPage from "./pages/notifications/NotificationsPage";

// ── Protected: Articles ───────────────────────────────────────────────────────
import SavedArticlesPage from "./pages/articles/SavedArticlesPage";

// ── Protected: Settings ───────────────────────────────────────────────────────
import ChangePassword from "./pages/settings/ChangePassword";

// ── Protected: Payment ───────────────────────────────────────────────────────
import CardPaymentPage from "./pages/booking/CardPaymentPage";

import Listing from "./pages/listing/Listing";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import Booking from "./pages/booking/Booking";
import Payment from "./pages/booking/Payment";
import BookingSuccess from "./pages/booking/BookingSuccess";
import MyBookings from "./pages/booking/MyBookings";
import BookingDetails from "./pages/booking/BookingDetails";
// ── Doctor: Settings ───────────────────────────────────────────────────────

import Settings from "./pages/home/src/pages/Home/Doctor/doctor.Settings.jsx";
import DoctorProfilePage from "./pages/home/src/pages/Home/Doctor/DoctorProfile.jsx";
import SettingsLayout from "./pages/home/src/layouts/SettingsLayout.jsx";
import EditProfileDoctor from "./pages/home/src/pages/Home/Doctor/setting/EditProfile.jsx";
import Earnings from "./pages/home/src/pages/Home/Doctor/setting/Earnings.jsx";
import PaymentSettings from "./pages/home/src/pages/Home/Doctor/setting/PaymentSettings.jsx";
import EditPassword from "./pages/home/src/pages/Home/Doctor/setting/EditPassword.jsx";
import Notification from "./pages/home/src/pages/Home/Doctor/Notification.jsx";
import EditClinic from "./pages/home/src/pages/Home/Doctor/setting/EditClinic.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/*  PUBLIC ROUTES — no login required                                 */}
        {/* ────────────────────────────────────────────────────────────────── */}

        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/doctor" element={<DoctorSignup />} />

        {/* Password reset flow */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-success" element={<ResetSuccessPage />} />


        {/* ────────────────────────────────────────────────────────────────── */}
        {/*  PROTECTED ROUTES — login required (token must exist)              */}
        {/* ────────────────────────────────────────────────────────────────── */}

        {/* Home */}
        <Route
          path="/patient-home"
          element={
            <ProtectedRoute role="patient">
              <PatientHome />
            </ProtectedRoute>
          }
        />
        
        {/* doctor */}
<Route path="/doctor" element={<DoctorLayout />}>
  <Route index element={<DoctorHome />} />
        <Route
  path="/doctor/profile"
  element={
    <ProtectedRoute role="doctor">
      <DoctorProfilePage />
    </ProtectedRoute>
  }
/>
  <Route path="appointments" element={<Appointments />} />
  <Route path="patients" element={<Patients />} />
  <Route path="articles" element={<Articles />} />
  <Route path="settings" element={<Settings />} />
</Route>

<Route path="/doctor/settings" element={<SettingsLayout />}>
  <Route path="profile" element={<EditProfileDoctor />} />
  <Route path="change-password" element={<EditPassword />} />
  <Route path="clinic" element={<EditClinic />} />
  <Route path="bank" element={<PaymentSettings />} />
  <Route path="transactions" element={<Earnings />} />
  <Route path="notifications" element={<Notification />} />
</Route>
        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-profile"
          element={
            <ProtectedRoute>
              <MedicalProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-profile/doctor"
          element={
            <ProtectedRoute>
              <CompleteDoctorProfile />
            </ProtectedRoute>
          }
        />

        {/* Files */}
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <FilesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-file"
          element={
            <ProtectedRoute>
              <UploadFilePage />
            </ProtectedRoute>
          }
        />

        {/* Chatbot */}
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* Articles */}
        <Route
          path="/saved-articles"
          element={
            <ProtectedRoute>
              <SavedArticlesPage />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listing"
          element={
            <ProtectedRoute>
              <Listing />
            </ProtectedRoute>
          }
        />


        <Route
          path="/doctor/:id"
          element={
            <ProtectedRoute>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/card-payment"
          element={
            <ProtectedRoute>
              <CardPaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-success"
          element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-details/:id"
          element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
        />


        {/* ────────────────────────────────────────────────────────────────── */}
        {/*  CATCH-ALL                                                          */}
        {/* ────────────────────────────────────────────────────────────────── */}

        <Route path="*" element={<h1>404 — Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}