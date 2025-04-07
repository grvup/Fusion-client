import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Select,
  Text,
  Container,
  Paper,
  Grid,
  ScrollArea,
  Box,
  LoadingOverlay,
  Alert,
  TextInput,
  Group,
  Title,
  Badge,
} from "@mantine/core";
import axios from "axios";
import {
  update_grades,
  update_enter_grades,
  moderate_student_grades,
} from "./routes/examinationRoutes";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./styles/verify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9e9e9e"];
const GRADE_COLORS = {
  "A+": "#388e3c",
  A: "#4caf50",
  "B+": "#03a9f4",
  B: "#2196f3",
  "C+": "#ff9800",
  C: "#fb8c00",
  "D+": "#f57c00",
  D: "#f44336",
  F: "#9e9e9e",
};

function VerifyGrades() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const userRole = useSelector((state) => state.user.role);
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [gradesStats, setGradesStats] = useState([]);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  // Fetch Courses & Years from API
  useEffect(() => {
    const fetchCoursesAndYears = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No authentication token found!");
        setLoading(false);
        return;
      }

      try {
        const requestData = {
          Role:userRole,
        };

        const { data } = await axios.post(update_grades, requestData, {
          headers: { Authorization: `Token ${token}` },
        });

        // Format courses for dropdown (Course Code - Course Name)
        const formattedCourses = data.courses_info.map((c) => ({
          value: c.id.toString(),
          label: `${c.code} - ${c.name}`,
          code: c.code,
          name: c.name,
        }));

        // Extract unique years
        const uniqueYears = data.unique_year_ids.map((y) => ({
          value: y.year.toString(),
          label: y.year.toString(),
        }));

        setCourses(formattedCourses);
        setYears(uniqueYears);
      } catch (err) {
        setError(`Error fetching courses and years: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndYears();
  }, []);

  const handleSearch = async () => {
    if (!selectedCourse || !selectedYear) {
      setError("Please select a course and year.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setIsAlreadyVerified(false);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found!");
      setLoading(false);
      return;
    }

    try {
      
      const requestData = {
        Role: userRole,
        course: selectedCourse,
        year: selectedYear,
      };

      const response = await axios.post(update_enter_grades, requestData, {
        headers: { Authorization: `Token ${token}` },
      });

      // Handle different response types
      if (response.data.message === "This course is already verified.") {
        setIsAlreadyVerified(true);
        setSuccessMessage("This course is already verified");
        setRegistrations([]);
        setShowContent(false);
      } else if (response.data.registrations) {
        // Process registration data
        setRegistrations(response.data.registrations);

        // Calculate grade statistics for the pie chart
        const gradeCount = {};
        response.data.registrations.forEach((reg) => {
          gradeCount[reg.grade] = (gradeCount[reg.grade] || 0) + 1;
        });

        const stats = Object.keys(gradeCount).map((grade) => ({
          name: grade,
          value: gradeCount[grade],
          color: GRADE_COLORS[grade] || "#9e9e9e",
        }));

        setGradesStats(stats);
        setShowContent(true);

        // Get selected course name for display
        const courseInfo = courses.find((c) => c.value === selectedCourse);
        setSelectedCourseName(
          courseInfo
            ? `${courseInfo.code} - ${courseInfo.name}`
            : selectedCourse,
        );
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setError("This course is not submitted by the instructor.");
            break;
          case 403:
            setError(
              "Access denied. You don't have permission to view this data.",
            );
            break;
          case 400:
            setError(err.response.data.error || "Invalid request parameters.");
            break;
          default:
            setError(
              `Error fetching grades: ${err.response.data.error || err.message}`,
            );
        }
      } else {
        setError(`Network error: ${err.message}`);
      }
      setShowContent(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRemarkChange = (id, newRemarks) => {
    const updatedRegistrations = registrations.map((reg) =>
      reg.id === id ? { ...reg, remarks: newRemarks } : reg,
    );
    setRegistrations(updatedRegistrations);
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found!");
      setLoading(false);
      return;
    }

    try {
      // Prepare data for API
      const studentIds = registrations.map((reg) => reg.roll_no);
      const semesterIds = registrations.map((reg) => reg.semester);
      const courseIds = registrations.map((reg) => reg.course_id_id);
      const grades = registrations.map((reg) => reg.grade);

      // Check if any registrations need resubmission
      const allowResubmission = registrations.some(
        (reg) => reg.remarks.trim() !== "",
      )
        ? "YES"
        : "NO";

      const requestData = {
        Role: userRole,
        student_ids: studentIds,
        semester_ids: semesterIds,
        course_ids: courseIds,
        grades: grades,
        allow_resubmission: allowResubmission,
      };

      const response = await axios.post(moderate_student_grades, requestData, {
        headers: { Authorization: `Token ${token}` },
        responseType: "blob", // Important for handling CSV file response
      });

      // Handle successful response (CSV file)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${selectedCourseName.replace(/ /g, "_")}_grades_${selectedYear}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccessMessage(
        "Grades verified and CSV file downloaded successfully!",
      );
      setIsAlreadyVerified(true);
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 403:
            setError(
              "Access denied. You don't have permission to verify grades.",
            );
            break;
          case 400:
            setError(err.response.data.error || "Invalid grade data provided.");
            break;
          default:
            setError(
              `Error verifying grades: ${err.response.data?.error || err.message}`,
            );
        }
      } else {
        setError(`Network error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Create table rows dynamically
  const rows = registrations.map((item) => (
    <tr key={item.id}>
      <td>{item.roll_no}</td>
      <td>{item.batch}</td>
      <td>{item.semester}</td>
      <td>{selectedCourseName}</td>
      <td>
        <Badge
          style={{
            backgroundColor: GRADE_COLORS[item.grade] || "#9e9e9e",
            color: "#fff",
          }}
          size="lg"
        >
          {item.grade}
        </Badge>
      </td>
      <td>
        <TextInput
          value={item.remarks || ""}
          onChange={(e) => handleRemarkChange(item.id, e.target.value)}
          placeholder="Add remarks"
          disabled={isAlreadyVerified}
        />
      </td>
    </tr>
  ));

  return (
    <Container
      size="xl"
      style={{
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        // borderLeft: "10px solid #1E90FF",
        backgroundColor: "white",
      }}
    >
      <Paper p="md" radius="md" shadow="sm">
        <Title order={2} mb="lg">
          Verify Grades
        </Title>

        {error && (
          <Alert
            color="red"
            mb="md"
            title="Error"
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert
            color="green"
            mb="md"
            title="Success"
            withCloseButton
            onClose={() => setSuccessMessage(null)}
          >
            {successMessage}
          </Alert>
        )}

        <Grid>
          <Grid.Col xs={12} sm={5}>
            <Select
              label="Course"
              placeholder="Select course"
              value={selectedCourse}
              onChange={(value) => {
                setSelectedCourse(value);
                const courseInfo = courses.find((c) => c.value === value);
                setSelectedCourseName(
                  courseInfo
                    ? `${courseInfo.code} - ${courseInfo.name}`
                    : value,
                );
              }}
              data={courses}
              disabled={loading}
              searchable
              required
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={5}>
            <Select
              label="Academic Year"
              placeholder="Select year"
              value={selectedYear}
              onChange={setSelectedYear}
              data={years}
              disabled={loading}
              required
            />
          </Grid.Col>
          <Grid.Col
            xs={12}
            sm={2}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <Button
              onClick={handleSearch}
              size="md"
              fullWidth
              disabled={!selectedCourse || !selectedYear || loading}
            >
              Search
            </Button>
          </Grid.Col>
        </Grid>

        {showContent && (
          <>
            <ScrollArea mt="lg">
              {registrations.length > 0 ? (
                <Table striped highlightOnHover withBorder captionSide="top">
                  <caption>
                    <Group position="apart">
                      <Text size="lg" weight={500}>
                        {selectedCourseName} - {selectedYear} (
                        {registrations.length} students)
                      </Text>
                      <Badge
                        color={isAlreadyVerified ? "green" : "blue"}
                        size="lg"
                      >
                        {isAlreadyVerified
                          ? "Verified"
                          : "Pending Verification"}
                      </Badge>
                    </Group>
                  </caption>
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Batch</th>
                      <th>Semester</th>
                      <th>Course</th>
                      <th>Grade</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              ) : (
                <Text align="center" color="dimmed" mt="md">
                  No records found
                </Text>
              )}
            </ScrollArea>

            {registrations.length > 0 && (
              <Grid mt="xl">
                <Grid.Col xs={12} md={6}>
                  <Paper p="md" radius="md" shadow="sm" className="statistics">
                    <Text size="lg" weight={500} mb="md">
                      Grade Distribution
                    </Text>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart className="pie-chart">
                        <Pie
                          dataKey="value"
                          data={gradesStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {gradesStats.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.color || COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} students`, "Count"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid.Col>
                <Grid.Col
                  xs={12}
                  md={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    size="lg"
                    onClick={handleVerify}
                    color="blue"
                    disabled={
                      isAlreadyVerified || registrations.length === 0 || loading
                    }
                    loading={loading}
                  >
                    Verify and Download
                  </Button>
                </Grid.Col>
              </Grid>
            )}
          </>
        )}

        <LoadingOverlay visible={loading} overlayBlur={2} />
      </Paper>
    </Container>
  );
}

export default VerifyGrades;
