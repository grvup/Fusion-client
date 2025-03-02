import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Checkbox,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
  Notification,
} from "@mantine/core";
import axios from "axios";
import { fetchAllProgrammes } from "../api/api";

function AdminAddCurriculumForm() {
  const [formData, setFormData] = useState({
    curriculumName: "",
    programme: "",
    workingCurriculum: false,
    versionNo: 1.0,
    numSemesters: 1,
    numCredits: 0,
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [ugData, setUgData] = useState([]);
  const [pgData, setPgData] = useState([]);
  const [phdData, setPhdData] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the auth token
        if (!token) throw new Error("Authorization token not found");

        const response = await fetchAllProgrammes(token);
        console.log(response);

        setUgData(response.ug_programmes || []);
        setPgData(response.pg_programmes || []);
        setPhdData(response.phd_programmes || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Failed to load programs. Please try again.");
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    const payload = {
      curriculum_name: formData.curriculumName,
      programme: formData.programme,
      working_curriculum: formData.workingCurriculum,
      version_no: formData.versionNo,
      no_of_semester: formData.numSemesters,
      num_credits: formData.numCredits,
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is required");
      }
      console.log(token);
      const response = await axios.post(
        "http://127.0.0.1:8000/programme_curriculum/api/admin_add_curriculum/",
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      setNotification({
        message: response.data.message || "Curriculum added successfully!",
        color: "green",
      });
      setFormData({
        curriculumName: "",
        programme: "",
        workingCurriculum: false,
        versionNo: 1.0,
        numSemesters: 1,
        numCredits: 0,
      });
    } catch (err) {
      setNotification({
        message: err.response?.data?.message || "Failed to add curriculum.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const programOptions = [
    ...ugData.map((prog) => ({
      value: `${prog.id}`,
      label: `UG - ${prog.name}`,
    })),
    ...pgData.map((prog) => ({
      value: `${prog.id}`,
      label: `PG - ${prog.name}`,
    })),
    ...phdData.map((prog) => ({
      value: `${prog.id}`,
      label: `PhD - ${prog.name}`,
    })),
  ];

  return (
    <Container size="lg" style={{ marginTop: "2rem" }}>
      <Text
        size="xl"
        weight={700}
        align="center"
        style={{ marginBottom: "2rem" }}
      >
        Add Curriculum Form
      </Text>

      {notification && (
        <Notification
          color={notification.color}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <Stack spacing="lg">
          <TextInput
            label="Curriculum Name"
            placeholder="Enter curriculum name"
            value={formData.curriculumName}
            onChange={(e) => handleChange("curriculumName", e.target.value)}
            required
          />

          <Select
            label="Programme"
            placeholder="Select a programme"
            data={loadingPrograms ? [] : programOptions}
            value={formData.programme}
            onChange={(value) => handleChange("programme", value)}
            required
            disabled={loadingPrograms}
            error={error}
          />

          <Checkbox
            label="Working Curriculum"
            checked={formData.workingCurriculum}
            onChange={(e) =>
              handleChange("workingCurriculum", e.target.checked)
            }
          />

          <NumberInput
            label="Curriculum Version No"
            value={formData.versionNo}
            onChange={(value) => handleChange("versionNo", value)}
            required
            min={0.1}
            precision={1}
          />

          <NumberInput
            label="Number of Semesters"
            value={formData.numSemesters}
            onChange={(value) => handleChange("numSemesters", value)}
            required
            min={1}
          />

          <NumberInput
            label="Number of Credits"
            value={formData.numCredits}
            onChange={(value) => handleChange("numCredits", value)}
            required
            min={0}
          />
        </Stack>

        <Group position="right" mt="lg">
          <Button variant="outline" onClick={() => setFormData({})}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Container>
  );
}

export default AdminAddCurriculumForm;
