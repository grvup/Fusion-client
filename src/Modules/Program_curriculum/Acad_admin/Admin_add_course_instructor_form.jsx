import React from "react";
import {
  Select,
  NumberInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Admin_add_course_instructor() {
  const form = useForm({
    initialValues: {
      courseName: "",
      instructor: "",
      year: 2024,
      semester: "",
      runningBatch: false,
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
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
                  Course Instructor Form
                </Text>

                <Select
                  label="Select Course"
                  placeholder="-- Select Course Name --"
                  data={["Course 1", "Course 2", "Course 3"]}
                  value={form.values.courseName}
                  onChange={(value) => form.setFieldValue("courseName", value)}
                  required
                />

                <Select
                  label="Select Instructor"
                  placeholder="-- Select Instructor --"
                  data={[
                    "Instructor 1",
                    "Instructor 2",
                    "Instructor 3",
                    "Instructor 4",
                  ]}
                  value={form.values.instructor}
                  onChange={(value) => form.setFieldValue("instructor", value)}
                  required
                />

                <NumberInput
                  label="Select Year"
                  defaultValue={2024}
                  value={form.values.year}
                  onChange={(value) => form.setFieldValue("year", value)}
                  required
                />

                <Select
                  label="Select Semester Number"
                  placeholder="-- Select Semester --"
                  data={["1", "2", "3", "4", "5", "6", "7", "8"]}
                  value={form.values.semester}
                  onChange={(value) => form.setFieldValue("semester", value)}
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

export default Admin_add_course_instructor;
