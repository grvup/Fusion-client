import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumbs, Text, Box } from "@mantine/core";
import { CaretRight } from "@phosphor-icons/react";

const basePages = [
  "admin_courses",
  "admin_batches",
  "acad_view_all_programme",
  "acad_view_all_working_curriculums",
  "acad_discipline_view",
  "admin_course_instructor",

  "faculty_view_all_programmes",
  "faculty_view_all_working_curriculums",
  "faculty_discipline",
  "faculty_batches",
  "faculty_courses",
  "faculty_view_course_proposal",
  "faculty_outward_files",
  "faculty_inward_files",
  
  "view_all_programmes",
  "view_all_working_curriculums",
  "stud_discipline_view",
  "student_batches",
  "student_courses"
];

const localStorageKey = "p_c_breadcrumbs";

// Function to capitalize first letter of each word
const capitalizeWords = (text) => {
  return text
    .split(/[\s_:]/) // Split by spaces, underscores, and colons
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Function to format breadcrumb name with capitalized words & query parameters
const pageNameMappings = {
  "acad_view_all_programme": "Programme",
  "acad_view_all_working_curriculums": "Curriculum",
  "acad_discipline_view": "Discipline",
  "admin_batches": "Batches",
  "admin_courses": "Courses",
  "admin_course_instructor": "Course Instructor",
  "acad_view": "Programme-Details",
  "admin_edit_curriculum_form": "Edit Curriculum Form",
  "acad_admin_add_curriculum_form": "Add Curriculum Form",
  "acad_admin_replicate_curriculum": "Replicate Curriculum Form",
  "admin_edit_programme_form": "Edit Programme Form",
  "view_curriculum": "Curriculum-Details",
  "course_slot_details": "Course Slot Details",
  "acad_admin_instigate_form": "Instigate Semester Form",
  "acad_admin_add_courseslot_form": "Add Course Slot Form",
  "admin_edit_batch_form": "Edit Batch Form",
  "acad_admin_add_batch_form": "Add Batch Form",
  "acad_admin_add_programme_form": "Add Programme Form",
  "acad_admin_replicate_curriculum_form": "Replicate Curriculum Form",
  "acad_admin_add_discipline_form": "Add Discipline Form",
  "acad_admin_edit_discipline_form": "Edit Discipline Form",
  "admin_course": "Course-Details",
  "acad_admin_add_course_proposal_form": "Add Course Proposal Form",
  "acad_admin_edit_course_form": "Edit Course Form",
  "acad_admin_add_course_instructor": "Add Course Instructor Form",
  "admin_edit_course_instructor": "Edit Course Instructor Form",
  "faculty_view_all_programmes": "Programme",
  "faculty_view_all_working_curriculums": "Curriculum",
  "faculty_discipline": "Discipline",
  "faculty_batches": "Batches",
  "faculty_courses": "Courses",
  "faculty_view_course_proposal": "Course Proposal",
  "faculty_outward_files": "Course Proposal Tracking",
  "faculty_inward_files": "Inward Files",
  "stud_curriculum_view": "Curriculum-Details",
  "stud_semester_info": "Semester Information",
  "stud_course_slot_details": "Course-Slot Details",
  "faculty_course_view": "Course Details",
  "faculty_forward_form": "Edit Course Form",
  "new_course_proposal_form": "New Course Proposal Form",
  "view_a_course_proposal_form": "View Course Proposal Form",
  "filetracking": "File-Tracking",
  "view_inward_file": "View Inward File",
  "forward_course_forms": "Forward Course Form",
  "forward_course_forms_II": "Forward Course Form",
  "view_all_programmes": "Programme",
  "view_all_working_curriculums": "Curriculum",
  "stud_discipline_view": "Discipline",
  "student_batches": "Batches",
  "student_courses": "Courses",
  "student_course": "Course-Details",
  
  // Add more mappings as needed...
};

const formatBreadcrumbName = (path) => {
  const [fullPageName, queryParams] = path.split("?");
  const pageName = fullPageName.split("/")[0]; // Extract only the base page name before any slashes

  // Use mapped name if available, otherwise format the name
  if (pageNameMappings[pageName]) {
    return pageNameMappings[pageName]; 
  }

  const primaryName = capitalizeWords(pageName.replace(/_/g, " "));

  if (!queryParams) return primaryName;

  const formattedParams = queryParams
    .split("&")
    .map(param => capitalizeWords(param.replace("=", ": ")))
    .join(", ");

  return `${primaryName} (${formattedParams})`;
};

const Breadcrumb = () => {
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const [breadcrumbs, setBreadcrumbs] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [{ name: "Dashboard", path: "/" }];
  });

  useEffect(() => {
    const pathMatch = location.pathname.split("/programme_curriculum/");
    if (pathMatch.length < 2) return;

    const currentPage = pathMatch[1] + location.search;

    setBreadcrumbs((prev) => {
      let updatedBreadcrumbs = [{ name: "Dashboard", path: "/" }];

      // Maintain the second item as the latest base page
      const basePage = basePages.includes(currentPage.split("?")[0]) ? currentPage : prev[1]?.path;
      if (basePage) {
        updatedBreadcrumbs.push({ name: formatBreadcrumbName(basePage), path: `/programme_curriculum/${basePage}` });
      }

      // Append non-base pages while avoiding duplicates
      if (!basePages.includes(currentPage.split("?")[0])) {
        const existingIndex = prev.findIndex(b => b.path === `/programme_curriculum/${currentPage}`);
        if (existingIndex === -1) {
          updatedBreadcrumbs = [...prev, { name: formatBreadcrumbName(currentPage), path: `/programme_curriculum/${currentPage}` }];
        } else {
          updatedBreadcrumbs = prev.slice(0, existingIndex + 1);
        }
      }

      localStorage.setItem(localStorageKey, JSON.stringify(updatedBreadcrumbs)); // Cache breadcrumbs
      return updatedBreadcrumbs;
    });
  }, [location.pathname, location.search]);

  // Scroll to the end when breadcrumbs update
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [breadcrumbs]);

  return (
    <Box
      mt="xs"
      ml={{ md: "lg" }}
      style={{ marginBottom: "-4.5vh" }}
    >
      <div 
        ref={scrollContainerRef}
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          maxWidth: "90vw",
          paddingBottom: "10px",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          display: "block"
        }}
        className="breadcrumb-container"
      >
        <style>
          {`
            .breadcrumb-container::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <Breadcrumbs
          separator={<CaretRight style={{ color: "black", fontWeight: "bold" }} />}
          style={{ 
            display: "inline-flex", 
            flexWrap: "nowrap"
          }}
        >
          {breadcrumbs.map((crumb, index) => (
            <div 
              key={index} 
              style={{ 
                textDecoration: "none", 
                display: "inline-block",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              <Link
                to={crumb.path}
                style={{ 
                  textDecoration: "none",
                  color: "inherit"
                }}
              >      
                <Text
                  style={{
                    color: "black",
                    fontWeight: "600",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    fontSize: "18px"
                  }}
                >
                  {crumb.name}
                </Text>
              </Link>
            </div>
          ))}
        </Breadcrumbs>
      </div>
    </Box>
  );
};

export default Breadcrumb;