import React from "react";
import {
  Select,
  Input,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

function Admin_add_programme_form() {
  const form = useForm({
    initialValues: {
      category: "",
      programmeName: "",
      year: 2024,
    },
  });

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const apiUrl =
      "http://127.0.0.1:8000/programme_curriculum/api/admin_add_programme/";

    console.log("Form Values:", values);

    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("name", values.programmeName);
    formData.append("programme_begin_year", values.year);

    console.log("Form Data:", formData);

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("programmesCachechange", true);
        alert("Programme added successfully!");
        console.log("Response Data:", data);
        navigate("/programme_curriculum/acad_view_all_programme");
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
                  Add Programme Form
                </Text>

                <Select
                  label="Programme Category"
                  placeholder="-- Select Category --"
                  data={["UG", "PG", "PHD"]}
                  value={form.values.category}
                  onChange={(value) => form.setFieldValue("category", value)}
                  required
                />

                <Input
                  label="Programme Name"
                  placeholder="Enter Programme Name"
                  value={form.values.programmeName}
                  onChange={(event) =>
                    form.setFieldValue("programmeName", event.target.value)
                  }
                  required
                />

                <NumberInput
                  label="Programme Begin Year"
                  value={form.values.year}
                  onChange={(value) => form.setFieldValue("year", value)}
                  required
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
              <a href="/programme_curriculum/acad_admin_add_curriculum_form">
                <Button className="right-btn-programme">Add Curriculum</Button>
              </a>
              <a href="/programme_curriculum/acad_admin_add_discipline_form">
                <Button className="right-btn-programme">Add Discipline</Button>
              </a>
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

export default Admin_add_programme_form;
