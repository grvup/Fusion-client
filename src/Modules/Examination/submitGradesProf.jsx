import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  FileInput,
  Grid,
  Paper,
  Container,
  Box,
  LoadingOverlay,
  Alert,
  Text,
  Group,
  List,
  Title,
} from "@mantine/core";
import axios from "axios";
import {
  submitGradesProf,
  download_template,
  upload_grades_prof,
} from "./routes/examinationRoutes";
import { FileArrowDown, Upload } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
function SubmitGradesProf() {
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const userRole = useSelector((state) => state.user.role);
  // Fetch courses and years from API
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
        const requestData = { Role: userRole };
        const { data } = await axios.post(submitGradesProf, requestData, {
          headers: { Authorization: `Token ${token}` },
        });

        // Format courses for dropdown
        const formattedCourses = data.courses_info.map((course) => ({
          value: course.id.toString(),
          label: `${course.code} - ${course.name}`,
        }));

        // Extract unique years
        const formattedYears = data.working_years.map((y) => ({
          value: y.working_year.toString(),
          label: y.working_year.toString(),
        }));

        setCourseOptions(formattedCourses);
        setYearOptions(formattedYears);
      } catch (err) {
        setError(`Error fetching courses and years: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndYears();
  }, []);

  // Handle file selection
  const handleFileChange = (file) => {
    setExcelFile(file);
  };

  // Ensure form is complete before enabling submit
  const isFormComplete = () => course && year && excelFile;

  // Download template function
  const handleTemplateDownload = async () => {
    if (!course || !year) {
      setError("Please select a course and year before downloading template.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");

      const requestData = { 
        Role: userRole, 
        course, 
        year: parseInt(year) 
      };
      
      const response = await axios.post(download_template, requestData, {
        headers: { Authorization: `Token ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `grade_template_${course}_${year}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSuccess("Template downloaded successfully!");
    } catch (error) {
      setError(`Error downloading template: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmitGrades = async () => {
    if (!isFormComplete()) {
      setError("Please select a course, year, and upload a CSV file.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const token = localStorage.getItem("authToken");

      // Check file type
      if (excelFile.type !== "text/csv" && !excelFile.name.endsWith('.csv')) {
        setError("Please upload a valid CSV file.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("Role", userRole);
      formData.append("csv_file", excelFile);
      formData.append("course_id", course);
      formData.append("academic_year", year);

      const response = await axios.post(upload_grades_prof, formData, {
        headers: { 
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      setSuccess("Grades uploaded successfully! They are now pending verification.");
      // Reset file selection
      setExcelFile(null);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError(`Invalid input: ${error.response.data.error || "Please check your CSV file format."}`);
            break;
          case 403:
            setError("You are not authorized to upload grades for this course.");
            break;
          default:
            setError(`Error uploading grades: ${error.response.data.error || error.message}`);
        }
      } else {
        setError(`Network error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      size="xl"
      style={{
        borderRadius: "5px",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        // borderLeft: "10px solid #1E90FF",
        backgroundColor: "white",
      }}
    >
      <Paper p="md" radius="md" shadow="sm">
        <Title order={2} mb="md">Submit Course Grades</Title>
        
        {error && (
          <Alert >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert color="green" mb="md" withCloseButton onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <Grid>
          <Grid.Col xs={12} sm={6}>
            <Select
              label="Academic Year"
              placeholder="Select Year"
              data={yearOptions}
              value={year}
              onChange={(value) => {
                setYear(value);
                setError(null);
              }}
              required
              disabled={loading}
            />
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <Select
              label="Course"
              placeholder={loading ? "Loading courses..." : "Select Course"}
              data={courseOptions}
              value={course}
              onChange={(value) => {
                setCourse(value);
                setError(null);
              }}
              required
              disabled={loading}
              searchable
            />
          </Grid.Col>
        </Grid>

        <Box mt="md">
          <FileInput
            label="Upload CSV File"
            placeholder="Click to select CSV file"
            onChange={handleFileChange}
            value={excelFile}
            accept=".csv"
            required
            disabled={loading}
            clearable
          />
          <Text size="xs" color="dimmed" mt={5}>
            File must be in CSV format with columns: roll_no, grade, remarks (optional: semester)
          </Text>
        </Box>

        <Box mt="xl">
          <Text size="sm" mb="xs" weight={500}>CSV File Format Requirements:</Text>
          <List size="sm" spacing="xs" center withPadding>
            <List.Item>Required columns: roll_no, grade, remarks</List.Item>
            <List.Item>Optional column: semester (student's current semester will be used if not provided)</List.Item>
            <List.Item>Each student must have a valid roll number and grade</List.Item>
          </List>
        </Box>

        <Group mt="xl" position="apart">
          <Button
            leftIcon={<FileArrowDown size={20} />}
            color="green"
            onClick={handleTemplateDownload}
            loading={loading}
            disabled={!course || !year}
          >
            Download Template
          </Button>
          
          <Button
            leftIcon={<Upload size={20} />}
            color="blue"
            disabled={!isFormComplete()}
            loading={loading}
            onClick={handleSubmitGrades}
          >
            Submit Grades
          </Button>
        </Group>

        <LoadingOverlay visible={loading} overlayBlur={2} />
      </Paper>
    </Container>
  );
}

export default SubmitGradesProf;