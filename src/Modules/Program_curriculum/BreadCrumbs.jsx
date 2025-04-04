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
const formatBreadcrumbName = (path) => {
  const [pageName, queryParams] = path.split("?");
  let formattedPageName = capitalizeWords(pageName.replace(/_/g, " ")); // Capitalized base page name

  if (!queryParams) return formattedPageName;

  const formattedParams = queryParams
    .split("&")
    .map(param => capitalizeWords(param.replace("=", ": "))) // Capitalize query parameters
    .join(", ");

  return `${formattedPageName} (${formattedParams})`;
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