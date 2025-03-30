import React, { useEffect, useState } from "react";
import {
  Select,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAllCourses,
  fetchFacultiesData,
  adminFetchCourseInstructorData,
} from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_edit_course_instructor() {
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming the course instructor ID is passed via URL

  const form = useForm({
    initialValues: {
      courseName: "",
      instructor: "",
      year: 2024,
      semester: "",
      runningBatch: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication not found");
        }

        // Fetch all courses and faculties
        const coursesResponse = await fetchAllCourses();
        const facultiesResponse = await fetchFacultiesData();

        const courseList = coursesResponse.map((course) => ({
          id: course.id,
          name: `${course.name} (${course.code})`,
        }));
        setCourses(courseList);

        const facultyList = facultiesResponse.map((faculty) => ({
          id: faculty.id,
          name: `${faculty.faculty_first_name} ${faculty.faculty_last_name}`,
        }));
        setFaculties(facultyList);

        // Fetch all course instructor data
        const courseInstructors = await adminFetchCourseInstructorData();

        // Find the specific course instructor by ID
        const courseInstructor = courseInstructors.find(
          (ci) => ci.id === parseInt(id, 10),
        );

        if (courseInstructor) {
          form.setValues({
            courseName: String(courseInstructor.course_id),
            instructor: courseInstructor.instructor_id,
            year: courseInstructor.year,
            semester: String(courseInstructor.semester_no),
            runningBatch: courseInstructor.runningBatch,
          });
        } else {
          console.error("Course instructor not found");
          alert("Course instructor not found");
          navigate("/programme_curriculum/admin_course_instructor");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `${host}/programme_curriculum/api/admin_update_course_instructor/${id}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            course_id: values.courseName,
            instructor_id: values.instructor,
            year: values.year,
            semester_no: values.semester,
            runningBatch: values.runningBatch,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert(result.message); // "Course Instructor updated successfully!"
      navigate("/programme_curriculum/admin_course_instructor");
    } catch (error) {
      console.error("Error updating course instructor:", error);
      alert("Failed to update course instructor.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
          width: "100%",
          margin: "0 0 0 -3.2vw",
        }}
      >
        <div
          style={{
            maxWidth: "290vw",
            width: "100%",
            display: "flex",
            gap: "2rem",
            padding: "2rem",
            flex: 4,
          }}
        >
          {/* Form Section */}
          <div style={{ width: "100%" }}>
            <form
              onSubmit={form.onSubmit(handleSubmit)}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              <Text size="xl" weight={700} align="center">
                Edit Course Instructor Form
              </Text>

              <Stack spacing="lg">
                <Select
                  label="Select Course"
                  placeholder="-- Select Course Name --"
                  data={courses.map((course) => ({
                    label: `${course.name}`,
                    value: String(course.id),
                  }))}
                  value={form.values.courseName}
                  onChange={(value) => form.setFieldValue("courseName", value)}
                  searchable
                  required
                />

                <Select
                  label="Select Instructor"
                  placeholder="-- Select Instructor --"
                  data={faculties.map((faculty) => ({
                    label: `${faculty.name} (${faculty.id})`,
                    value: String(faculty.id),
                  }))}
                  value={form.values.instructor}
                  onChange={(value) => form.setFieldValue("instructor", value)}
                  searchable
                  required
                />

                <NumberInput
                  label="Select Year"
                  defaultValue={2024}
                  value={form.values.year}
                  onChange={(value) => form.setFieldValue("year", value)}
                  required
                />

                <Select
                  label="Select Semester Number"
                  placeholder="-- Select Semester --"
                  data={[
                    { value: "1", label: "Semester 1" },
                    { value: "2", label: "Semester 2" },
                    { value: "3", label: "Semester 3" },
                    { value: "4", label: "Semester 4" },
                    { value: "5", label: "Semester 5" },
                    { value: "6", label: "Semester 6" },
                    { value: "7", label: "Semester 7" },
                    { value: "8", label: "Semester 8" },
                  ]}
                  value={form.values.semester}
                  onChange={(value) => form.setFieldValue("semester", value)}
                  required
                  searchable
                />

                <Group position="right" mt="lg">
                  <Button variant="outline" className="cancel-btn">
                    Cancel
                  </Button>
                  <Button type="submit" className="submit-btn">
                    Update
                  </Button>
                </Group>
              </Stack>
            </form>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {" "}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Admin_edit_course_instructor;
