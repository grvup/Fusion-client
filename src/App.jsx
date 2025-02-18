// import { MantineProvider } from "@mantine/core";
// import "@mantine/core/styles.css";
// import "@mantine/notifications/styles.css";
// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import { Notifications } from "@mantine/notifications";
// import { Layout } from "./components/layout";
// import Dashboard from "./Modules/Dashboard/dashboardNotifications";
// import Profile from "./Modules/Profile/profile";
// import LoginPage from "./pages/login";
// import ForgotPassword from "./pages/forgotPassword";
// import AcademicPage from "./Modules/Academic/index";
// import ValidateAuth from "./helper/validateauth";
// import InactivityHandler from "./helper/inactivityhandler";

// export default function App() {
//   const location = useLocation();
//   return (
//     <MantineProvider>
//       <Notifications position="top-center" autoClose={2000} limit={1} />
//       {location.pathname !== "/accounts/login" && <ValidateAuth />}
//       {location.pathname !== "/accounts/login" && <InactivityHandler />}

//       <Routes>
//         <Route path="/" element={<Navigate to="/accounts/login" replace />} />
//         <Route
//           path="/dashboard"
//           element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           }
//         />
//         <Route
//           path="/academics"
//           element={
//             <Layout>
//               <AcademicPage />
//             </Layout>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <Layout>
//               <Profile />
//             </Layout>
//           }
//         />
//         <Route path="/accounts/login" element={<LoginPage />} />
//         <Route path="/reset-password" element={<ForgotPassword />} />
//       </Routes>
//     </MantineProvider>
//   );
// }

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";

// Dashboard and Profile
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import ComplaintSystem from "./Modules/ComplaintManagement/index";
import Profile from "./Modules/Profile/profile";

// Authentication Pages
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";

// Academic and Helper
import AcademicPage from "./Modules/Academic/index";
import ValidateAuth from "./helper/validateauth";
import FileTracking from "./Modules/FileTracking";
import VisitorsContent from "./Modules/Visitors_Hostel/visitorsContent";
import CancellationRequest from "./Modules/Visitors_Hostel/cancellationRequest";
import BookingForm from "./Modules/Visitors_Hostel/bookingForm";
import Bookings from "./Modules/Visitors_Hostel/bookings";
import ActiveBookingsPage from "./Modules/Visitors_Hostel/activeBookings";
import CompletedBookingsPage from "./Modules/Visitors_Hostel/completedBookings";
import VHGuidelinesPage from "./Modules/Visitors_Hostel/vhGuidelines";
import InventoryManagement from "./Modules/Visitors_Hostel/inventory";
import RoomsAvailibility from "./Modules/Visitors_Hostel/roomsAvailability";
import AccountStatemnts from "./Modules/Visitors_Hostel/accountStatements";
import FacultyProfessionalProfile from "./Modules/facultyProfessionalProfile/facultyProfessionalProfile";
import InactivityHandler from "./helper/inactivityhandler";
import DepartmentPage from "./Modules/Department/DepartmentDashboard";
import Examination from "./Modules/Examination/examination";
import ProgrammeCurriculumRoutes from "./Modules/Program_curriculum/programmCurriculum";

export default function App() {
  const location = useLocation();

  const renderLayout = (Component) => (
    <Layout>
      <Component />
    </Layout>
  );

  return (
    <MantineProvider>
      <Notifications position="top-center" autoClose={2000} limit={1} />
      {location.pathname !== "/accounts/login" && <ValidateAuth />}
      {location.pathname !== "/accounts/login" && <InactivityHandler />}

      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route path="/dashboard" element={renderLayout(Dashboard)} />
        <Route
          path="/programme_curriculum/*"
          element={
            <div>
              {/* <BreadcrumbTabs/> */}
              <ProgrammeCurriculumRoutes />
            </div>
          }
        />
        <Route path="/academics" element={renderLayout(AcademicPage)} />
        <Route path="/profile" element={renderLayout(Profile)} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/examination/*" element={<Examination />} />
      </Routes>
    </MantineProvider>
  );
}
