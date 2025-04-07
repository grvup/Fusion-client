// src/programmeCurriculum.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "../../components/layout";
import AdminViewAllCourses from "./Acad_admin/Admin_view_all_courses";
import AdminViewACourse from "./Acad_admin/Admin_view_a_course";
import AdminViewAllBatches from "./Acad_admin/Admin_view_all_batches";
import AdminViewSemestersOfACurriculum from "./Acad_admin/Admin_view_semesters_of_a_curriculum";
import FacultyViewAllCourses from "./Faculty/Faculty_view_all_courses";
import FacultyViewACourse from "./Faculty/Faculty_view_a_course";
import FacultyViewACourseProposalForm from "./Faculty/Faculty_view_a_course_proposal_form";
import FacultyViewAllBatches from "./Faculty/Faculty_view_all_batches";
import FacultyViewAllWorkingCurriculums from "./Faculty/Faculty_view_all_working_curriculums";
import FacultyAddCourseProposalForm from "./Faculty/Faculty_add_course_proposal_form";
import FacultyCourseForwardForm from "./Faculty/Faculty_course_forward_form";
import FacultyCourseProposalFinalForm from "./Faculty/Faculty_Course_Proposal_Final_Form";
import ViewAllCourses from "./View_all_courses";
import ViewAllBatches from "./View_all_batches";
import ViewACourse from "./View_a_course";
import ViewAllWorkingCurriculums from "./View_all_working_curriculums";
import ViewAllProgrammes from "./View_all_programmes";
import BDesAcadView from "./Acad_admin/BDesAcadView";
import BDesstudView from "./Student/BDesStudView";
import DisciplineAcad from "./Acad_admin/DisciplineAcad";
import DisciplineStud from "./Student/DisciplineStud";
import FacultyCourseProposal from "./Faculty/Faculty_course_proposal";
import VCourseProposalForm from "./Faculty/VCourseProposalForm";
import CourseSlotDetails from "./CourseSlotDetails";
import SemesterInfo from "./SemesterInfo";
import AdminViewAllProgrammes from "./Acad_admin/Admin_view_all_programmes";
import AdminViewAllWorkingCurriculum from "./Acad_admin/Admin_view_all_working_curriculums";
import AdminViewAllCourseInstructors from "./Acad_admin/Admin_view_all_course_instructors";
import ViewInwardFile from "./Faculty/ViewInwardFile";
import ViewSemesterOfACurriculum from "./ViewSemesterOfACurriculum";
import InwardFile from "./Faculty/InwardFiles";
import OutwardFile from "./Faculty/OutwardFiles";
import BDesView from "./Faculty/BDesView";
import Discipline from "./Faculty/Discipline";
import StudCourseSlotDetails from "./Student/StudCourseSlotDetails";
import StudSemesterInfo from "./Student/StudSemesterinfo";
// forms
import AdminAddBatchForm from "./Acad_admin/Admin_add_batch_form";
import AdminAddCourseProposalForm from "./Acad_admin/Admin_add_course_proposal_form";
import AdminAddCourseSlotForm from "./Acad_admin/Admin_add_course_slot_form";
import AdminAddCurriculumForm from "./Acad_admin/Admin_add_curriculum_form";
import AdminAddCourseInstructor from "./Acad_admin/Admin_add_course_instructor_form";
import AdminAddDisciplineForm from "./Acad_admin/Admin_add_discipline_form";
import AdminAddProgrammeForm from "./Acad_admin/Admin_add_programme_form";
import InstigateForm from "./Acad_admin/Instigate_form";
import AdminEditProgrammeForm from "./Acad_admin/Admin_edit_programme_form";
import AdminEditCurriculumForm from "./Acad_admin/Admin_edit_curriculum_form";
import AdminReplicateCurriculumform from "./Acad_admin/Acad_admin_replicate_curriculum";
import AdminEditCourseSlotForm from "./Acad_admin/Admin_edit_course_slot_form";
import AdminEditDisciplineForm from "./Acad_admin/Admin_edit_discipline_form";
import AdminEditCourseForm from "./Acad_admin/Admin_edit_course_form";
import AdminEditBatchForm from "./Acad_admin/Admin_edit_batch_form";
import AdminEditCourseInstructor from "./Acad_admin/Admin_edit_course_instructor_form";
import Breadcrumb from "./BreadCrumbs";

// breadcrumb
import BreadcrumbTabsAcadadmin from "./Acad_admin/BreadcrumbTabsAcadadmin";
import BreadcrumbTabs from "./Student/BreadcrumbTabsStudent";
import BreadcrumbTabsFaculty from "./Faculty/BreadcrumbTagsFaculty";

