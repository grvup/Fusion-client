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
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import AcademicPage from "./Modules/Academic/index";
import ValidateAuth from "./helper/validateauth";
import FacultyProfessionalProfile from "./Modules/facultyProfessionalProfile/facultyProfessionalProfile";
import InactivityHandler from "./helper/inactivityhandler";

export default function App() {
  const location = useLocation();
  return (
    <MantineProvider>
      <Notifications position="top-center" autoClose={2000} limit={1} />
      {location.pathname !== "/accounts/login" && <ValidateAuth />}
      {location.pathname !== "/accounts/login" && <InactivityHandler />}

      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/academics"
          element={
            <Layout>
              <AcademicPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/facultyprofessionalprofile/*"
          element={
            <Layout>
              <FacultyProfessionalProfile />
            </Layout>
          }
        />
        <Route
          path="/complaints"
          element={
            <Layout>
              <ComplaintSystem />
            </Layout>
          }
        />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
