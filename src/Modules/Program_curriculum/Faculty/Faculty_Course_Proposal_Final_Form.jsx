import React, { useState, useEffect } from "react";
import {
  NumberInput,
  Textarea,
  Button,
  Group,
  Text,
  Container,
  Stack,
  TextInput,
  Table,
  MultiSelect,
  // Select,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  fetchDisciplinesData,
  fetchAllCourses,
  fetchFacultyCourseProposalCourseData,
} from "../api/api";
import { host } from "../../../routes/globalRoutes";

function FacultyCourseProposalFinalForm() {
  const form = useForm({
    initialValues: {
      courseName: "",
      courseCode: "",
      courseCredit: 4,
      courseVersion: 1,
      lectureHours: 3,
      tutorialHours: 1,
      practicalHours: 2,
      discussionHours: 0,
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
      maxSeats: 90,
      workingCourse: false,
    },
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const username = useSelector((state) => state.user.roll_no);
  const role = useSelector((state) => state.user.role);
  // const { id } = useParams();
  const [disciplines, setDisciplines] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await fetchDisciplinesData();
        // console.log(response);

        // const data = [...d.name, ...d.acronym, ...d.id];

        const disciplineList = response.map((discipline) => ({
          name: `${discipline.name} (${discipline.acronym})`,
          id: discipline.id,
        }));
        setDisciplines(disciplineList);
      } catch (fetchError) {
        console.error("Error fetching disciplines: ", fetchError);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetchAllCourses();
        console.log("Courses data:", response);

        const courseList = response.map((c) => ({
          name: `${c.name} (${c.code})`,
          id: c.id,
        }));
        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    const loadCourseDetails = async () => {
      try {
        const response = await fetchFacultyCourseProposalCourseData(id);
        const data = await response.json();
        console.log(data.data);
        setCourse(data.data.proposal);
        console.log(course);
        form.setValues({
          courseName: data.data.proposal.name,
          courseCode: data.data.proposal.code,
          courseCredit: data.data.proposal.credit,
          // courseVersion: data.data.proposal.version,
          lectureHours: data.data.proposal.lecture_hours,
          tutorialHours: data.data.proposal.tutorial_hours,
          practicalHours: data.data.proposal.pratical_hours,
          discussionHours: data.data.proposal.discussion_hours,
          projectHours: data.data.proposal.project_hours,
          discipline: data.data.proposal.discipline.map((dis) =>
            JSON.stringify(dis),
          ),
          preRequisites: data.data.proposal.pre_requisits,
          preRequisiteCourse: data.data.proposal.pre_requisits_courses.map(
            (c) => JSON.stringify(c.id),
          ),
          syllabus: data.data.proposal.syllabus,
          references: data.data.proposal.ref_books,
          quiz1: data.data.proposal.percent_quiz_1,
          midsem: data.data.proposal.percent_midsem,
          quiz2: data.data.proposal.percent_quiz_2,
          endsem: data.data.proposal.percent_endsem,
          project: data.data.proposal.percent_project,
          labEvaluation: data.data.proposal.percent_lab_evaluation,
          attendance: data.data.proposal.percent_course_attendance,
          maxSeats: data.data.proposal.max_seats,
        });
      } catch (err) {
        console.error("Error fetching course details: ", err);
      }
    };

    fetchDisciplines();
    fetchCourses();
    loadCourseDetails();
  }, [id]);
  console.log(form.values);

  const handleSubmit = async (values) => {
    const apiUrl = `${host}/programme_curriculum/api/forward_course_forms/${id}/?username=${username}&des=${role}`;
    const token = localStorage.getItem("authToken");
    console.log("Form Values:", values);

    const payload = {
      name: values.courseName,
      code: values.courseCode,
      credit: values.courseCredit,
      version: values.courseVersion,
      lecture_hours: values.lectureHours,
      tutorial_hours: values.tutorialHours,
      pratical_hours: values.practicalHours,
      project_hours: values.projectHours,
      discussion_hours: values.discussionHours,
      syllabus: values.syllabus,
      percent_quiz_1: values.quiz1,
      percent_midsem: values.midsem,
      percent_quiz_2: values.quiz2,
      percent_endsem: values.endsem,
      percent_project: values.project,
      percent_lab_evaluation: values.labEvaluation,
      percent_course_attendance: values.attendance,
      ref_books: values.references,
      disciplines: values.discipline,
      pre_requisit_courses: values.preRequisiteCourse,
      pre_requisits: values.preRequisites,
      maxSeats: values.maxSeats,
      working_course: values.workingCourse,
    };
    console.log("Payload: ", payload);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.setItem("FacultyCoursesCachechange", "true");
        const data = await response.json();
        alert("Course added successfully!");
        console.log("Response Data:", data);
        navigate("/programme_curriculum/faculty_courses");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        alert("Failed to add course.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please try again.");
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
                        <NumberInput
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
                    label="Discussion Hours"
                    placeholder="0"
                    value={form.values.discussionHours}
                    onChange={(value) =>
                      form.setFieldValue("discussionHours", value)
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
                    label="Practical Hours"
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
                  <NumberInput
                    label="Max. Seats"
                    placeholder="0"
                    value={form.values.maxSeats}
                    onChange={(value) => form.setFieldValue("maxSeats", value)}
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
                <Checkbox
                  label="Working Course"
                  checked={form.values.workingCourse}
                  onChange={(event) =>
                    form.setFieldValue("workingCourse", event.target.checked)
                  }
                />
                {/* Discipline and Others */}
                <MultiSelect
                  label="From Discipline"
                  placeholder="Select Discipline"
                  data={disciplines.map((discipline) => ({
                    label: discipline.name,
                    value: discipline.id.toString(), // Ensure value is a string for the MultiSelect component
                    ...discipline,
                  }))}
                  value={
                    Array.isArray(form.values.discipline)
                      ? form.values.discipline.map(String) // Convert integers to strings for the MultiSelect component
                      : []
                  }
                  onChange={(value) => {
                    const integerValues = value ? value.map(Number) : []; // Convert selected strings back to integers
                    form.setFieldValue("discipline", integerValues);
                  }}
                  required
                  searchable
                />
                {/* <Select
                  label="From Discipline"
                  placeholder="Select Discipline"
                  data={disciplines}
                  value={form.values.discipline}
                  onChange={(value) => form.setFieldValue("discipline", value)}
                  required
                  searchable
                  clearable
                  nothingFound="No disciplines found"
                /> */}
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
                />
                <MultiSelect
                  label="Pre-requisite Course"
                  placeholder="Select Course"
                  data={courses.map((c) => ({
                    label: c.name,
                    value: c.id.toString(),
                    ...c,
                  }))}
                  value={
                    Array.isArray(form.values.preRequisiteCourse)
                      ? form.values.preRequisiteCourse
                      : []
                  }
                  onChange={(value) =>
                    form.setFieldValue("preRequisiteCourse", value || [])
                  }
                  searchable
                />
                <Textarea
                  label="Syllabus"
                  placeholder="Enter syllabus"
                  value={form.values.syllabus}
                  onChange={(event) =>
                    form.setFieldValue("syllabus", event.currentTarget.value)
                  }
                />
                <Textarea
                  label="References"
                  placeholder="Enter references"
                  value={form.values.references}
                  onChange={(event) =>
                    form.setFieldValue("references", event.currentTarget.value)
                  }
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

export default FacultyCourseProposalFinalForm;
