import { Breadcrumbs, Text } from "@mantine/core";
import { CaretRight } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";

// Breadcrumbs Mapping for Examination Module
const breadcrumbMap = {
  "/examination/submit-grades": "Submit Grades",
  "/examination/verify-grades": "Verify Grades",
  "/examination/generate-transcript": "Generate Transcript",
  "/examination/generate-transcript/:rollNumber": "Student Transcript",
  "/examination/seating-plan": "Seating Plan",
  "/examination/announcement": "Announcement",
  "/examination/update": "Update",
  "/examination/validate": "Validate",
  "/examination/result": "Result",
};

function CustomBreadExam() {
  const location = useLocation();

  // Dynamically generate breadcrumbs based on the current path
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const title = breadcrumbMap[fullPath] || segment;

    return (
      <Text
        key={index}
        component="a"
        href={fullPath}
        size="1.2rem"
        fw={600}
        style={{ textDecoration: "none", color: "black" }}
      >
        {title}
      </Text>
    );
  });

  return (
    <Breadcrumbs
      separator={<CaretRight size={16} weight="bold" />}
      mt="xs"
      ml={{ md: "lg" }}
      style={{ margin: "20px 10px" }}
    >
      <Text
        component="a"
        href="/dashboard"
        size="1.2rem"
        fw={600}
        style={{ textDecoration: "none", color: "black" }}
      >
        Home
      </Text>
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default CustomBreadExam;
