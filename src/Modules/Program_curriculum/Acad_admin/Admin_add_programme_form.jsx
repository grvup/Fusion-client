import React from "react";
import {
  Breadcrumbs,
  Anchor,
  Select,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Admin_add_programme_form() {
  const form = useForm({
    initialValues: {
      category: "",
      programmeName: "",
      year: 2024,
    },
  });

  const handleSubmit = (values) => {
    console.log("Programme Data Submitted:", values);
  };

  const breadcrumbItems = [
    { title: "Program and Curriculum", href: "#" },
    { title: "Curriculums", href: "#" },
    { title: "Add Curriculum Form", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

      {/* Options Section */}
      <Group spacing="xs" className="program-options" position="center" mt="md">
        <Text>Programs</Text>
        <Text className="active">Curriculums</Text>
        <Text>Courses</Text>
        <Text>Disciplines</Text>
        <Text>Batches</Text>
      </Group>

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
                  Add Programme Form
                </Text>

                <Select
                  label="Programme Category"
                  placeholder="-- Select Category --"
                  data={["UG", "PG", "PhD"]}
                  value={form.values.category}
                  onChange={(value) => form.setFieldValue("category", value)}
                  required
                />

                <Select
                  label="Programme Name"
                  placeholder="Enter Programme Name"
                  data={[]} // Provide the options here if needed
                  value={form.values.programmeName}
                  onChange={(value) =>
                    form.setFieldValue("programmeName", value)
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
              <Button className="right-btn-programme">Add Curriculum</Button>
              <Button className="right-btn-programme">Add Discipline</Button>
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
