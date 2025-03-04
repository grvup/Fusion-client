import React, { useState, useEffect } from "react";
import { Card, Text } from "@mantine/core";
import axios from "axios";
import FusionTable from "../../components/FusionTable";
import { currentCourseRegistrationRoute } from "../../routes/academicRoutes";

function RegisteredCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(currentCourseRegistrationRoute, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Fetched Courses:", response.data);
        setCourses(response.data);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const columnNames = [
    "Course Code",
    "Course Name",
    "Registration Type",
    "Semester",
    "Credits",
  ];

  const mappedCourses = courses.map((course) => ({
    "Course Code": course.course_id?.code || "N/A",
    "Course Name": course.course_id?.name || "N/A",
    "Registration Type": course.registration_type || "N/A",
    Semester: course.semester_id?.semester_no || "N/A",
    Credits: course.course_id?.credit || 0,
  }));

  const totalCredits = courses.reduce(
    (sum, course) => sum + (course.course_id?.credit || 0),
    0,
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", width: "100%", color: "#3B82F6" }}
      >
        Registered Courses This Semester
      </Text>
      <div style={{ overflowX: "auto" }}>
        <FusionTable
          columnNames={columnNames}
          elements={mappedCourses}
          width="100%"
        />
      </div>
      <Text
        size="md"
        weight={700}
        mt="md"
        style={{ textAlign: "left", width: "100%" }}
      >
        Total Credits: {totalCredits}
      </Text>
    </Card>
  );
}

export default RegisteredCourses;
