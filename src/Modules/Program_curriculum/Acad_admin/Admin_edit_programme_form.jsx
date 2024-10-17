import React, { useEffect } from "react";
import PropTypes from "prop-types";
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

function Admin_edit_programme_form({ initialProgrammeData }) {
  const form = useForm({
    initialValues: {
      category: initialProgrammeData?.category || "",
      programmeName: initialProgrammeData?.programmeName || "",
      year: initialProgrammeData?.year || 2024,
    },
  });

  useEffect(() => {
    if (initialProgrammeData) {
      form.setValues({
        category: initialProgrammeData.category,
        programmeName: initialProgrammeData.programmeName,
        year: initialProgrammeData.year,
      });
    }
  }, [initialProgrammeData]);

  const handleSubmit = (values) => {
    console.log("Edited Programme Data Submitted:", values);
    // Add API call or logic for submitting the updated programme data
  };

  const breadcrumbItems = [
    { title: "Program and Curriculum", href: "#" },
    { title: "Curriculums", href: "#" },
    { title: "Edit Curriculum Form", href: "#" },
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
                  Edit Programme Form
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
                  data={[]} // Provide options here if needed
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
                  Update
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

Admin_edit_programme_form.propTypes = {
  initialProgrammeData: PropTypes.shape({
    category: PropTypes.string,
    programmeName: PropTypes.string,
    year: PropTypes.number,
  }),
};

export default Admin_edit_programme_form;
