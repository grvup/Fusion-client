import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Select,
  Button,
  Stack,
  Group,
  Box,
  SimpleGrid,
  LoadingOverlay,
} from "@mantine/core";
import { FileText, FileArrowDown } from "@phosphor-icons/react";
import axios from "axios";
import Transcript from "./components/transcript.jsx";
import {
  generate_transcript_form,
  generate_result,
} from "./routes/examinationRoutes.jsx";
import { useSelector } from "react-redux";
function GenerateTranscript() {
  const userRole = useSelector((state) => state.user.role);
  const [formData, setFormData] = useState({
    programme: "",
    batch: "",
    semester: "",
    specialization: "",
  });

  const [formOptions, setFormOptions] = useState({
    programme: [],
    batches: [],
    semesters: [],
    specializations: [],
  });

  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormOptions = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found!");
        return;
      }
      try {
        setLoading(true);
        const { data } = await axios.get(generate_transcript_form, {
          params: {
            role: userRole
          },
          headers: { 
            Authorization: `Token ${token}` 
          }
        });
        

        // Remove duplicates
        const uniqueprogramme = [...new Set(data.programmes || [])];
        const uniqueBatches = [...new Set(data.batches || [])];
        const uniqueSpecializations = [
          ...new Set((data.specializations || []).map((spec) => spec.trim())),
        ];

        // Transform the backend data format into Mantine Select format
        setFormOptions({
          programme: uniqueprogramme.map((prog) => ({
            value: prog,
            label: prog,
          })),
          batches: uniqueBatches.map((batch) => ({
            value: batch.toString(),
            label: batch.toString(),
          })),
          // Generate semesters 1-8 since they're not provided by the backend
          semesters: Array.from({ length: 8 }, (_, i) => ({
            value: (i + 1).toString(),
            label: `Semester ${i + 1}`,
          })),
          specializations: uniqueSpecializations.map((spec) => ({
            value: spec,
            label: spec,
          })),
        });
      } catch (e) {
        setError("Error fetching form options: " + e.message);
        console.error("Error fetching form options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormOptions();
  }, []);

  const handleChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]:
        field === "batch" || field === "semester" ? parseInt(value) : value,
    });
    setShowTranscript(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found!");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting Data:", formData);
      const requestData = {
        Role: userRole
      }
      const combinedData = {
        ...requestData,
        ...formData
      };
      const { data } = await axios.post(generate_transcript_form, combinedData, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(data);
      setTranscriptData(data);
      setShowTranscript(true);
      setError(null);
    } catch (error) {
      setError("Error generating transcript: " + error.message);
      console.error("Error generating transcript:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadCSV = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found!");
      return;
    }

    try {
      setLoading(true);

      const requestData = {
        Role: userRole,
        semester: formData.semester,
        specialization: formData.specialization,
        batch: formData.batch,
      };

      const response = await axios.post(generate_result, requestData, {
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
        `transcript_${formData.batch}_sem${formData.semester}.xlsx`,
      ); // Set filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setError(null);
    } catch (error) {
      setError(`Error downloading CSV transcript: ${error.message}`);
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container size="xl" p={{ base: "md", md: "xl" }}>
      <Stack spacing="xl" pos="relative">
        <LoadingOverlay visible={loading} overlayBlur={2} />

        {error && (
          <Paper p="md" color="red" radius="sm" withBorder>
            {error}
          </Paper>
        )}

        <Paper
          shadow="sm"
          radius="sm"
          p={{ base: "md", md: "xl" }}
          withBorder
          style={{
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            // borderLeft: "10px solid #1E90FF",
          }}
        >
          <Stack spacing="lg">
            <h1>Transcript Details</h1>

            <form onSubmit={handleSubmit}>
              <Stack spacing="xl">
                <SimpleGrid
                  cols={{ base: 1, sm: 2, lg: 4 }}
                  spacing={{ base: "md", md: "lg" }}
                >
                  <Box>
                    <Select
                      label="Program"
                      placeholder="Select Program"
                      data={formOptions.programme}
                      value={formData.programme}
                      onChange={handleChange("programme")}
                      styles={{
                        label: { marginBottom: "0.5rem", fontWeight: 500 },
                      }}
                      radius="sm"
                    />
                  </Box>

                  <Box>
                    <Select
                      label="Batch"
                      placeholder="Select Batch"
                      data={formOptions.batches}
                      value={formData.batch?.toString()}
                      onChange={handleChange("batch")}
                      styles={{
                        label: { marginBottom: "0.5rem", fontWeight: 500 },
                      }}
                      radius="sm"
                    />
                  </Box>

                  <Box>
                    <Select
                      label="Semester"
                      placeholder="Select Semester"
                      data={formOptions.semesters}
                      value={formData.semester?.toString()}
                      onChange={handleChange("semester")}
                      styles={{
                        label: { marginBottom: "0.5rem", fontWeight: 500 },
                      }}
                      radius="sm"
                    />
                  </Box>

                  <Box>
                    <Select
                      label="Specialization"
                      placeholder="Select Specialization"
                      data={formOptions.specializations}
                      value={formData.specialization}
                      onChange={handleChange("specialization")}
                      styles={{
                        label: { marginBottom: "0.5rem", fontWeight: 500 },
                      }}
                      radius="sm"
                    />
                  </Box>
                </SimpleGrid>

                <Group position="right">
                  <Button
                    type="submit"
                    size="md"
                    radius="sm"
                    leftIcon={<FileText size={20} />}
                    loading={loading}
                  >
                    Generate Transcript
                  </Button>

                  <Button
                    size="md"
                    radius="sm"
                    leftIcon={<FileArrowDown size={20} />}
                    color="green"
                    onClick={handleDownloadCSV}
                    loading={loading}
                  >
                    Download CSV Transcript
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Paper>

        {showTranscript && (
          <Paper
            shadow="sm"
            radius="sm"
            p={{ base: "md", md: "xl" }}
            withBorder
            style={{
              border: "1px solid #ccc",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
              borderLeft: "10px solid #1E90FF",
            }}
          >
            <Transcript data={transcriptData} semester={formData.semester} />
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default GenerateTranscript;
