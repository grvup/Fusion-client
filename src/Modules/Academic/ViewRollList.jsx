import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Text, Button, Alert } from "@mantine/core";
import FusionTable from "../../components/FusionTable";
import {
  generatexlsheet,
  academicProceduresFaculty,
} from "../../routes/academicRoutes";

function ViewRollList() {
  const [courses, setCourses] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setFetchError("No authentication token found.");
        return;
      }

      try {
        const response = await axios.get(academicProceduresFaculty, {
          headers: { Authorization: `Token ${token}` },
        });

        setCourses(response.data.assigned_courses || []);
      } catch (error) {
        setFetchError(
          error.response?.data?.error || "Failed to fetch courses.",
        );
      }
    };

    fetchCourses();
  }, []);

  const handleDownloadRollList = async (courseId, courseCode) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setFetchError("No authentication token found.");
      return;
    }

    try {
      const response = await axios.post(
        generatexlsheet,
        { course: courseId },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${courseCode}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setFetchError(
        error.response?.data?.error || "Failed to download roll list.",
      );
    }
  };

  const columnNames = [
    "Course Name",
    "Course Code",
    "Version",
    "Year",
    "Semester",
    "Action",
  ];

  const elements = courses.map((course) => ({
    "Course Name": course.course_id__name,
    "Course Code": course.course_id__code,
    Version: course.course_id__version,
    Year: course.year,
    Semester: course.semester_no,
    Action: (
      <Button
        onClick={() =>
          handleDownloadRollList(course.course_id__id, course.course_id__code)
        }
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
        style={{ textAlign: "center", color: "#3B82F6" }}
      >
        Assigned Courses
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
