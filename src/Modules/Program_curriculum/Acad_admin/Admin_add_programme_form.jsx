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
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { host } from "../../../routes/globalRoutes";

function Admin_add_programme_form() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const form = useForm({
    initialValues: {
      category: "",
      name: "",
      programme_begin_year: 2024,
    },
  });

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const apiUrl = `${host}/programme_curriculum/api/admin_add_programme/`;
    const token = localStorage.getItem("token");
    console.log(values)
    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(values),
        // headers: {Authorization: `Token ${token}`,},
      });

      if (response.ok) {
        alert("Programme added successfully!");
        navigate("/programme_curriculum/acad_view_all_programme");
      } else {
        alert("Failed to add programme.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid style={{ minHeight: "100vh", padding: "2rem" }}>
      {isMobile && (
        <Group spacing="md" position="center" mb="lg">
          <Link to="/programme_curriculum/acad_admin_add_curriculum_form">
            <Button
              className="right-btn-programme"
              style={{ minWidth: "140px" }}
            >
              Add Curriculum
            </Button>
          </Link>
          <Link to="/programme_curriculum/acad_admin_add_discipline_form">
            <Button
              className="right-btn-programme"
              style={{ minWidth: "140px" }}
            >
              Add Discipline
            </Button>
          </Link>
        </Group>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "2rem",
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
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.target.value)
                }
                required
              />

              <NumberInput
                label="Programme Begin Year"
                value={form.values.programme_begin_year}
                onChange={(value) => form.setFieldValue("programme_begin_year", value)}
                required
              />
            </Stack>

            <Group position="right" mt="lg">
              <Button variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </Group>
          </form>
        </div>

        {!isMobile && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Group spacing="md" direction="column">
              <Link to="/programme_curriculum/acad_admin_add_curriculum_form">
                <Button
                  className="right-btn-programme"
                  style={{ minWidth: "140px" }}
                >
                  Add Curriculum
                </Button>
              </Link>
              <Link to="/programme_curriculum/acad_admin_add_discipline_form">
                <Button
                  className="right-btn-programme"
                  style={{ minWidth: "140px" }}
                >
                  Add Discipline
                </Button>
              </Link>
            </Group>
          </div>
        )}
      </div>

      <style>{`
        .right-btn-programme {
          width: 15vw;
        }
      `}</style>
    </Container>
  );
}

export default Admin_add_programme_form;
