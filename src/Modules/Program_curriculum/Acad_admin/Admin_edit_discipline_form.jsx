import React, { useState, useEffect } from "react";
import {
  MultiSelect,
  Button,
  Group,
  Text,
  Container,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDisciplinesData, fetchAllProgrammes } from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_edit_discipline_form() {
  const form = useForm({
    initialValues: {
      disciplineName: "",
      acronym: "",
      linkedProgrammes: [], // Initialize with an empty array
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [discipline, setDiscipline] = useState(null);
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        // Fetch programmes data
        const response = await fetchAllProgrammes(token);
        const programmeData = [
          ...response.ug_programmes,
          ...response.pg_programmes,
          ...response.phd_programmes,
        ];

        // Filter programmes that are not connected to a discipline
        const filteredProgrammes = programmeData.filter(
          (programme) => !programme.discipline__name,
        );

        // Map the filtered data
        const programmeList = filteredProgrammes.map((programme) => ({
          name: `${programme.name} ${programme.programme_begin_year}`,
          id: `${programme.id}`,
        }));

        // Fetch discipline data
        const disciplines = await fetchDisciplinesData(token);
        const dis = disciplines.find((d) => d.id === Number(id));
        setDiscipline(dis);

        // Merge programmes and mark pre-selected ones
        if (dis) {
          const mergedProgrammes = [
            ...programmeList,
            ...dis.programmes.map((p) => ({ name: p.name, id: `${p.id}` })),
          ];

          // Remove duplicates
          const uniqueProgrammes = Array.from(
            new Set(mergedProgrammes.map((p) => p.id)),
          ).map((programmeId) =>
            mergedProgrammes.find((p) => p.id === programmeId),
          );

          setProgrammes(uniqueProgrammes);

          // Initialize form values with discipline data
          form.setValues({
            disciplineName: dis.name,
            acronym: dis.acronym,
            linkedProgrammes: dis.programmes.map((p) => `${p.id}`), // Pre-select linked programmes
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    console.log("Submitted values are: ", values);

    const apiUrl = `${host}/programme_curriculum/api/admin_edit_discipline/${id}/`;

    // Transform the values into the required structure
    const payload = {
      name: values.disciplineName, // Map disciplineName to name
      acronym: values.acronym, // Map acronym directly
      programmes: values.linkedProgrammes, // Map linkedProgrammes to programmes
    };

    console.log("Payload: ", payload);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.setItem("AdminDisciplineCachechange", "true");
        const data = await response.json();
        console.log("Response Data:", data);
        alert("Discipline updated successfully!");
        navigate("/programme_curriculum/acad_discipline_view");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        alert("Failed to update discipline.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {(() => {
        console.log("Discipline Data: ", discipline);
        console.log("Programme Data: ", programmes);
        return null;
      })()}

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
                  Edit Discipline Form
                </Text>

                <TextInput
                  label="Discipline Name"
                  placeholder="Enter new discipline name"
                  value={form.values.disciplineName}
                  onChange={(event) =>
                    form.setFieldValue(
                      "disciplineName",
                      event.currentTarget.value,
                    )
                  }
                  required
                />

                <TextInput
                  label="Enter Acronym"
                  placeholder="Enter acronym"
                  value={form.values.acronym}
                  onChange={(event) =>
                    form.setFieldValue("acronym", event.currentTarget.value)
                  }
                  required
                />

                <div>
                  {programmes.length > 0 ? (
                    <MultiSelect
                      id="linkedProgrammes"
                      value={form.values.linkedProgrammes}
                      onChange={(value) =>
                        form.setFieldValue("linkedProgrammes", value)
                      }
                      withAsterisk
                      label="Link Programmes to this Discipline" // Add aria-label
                      data={programmes.map((programme) => ({
                        value: programme.id.toString(),
                        label: programme.name,
                      }))}
                      searchable
                    />
                  ) : (
                    <p style={{ color: "gray", fontStyle: "italic" }}>
                      No programmes available to be attached.
                    </p>
                  )}
                </div>
              </Stack>

              <Group position="right" mt="lg">
                <Button variant="outline" className="cancel-btn">
                  Cancel
                </Button>
                <Button type="submit" className="submit-btn" loading={loading}>
                  Submit
                </Button>
              </Group>
            </form>
          </div>
        </div>
      </Container>
      <style>{`
        .right-btn-discipline {
          width: 15vw;
        }
      `}</style>
    </div>
  );
}

export default Admin_edit_discipline_form;
