import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  FileInput,
  Grid,
  Paper,
  Container,
  ScrollArea,
  Box,
  Table,
  Alert,
  LoadingOverlay
} from "@mantine/core";
import { useSelector } from "react-redux";
import axios from "axios";
import "./styles/submit.css";
import {validate_dean,validate_dean_submit} from "./routes/examinationRoutes"
function ValidateDean() {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [mismatches, setMismatches] = useState([]);
  const [showMismatches, setShowMismatches] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userRole = useSelector((state) => state.user.role);

  useEffect(() => {
    // Fetch courses and academic years when component mounts
    fetchCoursesAndYears();
  }, []);

  const fetchCoursesAndYears = async () => {
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
      const response = await axios.post(
        validate_dean,
        { Role:userRole },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      
      // Format courses for Select component
      const formattedCourses = response.data.courses_info.map(course => ({
        value: course.id.toString(),
        label: `${course.name} - ${course.code}`
      }));
      
      // Format years for Select component
      const formattedYears = response.data.working_years.map(year => ({
        value: year.working_year.toString(),
        label: year.working_year.toString()
      }));
      
      setCourses(formattedCourses);
      setYears(formattedYears);
    } catch (err) {
      console.error("Error fetching courses and years:", err);
      
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to load courses and academic years. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file) => {
    setCsvFile(file);
  };

  const isFormComplete = () => {
    return course && year && csvFile;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setMismatches([]);
    setShowMismatches(false);
    
    try {
      const token = localStorage.getItem("authToken");
      
      // Create form data
      const formData = new FormData();
      formData.append("Role", userRole);
      formData.append("course", course);
      formData.append("year", year);
      formData.append("csv_file", csvFile);
      
      const response = await axios.post(
        validate_dean_submit,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      // If there are mismatches, display them
      if (response.data.mismatches && response.data.mismatches.length > 0) {
        setMismatches(response.data.mismatches);
        setShowMismatches(true);
      } else {
        // If no mismatches were found
        setSuccess("There are no mismatches in the submitted grades.");
      }
    } catch (err) {
      console.error("Error submitting file:", err);
      
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred while validating the grades. Please try again.");
      }
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
        position: "relative"
      }}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      
      <Paper p="md">
        <h1>Validate Grades</h1>
        
        {error && (
          <Alert 
             
            title="Error" 
            color="red" 
            mb="md"
            withCloseButton
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
             
            title="Success" 
            color="green" 
            mb="md"
            withCloseButton
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        <Grid>
          <Grid.Col xs={12} sm={6}>
            <Select
              label="Course"
              placeholder="Select Course"
              data={courses}
              value={course}
              onChange={setCourse}
              required
              searchable
            />
          </Grid.Col>
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
        </Grid>

        <Box mt="md">
          <FileInput
            label="Upload CSV File"
            placeholder="Click to upload CSV file"
            
            value={csvFile}
            onChange={handleFileChange}
            accept=".csv"
            required
            clearable
          />
          <small style={{ color: 'gray' }}>
            File must include columns: roll_no, grade, remarks
          </small>
        </Box>

        <Box mt="md" className="btn-div">
          <Button
            size="sm"
            color={isFormComplete() ? "blue" : "gray"}
            disabled={!isFormComplete()}
            onClick={handleSubmit}
            loading={loading}
          >
            Validate Grades
          </Button>
        </Box>

        {showMismatches && mismatches.length > 0 && (
          <ScrollArea mt="lg">
            <h3>Mismatched Student Grades</h3>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Batch</th>
                  <th>Semester</th>
                  <th>Course ID</th>
                  <th>Grade in DB</th>
                  <th>Grade in CSV</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {mismatches.map((mismatch, index) => (
                  <tr key={index}>
                    <td>{mismatch.roll_no}</td>
                    <td>{mismatch.batch}</td>
                    <td>{mismatch.semester}</td>
                    <td>{mismatch.course_id}</td>
                    <td>{mismatch.db_grade}</td>
                    <td>{mismatch.csv_grade}</td>
                    <td>{mismatch.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        )}
      </Paper>
    </Container>
  );
}

export default ValidateDean;
