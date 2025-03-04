import React, { useState, useEffect } from "react";
import { Card, Text, Loader, Group } from "@mantine/core";
import axios from "axios";
import FusionTable from "../../components/FusionTable";
import { nextSemCoursesRoute } from "../../routes/academicRoutes";

function AvailableCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get token from local storage
        if (!token) {
          throw new Error("No token found"); // Handle the case where the token is not available
        }
        const response = await axios.get(nextSemCoursesRoute, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data);
        setCourses(response.data.courses_list); // Set courses from API response
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // Or set a default message in the table
      } finally {
        setTimeout(() => setLoading(false));
      }
    };

    fetchCourses();
  }, []);

  const columnNames = [
    "Slot Name",
    "Slot Type",
    "Semester",
    "Credits",
    "Course",
  ];

  const mappedCourses = courses.map((course) => ({
    "Slot Name": <Text style={{ whiteSpace: "pre-line" }}>{course.name}</Text>,
    "Slot Type": course.type,
    Semester: course.semester.semester_no,
    Credits: course.courses[0].credit,
    Course: (
      <Text style={{ whiteSpace: "pre-line" }}>
        {course.courses.map((cour) => cour.name).join("\n")}
      </Text>
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
        Available Courses Next Semester
      </Text>
      {loading ? (
        <Group position="center" py="xl">
          <Loader variant="dots" />
        </Group>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <FusionTable
            columnNames={columnNames}
            elements={mappedCourses}
            width="100%"
          />
        </div>
      )}
    </Card>
  );
}

export default AvailableCourses;
