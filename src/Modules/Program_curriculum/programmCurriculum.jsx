// src/programmeCurriculum.jsx

import { Route, Routes } from "react-router-dom";
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
// import FacultyViewAllProgrammes from "./Faculty/Faculty_view_all_programmes";

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

// breadcrumb
// import BreadCrumbs from "./BreadCrumbsPorgrammeCurriculum";
import BreadcrumbTabsAcadadmin from "./Acad_admin/BreadcrumbTabsAcadadmin";
import BreadcrumbTabs from "./Student/BreadcrumbTabsStudent";
import BreadcrumbTabsFaculty from "./Faculty/BreadcrumbTagsFaculty";

export default function ProgrammeCurriculumRoutes() {
  const role = useSelector((state) => state.user.role);
  console.log(role);

  const NavTab =
    role === "student"
      ? BreadcrumbTabs
      : role === "Professor" ||
          role === "Assistant Professor" ||
          role === "Dean Academic" ||
          role === "HOD (CSE)" ||
          role === "HOD (ECE)" ||
          role === "HOD (ME)" ||
          role === "HOD (NS)" ||
          role === "HOD (Design)" ||
          role === "HOD (Liberal Arts)"
        ? BreadcrumbTabsFaculty
        : role === "acadadmin" || role === "studentacadadmin"
          ? BreadcrumbTabsAcadadmin
          : () => null;
  return (
    <>
      {/* Admin Routes */}

      <Routes>
        {/* <BreadCrumbs/> */}
        <Route
          path="/admin_courses"
          element={
            <Layout>
              <NavTab />
              <AdminViewAllCourses />
              {/* <CourseProposalForm /> */}
            </Layout>
          }
        />
        <Route
          path="/admin_course/:id"
          element={
            <Layout>
              <NavTab />
              <AdminViewACourse />
            </Layout>
          }
        />
        <Route
          path="/admin_batches"
          element={
            <Layout>
              {/* <AdminViewACourse /> */}
              <NavTab />
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
              <NavTab />
              <AdminViewSemestersOfACurriculum />
            </Layout>
          }
        />
        <Route
          path="/acad_view"
          element={
            <Layout>
              <NavTab />
              <BDesAcadView />
            </Layout>
          }
        />
        <Route
          path="/acad_discipline_view"
          element={
            <Layout>
              <NavTab />
              <DisciplineAcad />
            </Layout>
          }
        />
        <Route
          path="/acad_view_all_programme"
          element={
            <Layout>
              <NavTab />
              <AdminViewAllProgrammes />
            </Layout>
          }
        />
        <Route
          path="/acad_view_all_working_curriculums"
          element={
            <Layout>
              <NavTab />
              <AdminViewAllWorkingCurriculum />
            </Layout>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/faculty_courses"
          element={
            <Layout>
              <NavTab />
              <FacultyViewAllCourses />
            </Layout>
          }
        />
        <Route
          path="/faculty_course_view"
          element={
            <Layout>
              <NavTab />
              <FacultyViewACourse />
            </Layout>
          }
        />
        <Route
          path="/view_a_course_proposal_form"
          element={
            <Layout>
              <NavTab />
              <FacultyViewACourseProposalForm />
            </Layout>
          }
        />
        <Route
          path="/faculty_batches"
          element={
            <Layout>
              <NavTab />
              <FacultyViewAllBatches />
              {/* <ViewAllBatches /> */}
            </Layout>
          }
        />
        <Route
          path="/faculty_view_course_proposal"
          element={
            <Layout>
              <NavTab />
              <FacultyCourseProposal />
            </Layout>
          }
        />
        <Route
          path="/filetracking"
          element={
            <Layout>
              <NavTab />
              <VCourseProposalForm />
            </Layout>
          }
        />
        <Route
          path="/new_course_proposal_form"
          element={
            <Layout>
              <NavTab />
              <FacultyAddCourseProposalForm />
            </Layout>
          }
        />
        <Route
          path="/forward_course_forms"
          element={
            <Layout>
              <NavTab />
              <FacultyCourseForwardForm />
            </Layout>
          }
        />
        <Route
          path="/view_all_programmes"
          element={
            <Layout>
              <NavTab />
              <ViewAllProgrammes />
            </Layout>
          }
        />
        <Route
          path="/view_all_working_curriculums"
          element={
            <Layout>
              <NavTab />
              <ViewAllWorkingCurriculums />
            </Layout>
          }
        />
        <Route
          path="/faculty_view_all_working_curriculums"
          element={
            <Layout>
              <NavTab />
              {/* <ViewAllWorkingCurriculums /> */}
              <FacultyViewAllWorkingCurriculums />
            </Layout>
          }
        />
        <Route
          path="/curriculums/:id"
          element={
            <Layout>
              <NavTab />
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
              <NavTab />
              <InwardFile />
            </Layout>
          }
        />
        <Route
          path="/faculty_outward_files"
          element={
            <Layout>
              <NavTab />
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
              <NavTab />
              {/* <DisciplineStud /> */}
              <Discipline />
            </Layout>
          }
        />
        <Route
          path="/faculty_view_all_programmes"
          element={
            <Layout>
              <NavTab />
              <ViewAllProgrammes />
            </Layout>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student_courses"
          element={
            <Layout>
              <NavTab />
              <ViewAllCourses />
            </Layout>
          }
        />
        <Route
          path="/student_course/:id"
          element={
            <Layout>
              <NavTab />
              <ViewACourse />
            </Layout>
          }
        />
        <Route
          path="/student_batches"
          element={
            <Layout>
              <NavTab />
              <ViewAllBatches />
            </Layout>
          }
        />
        <Route
          path="/stud_discipline_view"
          element={
            <Layout>
              <NavTab />
              <DisciplineStud />
            </Layout>
          }
        />
        <Route
          path="/stud_semester_info/:id"
          element={
            <Layout>
              <NavTab />
              <StudSemesterInfo />
            </Layout>
          }
        />
        <Route
          path="/stud_course_slot_details/:id"
          element={
            <Layout>
              <NavTab />
              <StudCourseSlotDetails />
            </Layout>
          }
        />
        <Route
          path="/stud_curriculum_view/:id"
          element={
            <Layout>
              <NavTab />
              <ViewSemesterOfACurriculum />
            </Layout>
          }
        />

        <Route
          path="/course_slot_details"
          element={
            <Layout>
              <NavTab />
              <CourseSlotDetails />
            </Layout>
          }
        />
        <Route
          path="/semester_info"
          element={
            <Layout>
              <NavTab />
              <SemesterInfo />
            </Layout>
          }
        />
        {/* forms */}
        <Route
          path="/acad_admin_add_batch_form"
          element={
            <Layout>
              <NavTab />
              <AdminAddBatchForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_course_proposal_form"
          element={
            <Layout>
              <NavTab />
              <AdminAddCourseProposalForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_courseslot_form"
          element={
            <Layout>
              <NavTab />
              <AdminAddCourseSlotForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_curriculum_form"
          element={
            <Layout>
              <NavTab />
              <AdminAddCurriculumForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_discipline_form"
          element={
            <Layout>
              <NavTab />
              <AdminAddDisciplineForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_add_programme_form"
          element={
            <Layout>
              <NavTab />
              <AdminAddProgrammeForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_instigate_form"
          element={
            <Layout>
              <NavTab />
              <InstigateForm />
            </Layout>
          }
        />

        <Route
          path="/admin_edit_programme_form/:id"
          element={
            <Layout>
              <NavTab />
              <AdminEditProgrammeForm />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_curriculum_form"
          element={
            <Layout>
              <NavTab />
              <AdminEditCurriculumForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_replicate_curriculum_form"
          element={
            <Layout>
              <NavTab />
              <AdminReplicateCurriculumform />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_course_slot_form/:courseslotid"
          element={
            <Layout>
              <NavTab />
              <AdminEditCourseSlotForm />
            </Layout>
          }
        />
        {/* <Route
          path="/acad_admin_replicate_curriculum"
          element={
            <Layout>
              <NavTab />
              <AdminAddCurriculumForm />
            </Layout>
          }
        /> */}
        <Route
          path="/admin_edit_discipline_form"
          element={
            <Layout>
              <NavTab />
              <AdminAddDisciplineForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_edit_discipline_form/:id"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminEditDisciplineForm />
            </Layout>
          }
        />
        <Route
          path="/admin_edit_batch_form"
          element={
            <Layout>
              <NavTab />
              <AdminEditBatchForm />
            </Layout>
          }
        />
        <Route
          path="/acad_admin_edit_course_form/:id"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminEditCourseForm />
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
        <Route
          path="/admin_edit_course_instructor/:id"
          element={
            <Layout>
              <BreadcrumbTabsAcadadmin />
              <AdminEditCourseInstructor />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
