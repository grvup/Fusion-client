import React, { useState, useEffect } from "react";
import {
  Select,
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
        // Call the API without token for now
        const response = await fetchAllProgrammes();
        console.log(response.data);

        const programmeData = response.data.programmes || []; // Adjust if needed

        // Now map the data
        const programmeList = programmeData.map((prog) => ({
          value: prog.id,
          label: `${prog.name} (${prog.programme_begin_year})`,
        }));
        setProgrammes(programmeList);
      } catch (fetchError) {
        console.error("Error fetching data:", fetchError);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (values) => {
    const apiUrl =
      "http://127.0.0.1:8000/programme_curriculum/api/admin_add_discipline/";

    console.log("Form Values:", values);

    const formData = new FormData();
    formData.append("category", values.disciplineName);
    formData.append("name", values.acronym);
    formData.append("programme_begin_year", values.linkedProgramme);

    console.log("Form Data:", formData);

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Programme added successfully!");
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

                <Select
                  label="Link Programmes to this Discipline"
                  placeholder="-- Select Programme --"
                  data={programmes}
                  value={form.values.linkedProgramme}
                  onChange={(value) =>
                    form.setFieldValue("linkedProgramme", value)
                  }
                  required
                />
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
