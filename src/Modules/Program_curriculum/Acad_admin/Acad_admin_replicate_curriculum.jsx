import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Breadcrumbs,
  Anchor,
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Acad_replicate_curriculum_form({ existingData }) {
  const form = useForm({
    initialValues: {
      curriculumName: existingData.curriculumName || "",
      programme: existingData.programme || "",
      replicateFrom: existingData.replicateFrom || "",
      replicateTo: existingData.replicateTo || "",
      versionNo: existingData.versionNo || 1.0,
      numSemesters: existingData.numSemesters || 1,
      numCredits: existingData.numCredits || 0,
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Add your logic to handle the replicated curriculum submission here
  };

  const breadcrumbItems = [
    { title: "Program and Curriculum", href: "#" },
    { title: "Curriculums", href: "#" },
    { title: "Replicate Curriculum Form", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    // If there's a need to update the form values dynamically when existingData changes
    form.setValues(existingData);
  }, [existingData]);

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
                  Replicate Curriculum Form
                </Text>

                <TextInput
                  label="New Curriculum Name"
                  placeholder="Enter curriculum name"
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
                  label="Select Programme"
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

                <TextInput
                  label="Replicate From Curriculum"
                  placeholder="Enter the curriculum name to replicate from"
                  value={form.values.replicateFrom}
                  onChange={(event) =>
                    form.setFieldValue(
                      "replicateFrom",
                      event.currentTarget.value,
                    )
                  }
                  required
                />

                <TextInput
                  label="Replicate To Curriculum"
                  placeholder="Enter the curriculum name to replicate to"
                  value={form.values.replicateTo}
                  onChange={(event) =>
                    form.setFieldValue("replicateTo", event.currentTarget.value)
                  }
                  required
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
                  Replicate Curriculum
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
            .right-btn-curriculum {
              width: 15vw;
            }
          `}
      </style>
    </div>
  );
}

Acad_replicate_curriculum_form.defaultProps = {
  existingData: {
    curriculumName: "UG-Btech-CSE",
    programme: "UG-Btech-CSE",
    replicateFrom: "UG-Btech-CSE",
    replicateTo: "UG-Btech-ECE",
    versionNo: 1.0,
    numSemesters: 8,
    numCredits: 160,
  },
};

// Define PropTypes for props validation
Acad_replicate_curriculum_form.propTypes = {
  existingData: PropTypes.shape({
    curriculumName: PropTypes.string,
    programme: PropTypes.string,
    replicateFrom: PropTypes.string,
    replicateTo: PropTypes.string,
    versionNo: PropTypes.number,
    numSemesters: PropTypes.number,
    numCredits: PropTypes.number,
  }),
};

export default Acad_replicate_curriculum_form;
