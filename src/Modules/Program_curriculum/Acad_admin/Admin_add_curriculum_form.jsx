import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { fetchAllProgrammes } from "../api/api";
import { host } from "../../../routes/globalRoutes";

function AdminAddCurriculumForm() {
  const form = useForm({
    initialValues: {
      curriculumName: "",
      programme: "",
      workingCurriculum: false,
      versionNo: 1.0,
      numSemesters: 1,
      numCredits: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [ugData, setUgData] = useState([]);
  const [pgData, setPgData] = useState([]);
  const [phdData, setPhdData] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Authorization token not found");

        const response = await fetchAllProgrammes(token);

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

  const handleSubmit = async (values) => {
    localStorage.setItem("AdminCurriculumsCachechange", "true");
    const payload = {
      curriculum_name: values.curriculumName,
      programme: values.programme,
      working_curriculum: values.workingCurriculum,
      version_no: values.versionNo,
      no_of_semester: values.numSemesters,
      num_credits: values.numCredits,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is required");
      }

      const response = await axios.post(
        `${host}/programme_curriculum/api/admin_add_curriculum/`,
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      if (response.status === 201) {
        alert("Curriculum added successfully!");
        navigate("/programme_curriculum/acad_view_all_working_curriculums");
      }
    } catch (errror) {
      console.error("Error:", errror);
      alert("Failed to add curriculum.");
    } finally {
      setLoading(false);
    }
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
                  Add Curriculum Form
                </Text>

                <Input
                  label="Curriculum Name"
                  placeholder="Enter Curriculum Name"
                  value={form.values.curriculumName}
                  onChange={(event) =>
                    form.setFieldValue("curriculumName", event.target.value)
                  }
                  required
                />

                <Select
                  label="Programme"
                  placeholder="-- Select Programme --"
                  data={loadingPrograms ? [] : programOptions}
                  value={form.values.programme}
                  onChange={(value) => form.setFieldValue("programme", value)}
                  required
                  disabled={loadingPrograms}
                  error={error}
                />

                <Checkbox
                  label="Working Curriculum"
                  checked={form.values.workingCurriculum}
                  onChange={(event) =>
                    form.setFieldValue(
                      "workingCurriculum",
                      event.target.checked,
                    )
                  }
                />

                <NumberInput
                  label="Curriculum Version"
                  value={form.values.versionNo}
                  onChange={(value) => form.setFieldValue("versionNo", value)}
                  required
                  min={0.1}
                  precision={1}
                />

                <NumberInput
                  label="Number of Semesters"
                  value={form.values.numSemesters}
                  onChange={(value) =>
                    form.setFieldValue("numSemesters", value)
                  }
                  required
                  min={1}
                />

                <NumberInput
                  label="Number of Credits"
                  value={form.values.numCredits}
                  onChange={(value) => form.setFieldValue("numCredits", value)}
                  required
                  min={0}
                />
              </Stack>

              <Group position="right" mt="lg">
                <Button
                  variant="outline"
                  onClick={() => form.reset()}
                  className="cancel-btn"
                >
                  Cancel
                </Button>
                <Button type="submit" className="submit-btn" loading={loading}>
                  Submit
                </Button>
              </Group>
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
            <Group spacing="md" direction="column" style={{ width: "100%" }}>
              <Link to="/programme_curriculum/acad_admin_add_programme_form">
                <Button className="right-btn-programme">Add Programme</Button>
              </Link>
              <Link to="/programme_curriculum/acad_admin_add_discipline_form">
                <Button className="right-btn-programme">Add Discipline</Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>

      <style>{`
        .right-btn-programme {
          width: 15vw;
        }
      `}</style>
    </div>
  );
}

export default AdminAddCurriculumForm;
