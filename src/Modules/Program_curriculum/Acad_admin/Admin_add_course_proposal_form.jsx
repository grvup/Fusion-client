import React from "react";
import {
  Select,
  NumberInput,
  Textarea,
  Button,
  Group,
  Text,
  Container,
  Stack,
  TextInput,
  Table,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Admin_add_course_proposal_form() {
  const form = useForm({
    initialValues: {
      courseName: "",
      courseCode: "",
      courseCredit: 4,
      courseVersion: "1.0",
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 2,
      groupDiscussion: 0,
      projectHours: 0,
      discipline: "",
      preRequisites: "",
      preRequisiteCourse: "",
      syllabus: "",
      references: "",
      quiz1: 10,
      midsem: 20,
      quiz2: 10,
      endsem: 30,
      project: 10,
      labEvaluation: 15,
      attendance: 5,
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  // const breadcrumbItems = [
  //   { title: "Program and Curriculum", href: "#" },
  //   { title: "Curriculums", href: "#" },
  //   { title: "CSE UG Curriculum", href: "#" },
  // ].map((item, index) => (
  //   <Anchor href={item.href} key={index}>
  //     {item.title}
  //   </Anchor>
  // ));
  console.log(form);
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

      <Group spacing="xs" className="program-options" position="center" mt="md">
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
            maxWidth: "90vw",
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
                <Text
                  size="xl"
                  weight={700}
                  align="center"
                  style={{ padding: "10px", borderRadius: "5px" }}
                >
                  Course Form
                </Text>

                <Table
                  striped
                  highlightOnHover
                  style={{ borderCollapse: "collapse", width: "100%" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: "2px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Course Name:
                      </td>
                      <td
                        style={{ border: "2px solid #1976d2", padding: "10px" }}
                      >
                        <TextInput
                          placeholder="Discrete Mathematics"
                          value={form.values.courseName}
                          onChange={(event) =>
                            form.setFieldValue(
                              "courseName",
                              event.currentTarget.value,
                            )
                          }
                          required
                          styles={{
                            input: {
                              borderRadius: "4px",
                              height: "30px",
                              fontSize: "14px",
                              border: "none",
                            },
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Course Code:
                      </td>
                      <td
                        style={{ border: "2px solid #1976d2", padding: "10px" }}
                      >
                        <TextInput
                          placeholder="NS205c"
                          value={form.values.courseCode}
                          onChange={(event) =>
                            form.setFieldValue(
                              "courseCode",
                              event.currentTarget.value,
                            )
                          }
                          required
                          styles={{
                            input: {
                              borderRadius: "4px",
                              height: "30px",
                              fontSize: "14px",
                              border: "none",
                            },
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Credit:
                      </td>
                      <td
                        style={{ border: "2px solid #1976d2", padding: "10px" }}
                      >
                        <NumberInput
                          placeholder="4"
                          value={form.values.courseCredit}
                          onChange={(value) =>
                            form.setFieldValue("courseCredit", value)
                          }
                          required
                          styles={{
                            input: {
                              borderRadius: "4px",
                              height: "30px",
                              fontSize: "14px",
                              border: "none",
                            },
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Version:
                      </td>
                      <td
                        style={{ border: "2px solid #1976d2", padding: "10px" }}
                      >
                        <TextInput
                          placeholder="1.0"
                          value={form.values.courseVersion}
                          onChange={(event) =>
                            form.setFieldValue(
                              "courseVersion",
                              event.currentTarget.value,
                            )
                          }
                          required
                          styles={{
                            input: {
                              borderRadius: "4px",
                              height: "30px",
                              fontSize: "14px",
                              border: "none",
                            },
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* Contact Hours */}
                <Group
                  grow
                  style={{
                    borderBottom: "2px solid lightblue",
                    paddingBottom: "10px",
                  }}
                >
                  <NumberInput
                    label="Lecture (L)"
                    placeholder="3"
                    value={form.values.lectureHours}
                    onChange={(value) =>
                      form.setFieldValue("lectureHours", value)
                    }
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Tutorial (T)"
                    placeholder="1"
                    value={form.values.tutorialHours}
                    onChange={(value) =>
                      form.setFieldValue("tutorialHours", value)
                    }
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Practical (P)"
                    placeholder="2"
                    value={form.values.practicalHours}
                    onChange={(value) =>
                      form.setFieldValue("practicalHours", value)
                    }
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="GD"
                    placeholder="0"
                    value={form.values.groupDiscussion}
                    onChange={(value) =>
                      form.setFieldValue("groupDiscussion", value)
                    }
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Project (PR)"
                    placeholder="0"
                    value={form.values.projectHours}
                    onChange={(value) =>
                      form.setFieldValue("projectHours", value)
                    }
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                </Group>
                {/* Discipline and Others */}
                <Select
                  label="From Discipline"
                  placeholder="Select Discipline"
                  data={["Computer Science", "Electronics"]}
                  value={form.values.discipline}
                  onChange={(value) => form.setFieldValue("discipline", value)}
                  required
                />
                <Textarea
                  label="Pre-requisites"
                  placeholder="None"
                  value={form.values.preRequisites}
                  onChange={(event) =>
                    form.setFieldValue(
                      "preRequisites",
                      event.currentTarget.value,
                    )
                  }
                  required
                />
                <Select
                  label="Pre-requisite Course"
                  placeholder="Select Course"
                  data={[]}
                  value={form.values.preRequisiteCourse}
                  onChange={(value) =>
                    form.setFieldValue("preRequisiteCourse", value)
                  }
                  required
                />
                <Textarea
                  label="Syllabus"
                  placeholder="Enter syllabus"
                  value={form.values.syllabus}
                  onChange={(event) =>
                    form.setFieldValue("syllabus", event.currentTarget.value)
                  }
                  required
                />
                <Textarea
                  label="References"
                  placeholder="Enter references"
                  value={form.values.references}
                  onChange={(event) =>
                    form.setFieldValue("references", event.currentTarget.value)
                  }
                  required
                />
                <Group
                  grow
                  style={{
                    borderBottom: "2px solid lightblue",
                    paddingBottom: "10px",
                  }}
                >
                  <NumberInput
                    label="Quiz 1"
                    placeholder="3"
                    value={form.values.quiz1}
                    onChange={(value) => form.setFieldValue("quiz1", value)}
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Midsem"
                    placeholder="1"
                    value={form.values.midsem}
                    onChange={(value) => form.setFieldValue("midsem", value)}
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Quiz 2"
                    placeholder="2"
                    value={form.values.quiz2}
                    onChange={(value) => form.setFieldValue("quiz2", value)}
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Endsem"
                    placeholder="0"
                    value={form.values.endsem}
                    onChange={(value) => form.setFieldValue("endsem", value)}
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Project"
                    placeholder="0"
                    value={form.values.project}
                    onChange={(value) => form.setFieldValue("project", value)}
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Lab"
                    placeholder="0"
                    value={form.values.labEvaluation}
                    onChange={(value) =>
                      form.setFieldValue("labEvaluation", value)
                    }
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                  <NumberInput
                    label="Attendance"
                    placeholder="0"
                    value={form.values.attendance}
                    onChange={(value) =>
                      form.setFieldValue("attendance", value)
                    }
                    required
                    styles={{
                      input: {
                        borderRadius: "8px",
                        height: "40px",
                        fontSize: "16px",
                      },
                      control: { width: "15px" },
                      label: { fontSize: "14px", fontWeight: 600 },
                    }}
                    step={1}
                  />
                </Group>

                <Button type="submit" mt="md">
                  Submit
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Admin_add_course_proposal_form;
