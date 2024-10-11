import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import AcademicPage from "./Modules/Academic/index";
import ValidateAuth from "./helper/validateauth";
import Admin_view_all_courses from "./Modules/Program_curriculum/Acad_admin/Admin_view_all_courses";
import Faculty_view_all_courses from "./Modules/Program_curriculum/Faculty/Faculty_view_all_courses";
import Admin_view_semesters_of_a_curriculum from "./Modules/Program_curriculum/Acad_admin/Admin_view_semesters_of_a_curriculum";

export default function App() {
  const location = useLocation();
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
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/programme_curriculum/admin_courses"
          element={
            <Layout>
              <Admin_view_all_courses />
            </Layout>
          }
        />
        <Route
          path="/programme_curriculum/view_curriculum"
          element={
            <Layout>
              <Admin_view_semesters_of_a_curriculum/>
            </Layout>
          }
        />
        <Route
          path="/programme_curriculum/faculty_courses"
          element={
            <Layout>
              <Faculty_view_all_courses/>
            </Layout>
          }
        />
         <Route
          path="/programme_curriculum/view_curriculum"
          element={
            <Layout>
              <Faculty_view_all_courses/>
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
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
