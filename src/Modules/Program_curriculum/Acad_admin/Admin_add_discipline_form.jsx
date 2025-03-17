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
import { useNavigate } from "react-router-dom";
import { fetchAllProgrammes } from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_add_discipline_form() {
  const form = useForm({
    initialValues: {
      disciplineName: "",
      acronym: "",
      linkedProgramme: "",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }
        const response = await fetchAllProgrammes(token);
        console.log(response);

        const programmeData = [
          ...response.ug_programmes,
          ...response.pg_programmes,
          ...response.phd_programmes,
        ];
        console.log(programmeData);

        // Filter programmes that are not connected to a discipline
        const filteredProgrammes = programmeData.filter(
          (programme) => !programme.discipline__name, // Keep programmes where discipline__name is falsy
        );

        // Now map the filtered data
        const programmeList = filteredProgrammes.map((programme) => ({
          name: `${programme.name} ${programme.programme_begin_year}`,
          id: `${programme.id}`,
        }));

        setProgrammes(programmeList);
        console.log("Fin data: ", programmeList); // Log the final filtered and mapped data
      } catch (fetchError) {
        console.error("Error fetching data:", fetchError);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (values) => {
    const apiUrl = `${host}/programme_curriculum/api/admin_add_discipline/`;

    console.log("Form Values:", values);

    const payload = {
      name: values.disciplineName,
      acronym: values.acronym,
      programmes: values.linkedProgrammes,
    };
    console.log("Payload: ", payload);

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.setItem("AdminDisciplineCachechange", "true");
        const data = await response.json();
        alert("Discipline added successfully!");
        console.log("Response Data:", data);
        navigate("/programme_curriculum/acad_discipline_view");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        alert("Failed to add programme.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const breadcrumbItems = [
  //   { title: "Program and Curriculum", href: "#" },
  //   { title: "Curriculums", href: "#" },
  //   { title: "Discipline Form", href: "#" },
  // ].map((item, index) => (
  //   <Anchor href={item.href} key={index}>
  //     {item.title}
  //   </Anchor>
  // ));

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* <Breadcrumbs>{breadcrumbItems}</Breadcrumbs> */}

      {/* Options Section */}
      {/* <Group spacing="xs" className="program-options" position="center" mt="md">
        <Text>Programmes</Text>
        <Text className="active">Curriculums</Text>
        <Text>Courses</Text>
        <Text>Disciplines</Text>
        <Text>Batches</Text>
      </Group> */}

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
                  Discipline Form
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
                      placeholder="Select Programmes"
                      onChange={(value) =>
                        form.setFieldValue("linkedProgrammes", value)
                      }
                      withAsterisk
                      label="Link Programmes to this Discipline"
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

          {/* Right Panel Buttons */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {/* <Group spacing="md" direction="column" style={{ width: "100%" }}>
              <Button className="right-btn-discipline">Add Discipline</Button>
              <Button className="right-btn-discipline">
                Add Another Batch
              </Button>
              <Button className="right-btn-discipline">Add Course</Button>
            </Group> */}
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

export default Admin_add_discipline_form;
