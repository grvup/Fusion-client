import React from "react";
import {
  Breadcrumbs,
  Anchor,
  TextInput,
  Select,
  Checkbox,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Admin_add_curriculum_form() {
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

  const handleSubmit = (values) => {
    console.log(values);
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
        <Text>Programmes</Text>
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
                  Add Curriculum Form
                </Text>

                <TextInput
                  label="Curriculum Name"
                  placeholder="Enter new curriculum name"
                  value={form.values.curriculumName}
                  onChange={(event) =>
                    form.setFieldValue(
                      "curriculumName",
                      event.currentTarget.value,
                    )
                  }
                  required
                />

                <Select
                  label="Select for which Programme"
                  placeholder="-- Select Programme --"
                  data={[
                    "UG-Btech-CSE",
                    "UG-Btech-ECE",
                    "UG-Btech-ME",
                    "UG-Btech-SM",
                    "PhD-CSE",
                  ]}
                  value={form.values.programme}
                  onChange={(value) => form.setFieldValue("programme", value)}
                  required
                />

                <Checkbox
                  label="Working Curriculum"
                  checked={form.values.workingCurriculum}
                  onChange={(event) =>
                    form.setFieldValue(
                      "workingCurriculum",
                      event.currentTarget.checked,
                    )
                  }
                />

                <NumberInput
                  label="Curriculum Version No"
                  value={form.values.versionNo}
                  onChange={(value) => form.setFieldValue("versionNo", value)}
                  required
                />

                <NumberInput
                  label="Number of Semesters"
                  value={form.values.numSemesters}
                  onChange={(value) =>
                    form.setFieldValue("numSemesters", value)
                  }
                  required
                />

                <NumberInput
                  label="Number of Credits"
                  value={form.values.numCredits}
                  onChange={(value) => form.setFieldValue("numCredits", value)}
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
              <Button className="right-btn-curriculum">Add Curriculum</Button>
              <Button className="right-btn-curriculum">
                Add Another Batch
              </Button>
              <Button className="right-btn-curriculum">Add Discipline</Button>
            </Group>
          </div>
        </div>
      </Container>

      <style>
        {`
            .right-btn-curriculum{
            width:15vw
            }
          `}
      </style>
    </div>
  );
}

export default Admin_add_curriculum_form;
