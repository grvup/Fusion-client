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
import { FileText } from "@phosphor-icons/react";
import axios from "axios";
import Transcript from "./components/transcript.jsx";
import { generate_transcript_form } from "./routes/examinationRoutes.jsx";

function GenerateTranscript() {
  const [formData, setFormData] = useState({
    program: "",
    batch: "",
    semester: "",
    specialization: "",
  });

  const [formOptions, setFormOptions] = useState({
    programs: [],
    batches: [],
    semesters: [],
    specializations: [],
  });

  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch form options
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
          headers: { Authorization: `Token ${token}` },
        });
        // Transform the received data into the format expected by Mantine Select
        console.log(data);
        setFormOptions({
          programs: data.programs.map((prog) => ({
            value: prog.value,
            label: prog.label,
          })),
          batches: data.batches.map((batch) => ({
            value: batch.value,
            label: batch.label,
          })),
          semesters: data.semesters.map((sem) => ({
            value: sem.value,
            label: sem.label,
          })),
          specializations: data.specializations.map((spec) => ({
            value: spec.value,
            label: spec.label,
          })),
        });
      } catch (error) {
        setError("Error fetching form options: " + error.message);
        console.error("Error fetching form options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormOptions();
  }, []);

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
    // Reset transcript view when form data changes
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
      const { data } = await axios.post(generate_transcript_form, formData, {
        headers: { Authorization: `Token ${token}` },
      });

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
            borderLeft: "10px solid #1E90FF",
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
                      data={formOptions.programs}
                      value={formData.program}
                      onChange={handleChange("program")}
                      styles={{
                        label: {
                          marginBottom: "0.5rem",
                          fontWeight: 500,
                        },
                      }}
                      radius="sm"
                    />
                  </Box>

                  <Box>
                    <Select
                      label="Batch"
                      placeholder="Select Batch"
                      data={formOptions.batches}
                      value={formData.batch}
                      onChange={handleChange("batch")}
                      styles={{
                        label: {
                          marginBottom: "0.5rem",
                          fontWeight: 500,
                        },
                      }}
                      radius="sm"
                    />
                  </Box>

                  <Box>
                    <Select
                      label="Semester"
                      placeholder="Select Semester"
                      data={formOptions.semesters}
                      value={formData.semester}
                      onChange={handleChange("semester")}
                      styles={{
                        label: {
                          marginBottom: "0.5rem",
                          fontWeight: 500,
                        },
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
                        label: {
                          marginBottom: "0.5rem",
                          fontWeight: 500,
                        },
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
            <Transcript data={transcriptData} />
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default GenerateTranscript;
