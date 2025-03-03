/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import {
  Container,
  Paper,
  Select,
  Button,
  Stack,
  Group,
  Box,
  SimpleGrid,
} from "@mantine/core";
import { FileText } from "@phosphor-icons/react";
import Transcript from "./components/transcript.jsx";

function GenerateTranscript() {
  const [formData, setFormData] = useState({
    program: "",
    batch: "",
    semester: "",
    specialization: "",
  });

  const [showTranscript, setShowTranscript] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTranscript(true);
  };

  const programs = [
    { value: "btech", label: "B.Tech" },
    { value: "bdes", label: "B.Des" },
    { value: "mtech", label: "M.Tech" },
    { value: "mdes", label: "M.Des" },
  ];

  const batches = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => ({
    value: `${i + 1}`,
    label: `Semester ${i + 1}`,
  }));

  const specializations = [
    { value: "cse", label: "CSE" },
    { value: "ece", label: "ECE" },
    { value: "me", label: "ME" },
    { value: "sm", label: "SM" },
    { value: "design", label: "Design" },
  ];

  return (
    <Container size="xl" p={{ base: "md", md: "xl" }}>
      <Stack spacing="xl">
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
                      data={programs}
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
                      data={batches}
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
                      data={semesters}
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
                      data={specializations}
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
                  >
                    Generate Transcript
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Paper>

        {showTranscript && (
          // <Box mt="xl">
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
            <Transcript data={formData} />
          </Paper>

          // </Box>
        )}
      </Stack>
    </Container>
  );
}

export default GenerateTranscript;
