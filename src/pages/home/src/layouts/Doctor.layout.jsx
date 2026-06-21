
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Home/Sidebar.jsx";
import Navbar from "../components/Home/Navbar.jsx";
import Footer from "../components/Home/Footer.jsx";
function DoctorLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <Navbar />

      {/* Main Area */}
      <div className="flex flex-1 flex-row-reverse">

        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-blue-50">
          <Outlet />
        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default DoctorLayout;