export default function ProgrammeCurriculumRoutes() {
  const role = useSelector((state) => state.user.role);

  // Define role groups
  const ADMIN_ROLES = ["acadadmin", "studentacadadmin"];
  const FACULTY_ROLES = [
    "Professor",
    "Assistant Professor",
    "Associate Professor",
    "Dean Academic",
    "HOD (CSE)",
    "HOD (ECE)",
    "HOD (ME)",
    "HOD (NS)",
    "HOD (Design)",
    "HOD (Liberal Arts)",
  ];
  const STUDENT_ROLES = ["student", "Guest-User"];

  // Protected route component
  // Modified ProtectedRoute component with timeout
  const ProtectedRoute = ({ allowedRoles, children }) => {
    const [isLoading, setIsLoading] = useState(role === "Guest-User");
    const [hasAccess, setHasAccess] = useState(allowedRoles.includes(role));

    useEffect(() => {
      let timer;
      // Only apply delay if role is Guest-User
      if (role === "Guest-User") {
        timer = setTimeout(() => {
          setHasAccess(allowedRoles.includes(role));
          setIsLoading(false);
        }, 2000);
      } else {
        // Immediate check for other roles
        setHasAccess(allowedRoles.includes(role));
        setIsLoading(false);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [role, allowedRoles]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return hasAccess ? children : <Navigate to="/dashboard" />;
  };

  // Determine which navigation tabs to show based on role
  const NavTab = () => {
    const TabComponent = 
      STUDENT_ROLES.includes(role)
        ? BreadcrumbTabs
        : FACULTY_ROLES.includes(role)
          ? BreadcrumbTabsFaculty
          : ADMIN_ROLES.includes(role)
            ? BreadcrumbTabsAcadadmin
            : () => null;
    
    return (
      <>
        <Breadcrumb />
        <TabComponent />
      </>
    );
  };

  return (
    <>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin_courses"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminViewAllCourses />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_course/:id"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminViewACourse />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_batches"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminViewAllBatches />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view_curriculum"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminViewSemestersOfACurriculum />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_view"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <BDesAcadView />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_discipline_view"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <DisciplineAcad />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_view_all_programme"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminViewAllProgrammes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_view_all_working_curriculums"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminViewAllWorkingCurriculum />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_course_instructor"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminViewAllCourseInstructors />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty_courses"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyViewAllCourses />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_course_view"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyViewACourse />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view_a_course_proposal_form"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyViewACourseProposalForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_batches"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyViewAllBatches />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_view_course_proposal"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyCourseProposal />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/filetracking"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <VCourseProposalForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_course_proposal_form"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyAddCourseProposalForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forward_course_forms"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyCourseForwardForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_view_all_working_curriculums"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <FacultyViewAllWorkingCurriculums />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view_inward_file"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
              <NavTab />
                <ViewInwardFile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_inward_files"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <InwardFile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_outward_files"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <OutwardFile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_view"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
              <NavTab />
                <BDesView />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_discipline"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <Discipline />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty_view_all_programmes"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
                <NavTab />
                <ViewAllProgrammes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course_slot_details"
          element={
            <ProtectedRoute allowedRoles={[...FACULTY_ROLES, ...ADMIN_ROLES]}>
              <Layout>
                <NavTab />
                <CourseSlotDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/semester_info"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <SemesterInfo />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Student Routes (also accessible to faculty) */}
        <Route
          path="/student_courses"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <ViewAllCourses />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student_course/:id"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <ViewACourse />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student_batches"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <ViewAllBatches />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view_all_programmes"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <ViewAllProgrammes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view_all_working_curriculums"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <ViewAllWorkingCurriculums />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculums/:id"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <BDesstudView />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stud_discipline_view"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <DisciplineStud />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stud_semester_info/:id"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <StudSemesterInfo />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stud_course_slot_details/:id"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <StudCourseSlotDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stud_curriculum_view/:id"
          element={
            <ProtectedRoute allowedRoles={[...STUDENT_ROLES, ...FACULTY_ROLES]}>
              <Layout>
                <NavTab />
                <ViewSemesterOfACurriculum />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Forms */}
        <Route
          path="/acad_admin_add_batch_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddBatchForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_add_course_proposal_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddCourseProposalForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_add_courseslot_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddCourseSlotForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_add_curriculum_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddCurriculumForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_add_discipline_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddDisciplineForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_add_programme_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddProgrammeForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_instigate_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <InstigateForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_edit_programme_form/:id"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminEditProgrammeForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_edit_curriculum_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminEditCurriculumForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_replicate_curriculum_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminReplicateCurriculumform />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_edit_course_slot_form/:courseslotid"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminEditCourseSlotForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_edit_discipline_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddDisciplineForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_edit_discipline_form/:id"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminEditDisciplineForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_edit_batch_form"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminEditBatchForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_edit_course_form/:id"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminEditCourseForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/acad_admin_add_course_instructor"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminAddCourseInstructor />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_edit_course_instructor/:id"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <Layout>
                <NavTab />
                <AdminEditCourseInstructor />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forward_course_forms_II"
          element={
            <ProtectedRoute allowedRoles={FACULTY_ROLES}>
              <Layout>
              <NavTab />
                <FacultyCourseProposalFinalForm />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
