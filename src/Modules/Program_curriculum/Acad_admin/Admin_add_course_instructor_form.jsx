import React, { useEffect, useState } from "react";
import {
  Select,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
  Flex,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { fetchAllCourses, fetchFacultiesData } from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_add_course_instructor() {
  const [activeSection, setActiveSection] = useState("manual");
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

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
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication not found");
        }
        const response = await fetchAllCourses();
        // console.log(response);

        const courseList = response.map((course) => ({
          id: course.id,
          name: `${course.name} (${course.code})`,
        }));
        setCourses(courseList);
        console.log("Course data: ", courseList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchFaculties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication not found");
        }

        const response = await fetchFacultiesData();
        console.log(response);

        const facultyList = response.map((faculty) => ({
          id: faculty.id,
          name: `${faculty.faculty_first_name} ${faculty.faculty_last_name}`,
        }));

        setFaculties(facultyList);
        console.log("Faculty data: ", faculties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
    fetchFaculties();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    const token = localStorage.getItem("authToken");
  
    const apiUrl = `${host}/programme_curriculum/api/admin_add_course_instructor/`;

    const payload = {
      course_id: values.courseName, // Removed `_id`
      instructor_id: values.instructor, // Removed `_id`
      year: values.year,
      semester_no: values.semester,
      form_submit: true, // Add this if needed on the backend
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { Authorization: `Token ${token}`,"Content-Type": "application/json", },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Course Instructor added successfully!");
        navigate("/programme_curriculum/admin_course_instructor");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        alert("Failed to add course instructor.");
      }
    } catch (error) {
      console.error("Error adding course instructor:", error);
      alert("Failed to add course instructor.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }
  
    // Validate file type
    if (!file.name.match(/\.(xls|xlsx)$/i)) {
      alert("Only Excel files (.xls, .xlsx) are allowed.");
      return;
    }
  
    setIsUploading(true);
    const token = localStorage.getItem("authToken");
    const apiUrl = `${host}/programme_curriculum/api/admin_add_course_instructor/`;
    
    try {
      const formData = new FormData();
      formData.append("manual_instructor_xsl", file);
      formData.append("excel_submit", "true");
  
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${token}`, // Required for Django CSRF
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.success || "File processed successfully!");
        navigate("/programme_curriculum/admin_course_instructor");
      }
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

  
      setUploadedFile(file);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };
  const handleCancel = () => {
    setFile(null);
    setUploadedFile(null);
  };

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
          <div style={{ flex: 4 }}>
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
                Course Instructor Form
              </Text>

              <Flex justify="flex-start" align="center" mb={10}>
                <Button
                  variant={activeSection === "manual" ? "filled" : "outline"}
                  onClick={() => setActiveSection("manual")}
                  style={{ marginRight: "10px" }}
                >
                  Manual Form
                </Button>
                <Button
                  variant={activeSection === "excel" ? "filled" : "outline"}
                  onClick={() => setActiveSection("excel")}
                  style={{ marginRight: "10px" }}
                >
                  Upload via Excel
                </Button>
              </Flex>

              <Stack spacing="lg">
                {activeSection === "manual" ? (
                  <>
                    <Select
                      label="Select Course"
                      placeholder="-- Select Course Name --"
                      data={courses.map((course) => ({
                        label: `${course.name}`,
                        value: String(course.id),
                      }))}
                      value={form.values.courseName}
                      onChange={(value) =>
                        form.setFieldValue("courseName", value)
                      }
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
                      onChange={(value) =>
                        form.setFieldValue("instructor", value)
                      }
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
                      onChange={(value) =>
                        form.setFieldValue("semester", value)
                      }
                      required
                      searchable
                    />

                    <Group position="right" mt="lg">
                      <Button variant="outline" className="cancel-btn">
                        Cancel
                      </Button>
                      <Button type="submit" className="submit-btn">
                        Submit
                      </Button>
                    </Group>
                  </>
                ) : (
                  <>
                    <Text size="xl" weight={700}>
                      Upload Course Instructors via Excel
                    </Text>

                    <Group spacing="sm" mb="md">
                      <FileInput
                        label="Choose File"
                        placeholder="No file chosen"
                        onChange={setFile}
                        disabled={uploadedFile !== null}
                        style={{
                          width: "250px", // Set a fixed width
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const sampleData = [
                            ['Course Code', 'Course Version','Instructor Id', 'Year', 'Semester no'],
                            ['NS205i', '1', 'amitv', '2023', '5'],
                            ['CS3010', '1', 'atul', '2023', '5'],
                          ];
                          
                          const ws = XLSX.utils.aoa_to_sheet(sampleData);
                          const wb = XLSX.utils.book_new();
                          XLSX.utils.book_append_sheet(wb, ws, "Instructors");
                          XLSX.writeFile(wb, 'instructors_sample.xls', { bookType: 'biff8' });
                        }}
                        style={{ marginTop: '24px' }}
                      >
                        Download Sample
                      </Button>
                    </Group>

                    <Group position="right" mt="lg">
                      <Button
                        variant="outline"
                        className="cancel-btn"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>

                    
                        <Button
                          onClick={handleUpload}
                          variant="filled"
                          color="blue"
                          disabled={isUploading || !file}
                        >
                          {isUploading ? "Uploading..." : "Upload"}
                        </Button>
              
                    </Group>
                  </>
                )}
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

export default Admin_add_course_instructor;
