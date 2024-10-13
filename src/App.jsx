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

// Admin Views and Forms
import Admin_view_all_courses from "./Modules/Program_curriculum/Acad_admin/Admin_view_all_courses";
import Faculty_view_all_courses from "./Modules/Program_curriculum/Faculty/Faculty_view_all_courses";
import Admin_add_batch_form from "./Modules/Program_curriculum/Acad_admin/Admin_add_batch_form";
import Admin_add_course_slot_form from "./Modules/Program_curriculum/Acad_admin/Admin_add_course_slot_form";
import Admin_add_curriculum_form from "./Modules/Program_curriculum/Acad_admin/Admin_add_curriculum_form";
import Admin_add_discipline_form from "./Modules/Program_curriculum/Acad_admin/Admin_add_discipline_form";
import Admin_add_programme_form from "./Modules/Program_curriculum/Acad_admin/Admin_add_programme_form";
import Admin_add_course_proposal_form from "./Modules/Program_curriculum/Acad_admin/Admin_add_course_proposal_form";
// import Admin_course_slot_form from "./Modules/Program_curriculum/Acad_admin/Admin_course_slot_form.jsx";
// import Admin_course_form_after from "./Modules/Program_curriculum/Acad_admin/Admin_course_form_after";
// import Admin_course_form from "./Modules/Program_curriculum/Acad_admin/Admin_course_form";

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
          path="/programme_curriculum/admin_courses"
          element={renderLayout(Admin_view_all_courses)}
        />
        <Route
          path="/programme_curriculum/acad_admin_add_batch_form"
          element={renderLayout(Admin_add_batch_form)}
        />
        <Route
          path="/programme_curriculum/acad_admin_add_course_proposal_form"
          element={renderLayout(Admin_add_course_proposal_form)}
        />
        <Route
          path="/programme_curriculum/acad_admin_add_courseslot_form"
          element={renderLayout(Admin_add_course_slot_form)}
        />
        <Route
          path="/programme_curriculum/acad_admin_add_curriculum_form"
          element={renderLayout(Admin_add_curriculum_form)}
        />
        <Route
          path="/programme_curriculum/acad_admin_add_discipline_form"
          element={renderLayout(Admin_add_discipline_form)}
        />
        <Route
          path="/programme_curriculum/acad_admin_add_programme_form"
          element={renderLayout(Admin_add_programme_form)}
        />
        {/* <Route path="/programme_curriculum/acad_admin_course_proposal_form" element={renderLayout(Admin_course_proposal_form)} /> */}
        {/* <Route path="/programme_curriculum/acad_admin_course_slot_form" element={renderLayout(Admin_course_slot_form)} /> */}
        <Route
          path="/programme_curriculum/faculty_courses"
          element={renderLayout(Faculty_view_all_courses)}
        />
        {/* <Route path="/programme_curriculum/acad_admin_course_form" element={renderLayout(Admin_course_form)} /> */}
        {/* <Route path="/programme_curriculum/acad_admin_course_form_after" element={renderLayout(Admin_course_form_after)} /> */}
        <Route path="/academics" element={renderLayout(AcademicPage)} />
        <Route path="/profile" element={renderLayout(Profile)} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
