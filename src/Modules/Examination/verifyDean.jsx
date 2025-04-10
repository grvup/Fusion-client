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
  Switch, // Import Switch component
} from "@mantine/core";
import axios from "axios";
import {
  verify_grades_dean,
  update_enter_grades_dean,
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

// Define possible grade options for the dropdown
const GRADE_OPTIONS = ["O","A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"].map(
  (grade) => ({
    value: grade,
    label: grade,
  }),
);

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
  // State for the resubmission toggle
  const [allowResubmission, setAllowResubmission] = useState(false);

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
          Role: userRole,
        };

        const { data } = await axios.post(verify_grades_dean, requestData, {
          headers: { Authorization: `Token ${token}` },
        });

        const formattedCourses = data.courses_info.map((c) => ({
          value: c.id.toString(),
          label: `${c.code} - ${c.name}`,
          code: c.code,
          name: c.name,
        }));

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
  }, [userRole]); // Added userRole dependency

  // Function to calculate grade statistics
  const calculateGradeStats = (regs) => {
    const gradeCount = {};
    regs.forEach((reg) => {
      gradeCount[reg.grade] = (gradeCount[reg.grade] || 0) + 1;
    });
    return Object.keys(gradeCount).map((grade) => ({
      name: grade,
      value: gradeCount[grade],
      color: GRADE_COLORS[grade] || "#9e9e9e",
    }));
  };

  const handleSearch = async () => {
    if (!selectedCourse || !selectedYear) {
      setError("Please select a course and year.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setIsAlreadyVerified(false);
    setAllowResubmission(false); // Reset toggle on new search
    setShowContent(false); // Hide content initially

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

      const response = await axios.post(update_enter_grades_dean, requestData, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.data.message === "This course is already verified.") {
        setIsAlreadyVerified(true);
        setSuccessMessage("This course is already verified");
        setRegistrations([]); // Clear any previous registration data
      } else if (response.data.registrations) {
        const initialRegistrations = response.data.registrations.map((reg) => ({
            ...reg,
            remarks: reg.remarks || "", // Ensure remarks is always a string
        }));
        setRegistrations(initialRegistrations);
        setGradesStats(calculateGradeStats(initialRegistrations));
        setShowContent(true); // Show content only if registrations are found

        const courseInfo = courses.find((c) => c.value === selectedCourse);
        setSelectedCourseName(
          courseInfo
            ? `${courseInfo.code} - ${courseInfo.name}`
            : selectedCourse,
        );
        setIsAlreadyVerified(false); // Explicitly set to false if data is fetched
      } else {
         // Handle cases where the response is unexpected but not an error
         setError("Received an unexpected response from the server.");
         setRegistrations([]);
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
              `Error fetching grades: ${err.response.data?.error || err.message}`,
            );
        }
      } else {
        setError(`Network error: ${err.message}`);
      }
      setRegistrations([]); // Clear registrations on error
    } finally {
      setLoading(false);
    }
  };

  // --- Handler for Grade Change ---
  const handleGradeChange = (id, newGrade) => {
    const updatedRegistrations = registrations.map((reg) =>
      reg.id === id ? { ...reg, grade: newGrade } : reg,
    );
    setRegistrations(updatedRegistrations);
    // Recalculate stats when a grade changes
    setGradesStats(calculateGradeStats(updatedRegistrations));
  };

  // --- Handler for Remark Change ---
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
      const studentIds = registrations.map((reg) => reg.roll_no);
      const semesterIds = registrations.map((reg) => reg.semester);
      const courseIds = registrations.map((reg) => reg.course_id_id);
      // Ensure grades sent are the potentially modified ones from the state
      const grades = registrations.map((reg) => reg.grade);
      // Get remarks from the potentially modified state
      const remarks = registrations.map((reg) => reg.remarks);

      // Use the state of the toggle directly
      const resubmissionStatus = allowResubmission ? "YES" : "NO";

      const requestData = {
        Role: userRole, // Assuming 'acadadmin' is the role needed for moderation API
        student_ids: studentIds,
        semester_ids: semesterIds,
        course_ids: courseIds,
        grades: grades,
        remarks: remarks, // Include remarks in the request
        allow_resubmission: resubmissionStatus, // Send based on toggle state
      };

      const response = await axios.post(moderate_student_grades, requestData, {
        headers: { Authorization: `Token ${token}` },
        responseType: "blob",
      });

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
      setIsAlreadyVerified(true); // Set as verified after successful operation
      setShowContent(false); // Optionally hide the table after verification
    } catch (err) {
         if (err.response) {
             // Attempt to parse JSON error from blob response if verification fails
             try {
                 const errorJson = JSON.parse(await err.response.data.text());
                 switch (err.response.status) {
                     case 403:
                         setError("Access denied. You don't have permission to verify grades.");
                         break;
                     case 400:
                         setError(errorJson.error || "Invalid data provided.");
                         break;
                     default:
                         setError(`Error verifying grades: ${errorJson.error || `Status ${err.response.status}`}`);
                 }
             } catch (parseError) {
                 // Fallback if response is not JSON
                 setError(`Error verifying grades: ${err.message}`);
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
        {/* --- Editable Grade Select Dropdown --- */}
        <Select
          value={item.grade}
          onChange={(value) => handleGradeChange(item.id, value)}
          data={GRADE_OPTIONS}
          disabled={isAlreadyVerified || loading}
          size="xs" // Adjust size if needed
          withinPortal // Helps with potential z-index issues in tables
        />
      </td>
      <td>
        <TextInput
          value={item.remarks || ""} // Ensure value is controlled
          onChange={(e) => handleRemarkChange(item.id, e.target.value)}
          placeholder="Add remarks"
          disabled={isAlreadyVerified || loading}
          size="xs" // Adjust size if needed
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
      <Paper p="md" radius="md" shadow="sm" style={{ position: 'relative' }}> {/* Added relative positioning for overlay */}
        <LoadingOverlay visible={loading} overlayBlur={2} /> {/* Moved overlay here */}
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

        <Grid mb="md"> {/* Added margin-bottom */}
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
                setShowContent(false); // Hide details when course changes
                setRegistrations([]); // Clear old data
                setIsAlreadyVerified(false); // Reset verification status
              }}
              data={courses}
              disabled={loading}
              searchable
              required
              clearable // Optional: Allow clearing selection
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={5}>
            <Select
              label="Academic Year"
              placeholder="Select year"
              value={selectedYear}
              onChange={(value) => {
                  setSelectedYear(value);
                  setShowContent(false); // Hide details when year changes
                  setRegistrations([]); // Clear old data
                  setIsAlreadyVerified(false); // Reset verification status
              }}
              data={years}
              disabled={loading}
              required
              clearable // Optional: Allow clearing selection
            />
          </Grid.Col>
          <Grid.Col
            xs={12}
            sm={2}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <Button
              onClick={handleSearch}
              size="md" // Consistent button size
              fullWidth
              disabled={!selectedCourse || !selectedYear || loading}
            >
              Search
            </Button>
          </Grid.Col>
        </Grid>

        {/* Only show content area if showContent is true */}
        {showContent && registrations.length > 0 && (
          <>
            <ScrollArea mt="lg">
              <Table striped highlightOnHover withBorder captionSide="top" >
                <caption>
                  <Group position="apart">
                    <Text size="lg" weight={500}>
                      {selectedCourseName} - {selectedYear} (
                      {registrations.length} students)
                    </Text>
                    <Badge
                      color={isAlreadyVerified ? "green" : "blue"}
                      size="lg"
                      variant="filled"
                    >
                      {isAlreadyVerified ? "Verified" : "Pending Verification"}
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
            </ScrollArea>

            <Grid mt="xl" align="flex-end"> {/* Align items to bottom */}
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
                            fill={entry.color || COLORS[index % COLORS.length]}
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
              >
                 <Group position="right" direction="column" spacing="md"> {/* Group button and switch */}
                    <Switch
                       label="Allow Resubmission"
                       checked={allowResubmission}
                       onChange={(event) => setAllowResubmission(event.currentTarget.checked)}
                       disabled={isAlreadyVerified || loading}
                       size="md"
                    />
                    <Button
                      size="lg"
                      onClick={handleVerify}
                      color="blue"
                      disabled={isAlreadyVerified || loading} // Disable only based on verification status and loading
                      loading={loading && !successMessage} // Show loading state on button during verification
                    >
                      Verify and Download
                    </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </>
        )}
         {/* Show message if content should be shown but no registrations */}
         {showContent && registrations.length === 0 && !isAlreadyVerified && (
              <Text align="center" color="dimmed" mt="xl">
                  No student records found for this selection.
              </Text>
         )}

        {/* Keep LoadingOverlay outside conditional rendering if it should cover everything */}
        {/* <LoadingOverlay visible={loading} overlayBlur={2} /> */}
      </Paper>
    </Container>
  );
}

export default VerifyGrades;
