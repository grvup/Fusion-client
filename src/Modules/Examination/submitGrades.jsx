import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  TextInput,
  Grid,
  Paper,
  Container,
  Box,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import axios from "axios";
import { get_courses, download_template, upload_grades } from "./routes/examinationRoutes"; // Import API routes
import { FileArrowDown } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
function SubmitGrades() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2021 }, (_, i) =>
    (2022 + i).toString(),
  ); // Generate years dynamically

  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [courseId, setCourseId] = useState(""); // Store course ID instead of code
  const [courseOptions, setCourseOptions] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.user.role);
  // Fetch courses when year is selected
  useEffect(() => {
    if (!year) return;

    const fetchCourses = async () => {
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
          academic_year: year,
        };

        const { data } = await axios.post(get_courses, requestData, {
          headers: { Authorization: `Token ${token}` },
        });

        // **Remove duplicate courses by `id`**
        const uniqueCourses = Array.from(
          new Map(data.courses.map((c) => [c.id, c])).values(),
        );

        // Transform API response into Mantine Select format
        const courseList = uniqueCourses.map((c) => ({
          value: c.id.toString(), // Store ID as value
          label: `${c.name} (${c.code})`, // Show name + code
        }));

        setCourseOptions(courseList);
      } catch (err) {
        setError(`Error fetching courses: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [year]);

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const isFormComplete = () => {
    return course && year && excelFile;
  };

  // Handle course selection
  const handleCourseChange = (selectedId) => {
    setCourseId(selectedId); // Store selected course ID
    setCourse(selectedId); // Set value for Mantine Select
  };

  // Download template function
  const handleTemplateDownload = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found!");
      return;
    }

    if (!courseId || !year) {
      setError("Please select a course and year before downloading.");
      return;
    }

    try {
      setLoading(true);

      const requestData = {
        Role:userRole,
        course: courseId, // Ensure course ID is passed
        year: parseInt(year), // Ensure year is an integer
      };

      const response = await axios.post(download_template, requestData, {
        headers: {
          Authorization: `Token ${token}`,
        },
        responseType: "blob", // Important: Expecting a file in response
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `template_${courseId}_${year}.csv`,
      ); // Set filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setError(null);
    } catch (error) {
      setError(`Error downloading CSV template: ${error.message}`);
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  // **Submit Grades API Call**
  const handleSubmitGrades = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found!");
      return;
    }

    if (!courseId || !year || !excelFile) {
      setError("Please select a course, year, and upload a CSV file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("Role", userRole);
      formData.append("course_id", courseId);
      formData.append("academic_year", year);
      formData.append("csv_file", excelFile);

      const response = await axios.post(upload_grades, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success response
      if (response.data.redirect_url) {
        window.location.href = response.data.redirect_url; // Redirect if needed
      } else {
        alert("Grades uploaded successfully!");
      }

      setError(null);
    } catch (error) {
      setError(`Error uploading grades: ${error.response?.data?.error || error.message}`);
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      size="xl"
      style={{
        borderRadius: "15px",
        padding: "0 20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        // borderLeft: "10px solid #1E90FF",
        backgroundColor: "white",
      }}
    >
      <Paper p="md">
        <h1>Submit Grades</h1>
        {error && <Alert color="red">{error}</Alert>}

        <Grid>
          <Grid.Col xs={12} sm={6}>
            <Select
              label="Academic Year"
              placeholder="Select Year"
              data={years}
              value={year}
              onChange={setYear}
              required
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <Select
              label="Course"
              placeholder={loading ? "Loading courses..." : "Select Course"}
              data={courseOptions}
              value={course}
              onChange={handleCourseChange}
              required
              disabled={!year || loading}
            />
          </Grid.Col>
        </Grid>

        <Box mt="md">
          <TextInput
            type="file"
            label="Upload CSV File"
            onChange={handleFileChange}
            accept=".csv"
            required
          />
        </Box>

        <Box mt="md" className="btn-div">
          <Button
            size="md"
            radius="sm"
            color={isFormComplete() ? "blue" : "gray"}
            disabled={!isFormComplete()}
            loading={loading}
            onClick={handleSubmitGrades}
          >
            Submit
          </Button>
          <Button
            size="md"
            radius="sm"
            leftIcon={<FileArrowDown size={20} />}
            color="green"
            onClick={handleTemplateDownload}
            loading={loading}
          >
            Download Template
          </Button>
        </Box>

        <LoadingOverlay visible={loading} overlayBlur={2} />
      </Paper>
    </Container>
  );
}

export default SubmitGrades;
