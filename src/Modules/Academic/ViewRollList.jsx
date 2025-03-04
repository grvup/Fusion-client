import { useState, useEffect } from "react";
import { Card, Text, Button, Alert } from "@mantine/core";
import FusionTable from "../../components/FusionTable";

const mockCoursesAPIResponse = [
  {
    id: 1,
    name: "Computer Networks",
    code: "CS301",
    version: "1.0",
    year: 2024,
    semester: 5,
  },
  {
    id: 2,
    name: "Operating Systems",
    code: "CS302",
    version: "1.0",
    year: 2024,
    semester: 5,
  },
  {
    id: 3,
    name: "Database Management",
    code: "CS303",
    version: "1.0",
    year: 2024,
    semester: 6,
  },
];

function ViewRollList() {
  const [courses, setCourses] = useState([]);
  const [fetchError, setFetchError] = useState("");

  // Simulate an API call to fetch courses
  const fetchCourses = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCoursesAPIResponse);
      }, 500);
    });
  };

  useEffect(() => {
    fetchCourses().then((data) => {
      setCourses(data);
    });
  }, []);

  const handleDownloadRollList = async (courseId) => {
    try {
      const response = await fetch(
        `https://example.com/api/download/roll-list/${courseId}`,
      );
      if (!response.ok) {
        throw new Error("Download link is not attached yet");
      }
      const data = await response.json();
      const { downloadLink } = data;
      window.location.href = downloadLink;
    } catch (downloadError) {
      setFetchError(downloadError.message);
    }
  };

  const columnNames = [
    "Course Name",
    "Course Code",
    "Version",
    "Working Year",
    "Semester",
    "Action",
  ];
  const elements = courses.map((course) => ({
    "Course Name": course.name,
    "Course Code": course.code,
    Version: course.version,
    "Working Year": course.year,
    Semester: course.semester,
    Action: (
      <Button
        onClick={() => handleDownloadRollList(course.id)}
        variant="outline"
        color="blue"
        size="xs"
      >
        Download Roll List
      </Button>
    ),
  }));

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", width: "100%", color: "#3B82F6" }}
      >
        Courses Assigned
      </Text>
      <div style={{ overflowX: "auto" }}>
        <FusionTable
          columnNames={columnNames}
          elements={elements}
          width="100%"
        />
      </div>
      {fetchError && (
        <Alert title="Error" color="red" mt="md">
          {fetchError}
        </Alert>
      )}
    </Card>
  );
}

export default ViewRollList;
