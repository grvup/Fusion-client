// src/programmeCurriculum.jsx

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
import FacultyViewAllProgrammes from "./Faculty/Faculty_view_all_programmes";

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
import AdminEditCourseSlotForm from "./Acad_admin/Admin_edit_course_slot_form";

// breadcrumb
// import BreadCrumbs from "./BreadCrumbsPorgrammeCurriculum";
import BreadcrumbTabsAcadadmin from "./Acad_admin/BreadcrumbTabsAcadadmin";
import BreadcrumbTabs from "./Student/BreadcrumbTabsStudent";

export default function ProgrammeCurriculumRoutes() {
  return (
    <>
      {/* Admin Routes */}

      <Routes>
        {/* <BreadCrumbs/> */}
        <Route
          path="/admin_courses"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminViewAllCourses />
              {/* <CourseProposalForm /> */}
            </Layout>
          }
        />
        <Route
          path="/admin_course/:id"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminViewACourse />
            </Layout>
          }
        />
        <Route
          path="/admin_batches"
          element={
            <Layout>
              {/* <AdminViewACourse /> */}
              <BreadcrumbTabsAcadadmin />
              <AdminViewAllBatches />

              {/* <FacultyViewACourse/> */}
              {/* <Inward /> */}
              {/* <ViewACourse/> */}
            </Layout>
          }
        />
        <Route
          path="/view_curriculum"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminViewSemestersOfACurriculum />
            </Layout>
          }
        />
        <Route
          path="/acad_view"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <BDesAcadView />
            </Layout>
          }
        />
        <Route
          path="/acad_discipline_view"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <DisciplineAcad />
            </Layout>
          }
        />
        <Route
          path="/acad_view_all_programme"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminViewAllProgrammes />
            </Layout>
          }
        />
        <Route
          path="/acad_view_all_working_curriculums"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminViewAllWorkingCurriculum />
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
          path="/faculty_course_view"
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
        <Route
          path="/faculty_view_course_proposal"
          element={
            <Layout>
              <FacultyCourseProposal />
            </Layout>
          }
        />
        <Route
          path="/faculty_forward_form"
          element={
            <Layout>
              <VCourseProposalForm />
            </Layout>
          }
        />
        <Route
          path="/view_all_programmes"
          element={
            <Layout>
              <BreadcrumbTabs />
              <ViewAllProgrammes />
            </Layout>
          }
        />
        <Route
          path="/view_all_working_curriculums"
          element={
            <Layout>
              <BreadcrumbTabs />
              <ViewAllWorkingCurriculums />
            </Layout>
          }
        />
        <Route
          path="/curriculums/:id"
          element={
            <Layout>
              <BreadcrumbTabs />
              <BDesstudView />
            </Layout>
          }
        />
        <Route
          path="/view_inward_file"
          element={
            <Layout>
              <ViewInwardFile />
            </Layout>
          }
        />
        <Route
          path="/faculty_inward_files"
          element={
            <Layout>
              <InwardFile />
            </Layout>
          }
        />
        <Route
          path="/faculty_outward_files"
          element={
            <Layout>
              <OutwardFile />
            </Layout>
          }
        />
        <Route
          path="/faculty_view"
          element={
            <Layout>
              <BDesView />
            </Layout>
          }
        />
        <Route
          path="/faculty_discipline"
          element={
            <Layout>
              <Discipline />
            </Layout>
          }
        />
        <Route
          path="/faculty_view_all_programmes"
          element={
            <Layout>
              <FacultyViewAllProgrammes />
            </Layout>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student_courses"
          element={
            <Layout>
              <BreadcrumbTabs />
              <ViewAllCourses />
            </Layout>
          }
        />
        <Route
          path="/student_course/:id"
          element={
            <Layout>
              <BreadcrumbTabs />
              <ViewACourse />
            </Layout>
          }
        />
        <Route
          path="/student_batches"
          element={
            <Layout>
              <BreadcrumbTabs />
              <ViewAllBatches />
            </Layout>
          }
        />
        <Route
          path="/stud_discipline_view"
          element={
            <Layout>
              <BreadcrumbTabs />
              <DisciplineStud />
            </Layout>
          }
        />
        <Route
          path="/stud_semester_info/:id"
          element={
            <Layout>
              <BreadcrumbTabs />
              <StudSemesterInfo />
            </Layout>
          }
        />
        <Route
          path="/stud_course_slot_details/:id"
          element={
            <Layout>
              <BreadcrumbTabs />
              <StudCourseSlotDetails />
            </Layout>
          }
        />
        <Route
          path="/stud_curriculum_view/:id"
          element={
            <Layout>
              <BreadcrumbTabs />
              <ViewSemesterOfACurriculum />
            </Layout>
          }
        />
        {/* forms */}
        <Route
          path="/acad_admin_add_batch_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddBatchForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_course_proposal_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddCourseProposalForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_courseslot_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddCourseSlotForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_curriculum_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddCurriculumForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_discipline_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddDisciplineForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_programme_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddProgrammeForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_instigate_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <InstigateForm />
            </Layout>
          }
        />
        <Route
          path="/course_slot_details"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <CourseSlotDetails />
            </Layout>
          }
        />
        <Route
          path="/semester_info"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <SemesterInfo />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_programme_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminEditProgrammeForm />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_curriculum_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminEditCurriculumForm />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_course_slot_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminEditCourseSlotForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_replicate_curriculum"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddCurriculumForm />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_discipline_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddDisciplineForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_edit_discipline_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddDisciplineForm />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_batch_form"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddBatchForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_edit_course_form/:id"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddCourseProposalForm />
            </Layout>
          }
        />
        <Route
          path="/admin_course_instructor"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminViewAllCourseInstructors />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_course_instructor"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminAddCourseInstructor />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
