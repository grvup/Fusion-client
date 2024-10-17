import React from "react";
import {
  Breadcrumbs,
  Anchor,
  Select,
  NumberInput,
  Textarea,
  TextInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Admin_edit_course_slot_form({ existingData = {} }) {
  // Dummy data to be used if existingData is not provided
  const dummyData = {
    semester: "CSE UG Curriculum v1.0, sem - 1",
    courseSlotName: "Dummy Slot",
    type: "Lecture",
    information: "This is a dummy information for the course slot.",
    courses: "CS101, CS102",
    duration: 2,
    minLimit: 5,
    maxLimit: 100,
  };

  const form = useForm({
    initialValues: {
      semester: existingData.semester || dummyData.semester,
      courseSlotName: existingData.courseSlotName || dummyData.courseSlotName,
      type: existingData.type || dummyData.type,
      information: existingData.information || dummyData.information,
      courses: existingData.courses || dummyData.courses,
      duration: existingData.duration || dummyData.duration,
      minLimit: existingData.minLimit || dummyData.minLimit,
      maxLimit: existingData.maxLimit || dummyData.maxLimit,
    },
  });

  const handleSubmit = (values) => {
    console.log("Updated Course Slot Data:", values);
    // Logic to update the course slot in the backend can be implemented here.
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
                  Edit Course Slot Form
                </Text>

                <Select
                  label="For Semester"
                  placeholder="Select Semester"
                  data={["CSE UG Curriculum v1.0, sem - 1"]}
                  value={form.values.semester}
                  onChange={(value) => form.setFieldValue("semester", value)}
                  required
                />

                <TextInput
                  label="Course Slot Name"
                  placeholder="Enter Name/Code"
                  value={form.values.courseSlotName}
                  onChange={(event) =>
                    form.setFieldValue(
                      "courseSlotName",
                      event.currentTarget.value,
                    )
                  }
                  required
                />

                <Select
                  label="Type"
                  placeholder="Select Type"
                  data={["Lecture", "Lab"]}
                  value={form.values.type}
                  onChange={(value) => form.setFieldValue("type", value)}
                  required
                />

                <Textarea
                  label="Information"
                  placeholder="Enter information about this course slot"
                  value={form.values.information}
                  onChange={(event) =>
                    form.setFieldValue("information", event.currentTarget.value)
                  }
                  rows={4}
                  required
                />

                <TextInput
                  label="Courses"
                  placeholder="Enter course codes"
                  value={form.values.courses}
                  onChange={(event) =>
                    form.setFieldValue("courses", event.currentTarget.value)
                  }
                  required
                />

                <NumberInput
                  label="Duration (hours)"
                  min={1}
                  value={form.values.duration}
                  onChange={(value) => form.setFieldValue("duration", value)}
                  required
                />

                <NumberInput
                  label="Min Registration Limit"
                  min={0}
                  value={form.values.minLimit}
                  onChange={(value) => form.setFieldValue("minLimit", value)}
                  required
                />

                <NumberInput
                  label="Max Registration Limit"
                  min={1}
                  value={form.values.maxLimit}
                  onChange={(value) => form.setFieldValue("maxLimit", value)}
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
            {/* <Group spacing="md" direction="column" style={{ width: "100%" }}>
              <Button className="right-btn-course-slot">Add Curriculum</Button>
              <Button className="right-btn-course-slot">
                Add Another Slot
              </Button>
              <Button className="right-btn-course-slot">Add Discipline</Button>
            </Group> */}
          </div>
        </div>
      </Container>

      <style>{`
        .right-btn-course-slot {
          width: 15vw;
        }
      `}</style>
    </div>
  );
}

Admin_edit_course_slot_form.propTypes = {
  existingData: {
    semester: "CSE UG Curriculum v1.0, sem - 1",
    courseSlotName: "Dummy Slot",
    type: "Lecture",
    information: "This is a dummy information for the course slot.",
    courses: "CS101, CS102",
    duration: 2,
    minLimit: 5,
    maxLimit: 100,
  },
};

export default Admin_edit_course_slot_form;
