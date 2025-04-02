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
import { useNavigate, useSearchParams } from "react-router-dom"; // For handling URL parameters and navigation
import {
  fetchDisciplines,
  fetchBatchName,
  fetchGetUnlinkedCurriculum,
  fetchBatchData, // Add this function to fetch batch data by ID
} from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_edit_batch_form() {
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch"); // Get the batch ID from the URL
  const curriculumId = searchParams.get("curriculum_id");
  const navigate = useNavigate(); // For navigation after form submission
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

  // Fetch batch names, disciplines, unlinked curriculums, and existing batch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch batch names
        const batchData = await fetchBatchName();
        setBatchNames(batchData.choices);

        // Fetch disciplines
        const disciplineData = await fetchDisciplines();
        setDisciplines(disciplineData);

        // Fetch unlinked curriculums
        const unlinkedCurriculumData = await fetchGetUnlinkedCurriculum();
        setUnlinkedCurriculums(unlinkedCurriculumData);
        console.log(unlinkedCurriculums);
        // Fetch existing batch data
        const existingBatchData = await fetchBatchData(batchId);
        console.log(existingBatchData.curriculum);
        if (existingBatchData.curriculum) {
          setUnlinkedCurriculums((prevUnlinkedCurriculums) => [
            ...prevUnlinkedCurriculums,
            ...existingBatchData.curriculum.map((curriculum) => curriculum),
          ]);
        }
        console.log(unlinkedCurriculums);
        form.setValues({
          batchName: existingBatchData.batch.name,
          discipline: existingBatchData.batch.discipline.toString(),
          batchYear: existingBatchData.batch.year,
          disciplineBatch: existingBatchData.batch.curriculum_id
            ? existingBatchData.batch.curriculum_id.toString()
            : curriculumId || "",
          runningBatch: existingBatchData.batch.running_batch,
        });
      } catch (err) {
        setError("Failed to load data."); // Handle errors
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    loadData(); // Fetch data on component mount
  }, [batchId]);
  console.log(unlinkedCurriculums);

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
        disciplineBatch: form.values.disciplineBatch || "", // Send empty string if no curriculum is selected
        runningBatch: form.values.runningBatch,
      };
      console.log(payload);
      const response = await axios.put(
        `${host}/programme_curriculum/api/admin_edit_batch/${batchId}/`, // Use PUT request for editing
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response);
      if (response.data.message) {
        alert("Batch updated successfully!");
        navigate("/programme_curriculum/admin_batches/"); // Redirect to batches page
      } else {
        throw new Error(response.data.message || "Failed to update batch");
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
                  Edit Batch Form
                </Text>

                {/* Batch Name Dropdown */}
                <Select
                  label="Batch Name"
                  placeholder="-- Select Batch Name --"
                  data={batchNames}
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
                  value={form.values.batchYear}
                  onChange={(value) => form.setFieldValue("batchYear", value)}
                  required
                />

                <Select
                  label="Select Curriculum for Batch"
                  placeholder="-- Select Curriculum for Batch Students --"
                  data={unlinkedCurriculums.map((curriculum) => ({
                    value: curriculum.id.toString(),
                    label: `${curriculum.name} - v${curriculum.version}`,
                  }))}
                  value={form.values.disciplineBatch}
                  onChange={(value) =>
                    form.setFieldValue("disciplineBatch", value)
                  }
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
                <Button
                  variant="outline"
                  className="cancel-btn"
                  onClick={() =>
                    navigate("/programme_curriculum/admin_batches/")
                  }
                >
                  Cancel
                </Button>
                <Button type="submit" className="submit-btn">
                  Update
                </Button>
              </Group>
            </form>
          </div>

          {/* Right Panel Buttons */}
          {/* <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Group spacing="md" direction="column" style={{ width: "100%" }}>
              <Link
                to="/programme_curriculum/acad_admin_add_curriculum_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="right-btn-batch">Add Curriculum</Button>
              </Link>
              <Link
                to="/programme_curriculum/acad_admin_add_batch_form"
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
          </div> */}
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

export default Admin_edit_batch_form;
