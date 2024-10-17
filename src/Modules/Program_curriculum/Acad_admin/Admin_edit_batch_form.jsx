import React, { useEffect } from "react";
import {
  Breadcrumbs,
  Anchor,
  Select,
  NumberInput,
  Checkbox,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";

function Admin_edit_batch_form({ batchData }) {
  const form = useForm({
    initialValues: {
      batchName: "",
      discipline: "",
      batchYear: 2024,
      disciplineBatch: "",
      runningBatch: false,
    },
  });

  // Prepopulate the form with existing batch data when editing
  useEffect(() => {
    if (batchData) {
      form.setValues({
        batchName: batchData.batchName || "",
        discipline: batchData.discipline || "",
        batchYear: batchData.batchYear || 2024,
        disciplineBatch: batchData.disciplineBatch || "",
        runningBatch: batchData.runningBatch || false,
      });
    }
  }, [batchData]);

  const handleSubmit = (values) => {
    // Handle the update logic here
    console.log("Updated Batch Details:", values);
  };

  const breadcrumbItems = [
    { title: "Program and Curriculum", href: "#" },
    { title: "Curriculums", href: "#" },
    { title: "CSE UG Curriculum", href: "#" },
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
                  Edit Batch Form
                </Text>

                <Select
                  label="Batch Name"
                  placeholder="-- Select Batch Name --"
                  data={["Btech", "Mtech", "Bdes", "Mdes", "Phd"]}
                  value={form.values.batchName}
                  onChange={(value) => form.setFieldValue("batchName", value)}
                  required
                />

                <Select
                  label="Select Discipline"
                  placeholder="-- Select Discipline --"
                  data={[
                    "Computer Science and Engineering",
                    "Electronics and Communication Engineering",
                    "Mechanical Engineering",
                    "Smart Manufacturing",
                    "Design DES",
                    "Natural Science",
                    "Humanities",
                  ]}
                  value={form.values.discipline}
                  onChange={(value) => form.setFieldValue("discipline", value)}
                  required
                />

                <NumberInput
                  label="Batch Year"
                  defaultValue={2024}
                  value={form.values.batchYear}
                  onChange={(value) => form.setFieldValue("batchYear", value)}
                  required
                />

                <Select
                  label="Select Discipline for Batch Students"
                  placeholder="-- Select Discipline for Batch Students --"
                  data={[
                    "CSE UG Curriculum v1.0",
                    "ECE UG Curriculum v1.0",
                    "ME UG Curriculum v1.0",
                    "SM UG Curriculum v1.0",
                    "Design UG Curriculum v1.0",
                    "Natural Science PG Curriculum v1.0",
                    "Humanities UG Curriculum v1.0",
                  ]}
                  value={form.values.disciplineBatch}
                  onChange={(value) =>
                    form.setFieldValue("disciplineBatch", value)
                  }
                  required
                />

                <Checkbox
                  label="Running Batch"
                  checked={form.values.runningBatch}
                  onChange={(event) =>
                    form.setFieldValue(
                      "runningBatch",
                      event.currentTarget.checked,
                    )
                  }
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
              <a
                href="/programme_curriculum/acad_admin_add_curriculum_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="right-btn-batch">Add Curriculum</Button>
              </a>
              <a
                href="/programme_curriculum/acad_admin_add_batch_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="right-btn-batch">Add Another Batch</Button>
              </a>
              <a
                href="/programme_curriculum/acad_admin_add_discipline_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="right-btn-batch">Add Discipline</Button>
              </a>
            </Group>
          </div>
        </div>
      </Container>

      <style>{`
        .right-btn-batch{
          width:15vw;
        }
      `}</style>
    </div>
  );
}

Admin_edit_batch_form.propTypes = {
  batchData: PropTypes.shape({
    batchName: PropTypes.string,
    discipline: PropTypes.string,
    batchYear: PropTypes.number,
    disciplineBatch: PropTypes.string,
    runningBatch: PropTypes.bool,
  }),
};

export default Admin_edit_batch_form;
