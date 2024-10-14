import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";

// Dashboard and Profile
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";

// Authentication Pages
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";

// Academic and Helper
import AcademicPage from "./Modules/Academic/index";
import ValidateAuth from "./helper/validateauth";

// Programe and curriculum
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
      <Notifications
        position="top-right"
        zIndex={1000}
        autoClose={2000}
        limit={1}
      />
      {location.pathname !== "/accounts/login" &&
        location.pathname !== "/reset-password" && <ValidateAuth />}

      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route path="/dashboard" element={renderLayout(Dashboard)} />
        <Route
          path="/programme_curriculum/*"
          element={
            <Layout>
              <ProgrammeCurriculumRoutes />
            </Layout>
          }
        />
        <Route path="/academics" element={renderLayout(AcademicPage)} />
        <Route path="/profile" element={renderLayout(Profile)} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
