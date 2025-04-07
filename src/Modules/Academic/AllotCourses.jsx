/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Alert,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
  Loader,
} from "@mantine/core";
import { IconUpload, IconFileSpreadsheet } from "@tabler/icons-react";
import axios from "axios";
import { allotCoursesRoute, batchesRoute } from "../../routes/academicRoutes";

function AllotCourses() {
  // Default hardcoded options for demonstration

  // State for API driven options, falling back to hardcoded defaults
  const [programmeOptions, setProgrammeOptions] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [programme, setProgramme] = useState("");
  const [semester, setSemester] = useState("");
  const [workingYear, setWorkingYear] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  // useEffect to fetch options from API. Replace the URLs with your actual endpoints.
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false); // Stop loading
        return;
      }
      try {
        const response = await axios.get(batchesRoute, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Fetched Batches:", response.data);
        setProgrammeOptions(response.data.batches);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOptions();
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowSuccess(false);
    }
  };

  const handleUpload = async () => {
    // Check if all dropdown fields have been filled
    if (!programme || !semester || !workingYear) {
      alert("Please fill out all dropdown fields before uploading.");
      return;
    }
    setIsUploading(true);
    setLoading(true); // Start loading
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      return;
    }
    const formData = new FormData();
    formData.append("allotedCourses", selectedFile);
    formData.append("batch", programme);
    formData.append("semester", semester);
    formData.append("working_year", workingYear);
    try {
      const response = await axios.post(allotCoursesRoute, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
      console.log(response);
      setShowSuccess(true);
      setSelectedFile(null);
    } catch (fetchError) {
      console.error(fetchError);
      if (fetchError.response) {
        // If a response is available, set the error based on the response from the server
        setError(
          fetchError.response.data.error ||
            fetchError.response.data.message ||
            "An error occurred",
        );
      } else {
        // If no response is available, it's a network error or client-side error
        setError(fetchError.message);
        setSelectedFile(null);
      }
    } finally {
      setIsUploading(false);
      setLoading(false); // Stop loading
      setSelectedFile(null);
    }
  };

  // Validate that all required fields are selected
  const isFormValid = selectedFile && programme && semester && workingYear;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", width: "100%", color: "#3B82F6" }}
      >
        Allot Student Courses
      </Text>

      <div style={{ marginBottom: "0.5rem" }}>
        <Text
          size="md"
          weight={700}
          style={{ color: "#003366", marginBottom: "6px" }}
        >
          Note: Provide the data in Excel Sheet in following format:
        </Text>
        <Text size="sm" color="dimmed" style={{ marginBottom: "10px" }}>
          RollNo | CourseSlot Name | CourseCode | CourseName
        </Text>
        <Text size="md" weight={700} style={{ color: "#000000" }}>
          <a
            href="/sample.xlsx"
            download
            style={{
              color: "#3B82F6",
              textDecoration: "underline",
            }}
          >
            Download the sample excel sheet
          </a>
          , fill the data accordingly and then upload the same:
        </Text>
      </div>

      {/* Vertical dropdowns */}
      <Stack spacing="md" mb="xl">
        <Select
          label="Programme"
          placeholder="Select Batch"
          value={programme}
          onChange={(val) => setProgramme(val)}
          data={
            programmeOptions
              ? programmeOptions.map((bat) => ({
                  value: bat.batch_id.toString(),
                  label: `${bat.name} ${bat.discipline} ${bat.year}`,
                }))
              : []
          }
          searchable
          style={{ width: 500 }}
        />
        <TextInput
          label="Semester"
          placeholder="Select Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={{ width: 300 }}
        />
        <TextInput
          label="Working Year"
          placeholder="Select Working Year"
          value={workingYear}
          onChange={(e) => setWorkingYear(e.target.value)}
          style={{ width: 300 }}
        />
      </Stack>

      <div
        style={{
          border: "2px dashed #ced4da",
          borderRadius: "8px",
          padding: "2rem",
          textAlign: "center",
          position: "relative",
          backgroundColor: "#f8f9fa",
        }}
      >
        <LoadingOverlay visible={isUploading} />
        <input
          type="file"
          id="file-upload"
          accept=".xlsx,.xls,.csv"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        {/* Always show the Choose File button */}
        <label htmlFor="file-upload">
          <Button
            leftIcon={<IconUpload size="1rem" />}
            variant="outline"
            component="span"
            style={{ borderColor: "#3B82F6", color: "#3B82F6" }}
          >
            Choose File
          </Button>
        </label>

        {selectedFile ? (
          <>
            <div style={{ marginTop: "1rem" }}>
              <IconFileSpreadsheet color="#2b8a3e" size="2.2rem" />
              <Text size="sm" color="dimmed" mt={4}>
                {selectedFile.name}
              </Text>
            </div>
            {/* When a file is selected, show the Upload button below */}
            <Button
              leftIcon={<IconUpload size="1rem" />}
              style={{
                marginTop: "1rem",
                backgroundColor: "#3B82F6",
                color: "#fff",
              }}
              onClick={handleUpload}
              disabled={!isFormValid || isUploading}
            >
              Upload
            </Button>
          </>
        ) : (
          <Button
            leftIcon={<IconUpload size="1rem" />}
            style={{
              marginLeft: "1rem",
              backgroundColor: "#3B82F6",
              color: "#fff",
            }}
            onClick={handleUpload}
            disabled={!isFormValid || isUploading}
          >
            Upload
          </Button>
        )}
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Loader variant="dots" />
        </div>
      )}

      {showSuccess && (
        <Alert
          mt="xl"
          title="Upload Successful"
          color="green"
          withCloseButton
          onClose={() => setShowSuccess(false)}
        >
          Student courses have been successfully allotted based on the uploaded
          file.
        </Alert>
      )}
      {error && (
        <Alert
          mt="xl"
          title="Error"
          color="red"
          withCloseButton
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}
    </Card>
  );
}

export default AllotCourses;
