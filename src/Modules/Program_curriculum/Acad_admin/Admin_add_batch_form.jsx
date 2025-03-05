import React, { useEffect, useState } from "react";
import {
  Select,
  NumberInput,
  Checkbox,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  fetchDisciplines,
  fetchBatchName,
  fetchGetUnlinkedCurriculum,
} from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_add_batch_form() {
  const [batchNames, setBatchNames] = useState([]); // State for batch names
  const [disciplines, setDisciplines] = useState([]); // State for disciplines
  const [unlinkedCurriculums, setUnlinkedCurriculums] = useState([]); // State for unlinked curriculums
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const form = useForm({
    initialValues: {
      batchName: "",
      discipline: "",
      batchYear: 2024,
      disciplineBatch: "",
      runningBatch: false,
    },
  });
  console.log(form.values);

  // Fetch batch names and disciplines on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch batch names
        const batchData = await fetchBatchName();
        setBatchNames(batchData.choices); // Use the 'choices' array from the API response

        // Fetch disciplines
        const disciplineData = await fetchDisciplines();
        setDisciplines(disciplineData);

        const unlinkedCurriculumData = await fetchGetUnlinkedCurriculum();
        setUnlinkedCurriculums(unlinkedCurriculumData);
      } catch (err) {
        setError("Failed to load data."); // Handle errors
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    loadData(); // Fetch data on component mount
  }, []);

  const handleSubmit = async () => {
    try {
      localStorage.setItem("AdminBatchesCachechange", "true");
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is required");
      }
      const payload = {
        batch_name: form.values.batchName,
        discipline: form.values.discipline,
        batchYear: form.values.batchYear,
        disciplineBatch: form.values.disciplineBatch,
        runningBatch: form.values.runningBatch,
      };
      console.log(payload);
      const response = await axios.post(
        `${host}/programme_curriculum/api/admin_add_batch/`,
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response);
      if (response.data.message) {
        alert("Batch added successfully!");
        window.location.href = "/programme_curriculum/admin_batches/"; // Redirect to batches page
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add batch");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  // // Function to get CSRF token from cookies
  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

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
              <Stack spacing="lg">
                <Text size="xl" weight={700} align="center">
                  Batch Form
                </Text>

                {/* Batch Name Dropdown */}
                <Select
                  label="Batch Name"
                  placeholder="-- Select Batch Name --"
                  data={batchNames} // Use the batchNames state directly
                  value={form.values.batchName}
                  onChange={(value) => form.setFieldValue("batchName", value)}
                  required
                />

                {/* Discipline Dropdown */}
                <Select
                  label="Select Discipline"
                  placeholder="-- Select Discipline --"
                  data={disciplines.map((discipline) => ({
                    value: discipline.id.toString(),
                    label: discipline.name,
                  }))}
                  value={form.values.discipline}
                  onChange={(value) => form.setFieldValue("discipline", value)}
                  required
                />

                <NumberInput
                  label="Batch Year"
                  defaultValue={2024}
                  value={form.values.batchYear}
                  onChange={(value) => form.setFieldValue("batchYear", value)}
                  required
                />

                <Select
                  label="Select Curriculum for Batch"
                  placeholder="-- Select Curriculum for Batch Students --"
                  data={unlinkedCurriculums.map((curriculum) => ({
                    value: curriculum.id.toString(), // Convert the ID to a string
                    label: curriculum.name, // Use the curriculum name as the label
                  }))}
                  value={form.values.disciplineBatch}
                  onChange={(value) =>
                    form.setFieldValue("disciplineBatch", value)
                  }
                  required
                />

                <Checkbox
                  label="Running Batch"
                  checked={form.values.runningBatch}
                  onChange={(event) =>
                    form.setFieldValue(
                      "runningBatch",
                      event.currentTarget.checked,
                    )
                  }
                />
              </Stack>

              <Group position="right" mt="lg">
                <Button variant="outline" className="cancel-btn">
                  Cancel
                </Button>
                <Button type="submit" className="submit-btn">
                  Submit
                </Button>
              </Group>
            </form>
          </div>

          {/* Right Panel Buttons */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Group spacing="md" direction="column" style={{ width: "100%" }}>
              <Link
                href="/programme_curriculum/acad_admin_add_curriculum_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="right-btn-batch">Add Curriculum</Button>
              </Link>
              <Link
                href="/programme_curriculum/acad_admin_add_batch_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="right-btn-batch">Add Another Batch</Button>
              </Link>
              <Link
                to="/programme_curriculum/acad_admin_add_discipline_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="right-btn-batch">Add Discipline</Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>

      <style>{`
        .right-btn-batch{
          width:15vw;
        }
      `}</style>
    </div>
  );
}

export default Admin_add_batch_form;
