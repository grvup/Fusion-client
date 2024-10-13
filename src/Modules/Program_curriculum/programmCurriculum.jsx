// src/Modules/Program_curriculum/programmeCurriculum.jsx

import { Route, Routes } from "react-router-dom";
import { Layout } from "../../components/layout";
import AdminViewAllCourses from "./Acad_admin/Admin_view_all_courses";
import AdminViewACourse from "./Acad_admin/Admin_view_a_course";
import AdminViewAllBatches from "./Acad_admin/Admin_view_all_batches";
import AdminViewSemestersOfACurriculum from "./Acad_admin/Admin_view_semesters_of_a_curriculum";
import FacultyViewAllCourses from "./Faculty/Faculty_view_all_courses";
import FacultyViewACourse from "./Faculty/Faculty_view_a_course";
import FacultyViewAllBatches from "./Faculty/Faculty_view_all_batches";
import ViewAllCourses from "./View_all_courses";
import ViewAllBatches from "./View_all_batches";
import ViewACourse from "./View_a_course";

export default function ProgrammeCurriculumRoutes() {
  return (
    <>
      {/* Admin Routes */}
      <Routes>
        <Route
          path="/admin_courses"
          element={
            <Layout>
              <AdminViewAllCourses />
            </Layout>
          }
        />
        <Route
          path="/admin_course/:id"
          element={
            <Layout>
              <AdminViewACourse />
            </Layout>
          }
        />
        <Route
          path="/admin_batches"
          element={
            <Layout>
              <AdminViewAllBatches />
            </Layout>
          }
        />
        <Route
          path="/view_curriculum"
          element={
            <Layout>
              <AdminViewSemestersOfACurriculum />
            </Layout>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty_courses"
          element={
            <Layout>
              <FacultyViewAllCourses />
            </Layout>
          }
        />
        <Route
          path="/faculty_course/:id"
          element={
            <Layout>
              <FacultyViewACourse />
            </Layout>
          }
        />
        <Route
          path="/faculty_batches"
          element={
            <Layout>
              <FacultyViewAllBatches />
            </Layout>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student_courses"
          element={
            <Layout>
              <ViewAllCourses />
            </Layout>
          }
        />
        <Route
          path="/student_course/:id"
          element={
            <Layout>
              <ViewACourse />
            </Layout>
          }
        />
        <Route
          path="/student_batches"
          element={
            <Layout>
              <ViewAllBatches />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
