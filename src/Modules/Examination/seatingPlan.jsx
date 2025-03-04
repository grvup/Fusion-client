import React, { useState } from "react";
import {
  Button,
  Select,
  Container,
  Text,
  Group,
  Paper,
  Stack,
  SimpleGrid,
  Alert,
} from "@mantine/core";

function SeatingPlan() {
  const [formData, setFormData] = useState({
    title: "",
    shift: "",
    years: "",
    branch: "",
    classroom: "",
  });

  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setError("");
  };

  const validateForm = () => {
    const requiredFields = ["title", "shift", "years", "branch", "classroom"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowResults(true);
  };

  return (
    <Container size="xl" p="md">
      <Stack spacing="lg">
        <Text size="xl" weight={700}>
          Seating Plan
        </Text>

        <Paper shadow="sm" radius="md" p="xl" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack spacing="lg">
              {error && (
                <Alert
                  // eslint-disable-next-line react/jsx-no-undef
                  icon={<AlertCircle size={16} />}
                  title="Error"
                  color="red"
                  variant="filled"
                >
                  {error}
                </Alert>
              )}

              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                <Select
                  label="Title"
                  placeholder="Select Title"
                  data={[
                    { value: "midsem", label: "Mid-Sem" },
                    { value: "endsem", label: "End-Sem" },
                  ]}
                  value={formData.title}
                  onChange={handleChange("title")}
                  required
                />

                <Select
                  label="Shift"
                  placeholder="Select Shift"
                  data={[
                    { value: "morning", label: "Morning" },
                    { value: "afternoon", label: "Afternoon" },
                  ]}
                  value={formData.shift}
                  onChange={handleChange("shift")}
                  required
                />

                <Select
                  label="Branch"
                  placeholder="Select Branch"
                  data={[
                    { value: "cse", label: "CSE" },
                    { value: "ece", label: "ECE" },
                    { value: "me", label: "ME" },
                    { value: "sm", label: "SM" },
                    { value: "bdes", label: "BDES" },
                  ]}
                  value={formData.branch}
                  onChange={handleChange("branch")}
                  required
                />

                <Select
                  label="Years"
                  placeholder="Select Years"
                  data={[
                    { value: "2021", label: "2021" },
                    { value: "2022", label: "2022" },
                    { value: "2023", label: "2023" },
                    { value: "2024", label: "2024" },
                  ]}
                  value={formData.years}
                  onChange={handleChange("years")}
                  required
                />

                <Select
                  label="Classroom"
                  placeholder="Select Classroom"
                  data={[
                    { value: "L102", label: "L102" },
                    { value: "L104", label: "L104" },
                    { value: "L105", label: "L105" },
                    { value: "L106", label: "L106" },
                  ]}
                  value={formData.classroom}
                  onChange={handleChange("classroom")}
                  required
                />
              </SimpleGrid>

              <Group position="right" mt="md">
                <Button type="submit" size="md" onClick={handleSubmit}>
                  Generate Seating Plan
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>

        {showResults && (
          <Paper shadow="sm" radius="md" p="xl" withBorder>
            <Stack spacing="md">
              <Text weight={600} size="lg">
                Selected Options:
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                <Text>Title: {formData.title}</Text>
                <Text>Shift: {formData.shift}</Text>
                <Text>Branch: {formData.branch}</Text>
                <Text>Year: {formData.years}</Text>
                <Text>Classroom: {formData.classroom}</Text>
              </SimpleGrid>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default SeatingPlan;
