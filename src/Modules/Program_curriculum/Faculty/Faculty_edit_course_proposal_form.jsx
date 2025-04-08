import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllCourses, fetchCourseDetails } from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Faculty_edit_course_proposal_form() {
  const form = useForm({
    initialValues: {
      courseName: "",
      courseCode: "",
      courseCredit: 4,
      courseVersion: "1.0",
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
      uploader: "",
      uploader_name: "",
      Designation: "",
      Title: "",
      Description: "",
      maxSeats: 0,
    },
  });
  const role = useSelector((state) => state.user.role);
  const uploader_fullname = useSelector((state) => state.user.username);
  const uploader_username = useSelector((state) => state.user.roll_no);
  const navigate = useNavigate();
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all courses for prerequisite dropdown
        const coursesResponse = await fetchAllCourses();
        const courseList = coursesResponse.map((c) => ({
          name: `${c.name} (${c.code})`,
          id: c.id,
        }));
        setCourses(courseList);

        // Fetch current course details
        const courseDetails = await fetchCourseDetails(id);
        console.log("Fetched course details:", courseDetails);

        // Map the API response to form fields
        form.setValues({
          courseName: courseDetails.name || "",
          courseCode: courseDetails.code || "",
          courseCredit: courseDetails.credit || 4,
          courseVersion: courseDetails.version || "1.0",
          lectureHours: courseDetails.lecture_hours || 3,
          tutorialHours: courseDetails.tutorial_hours || 1,
          practicalHours: courseDetails.pratical_hours || 2,
          discussionHours: courseDetails.discussion_hours || 0,
          projectHours: courseDetails.project_hours || 0,
          discipline: courseDetails.disciplines || "",
          preRequisites: courseDetails.pre_requisits || "",
          preRequisiteCourse: [],
          syllabus: courseDetails.syllabus || "",
          references: courseDetails.ref_books || "",
          quiz1: courseDetails.percent_quiz_1 || 10,
          midsem: courseDetails.percent_midsem || 20,
          quiz2: courseDetails.percent_quiz_2 || 10,
          endsem: courseDetails.percent_endsem || 30,
          project: courseDetails.percent_project || 10,
          labEvaluation: courseDetails.percent_lab_evaluation || 15,
          attendance: courseDetails.percent_course_attendance || 5,
          Title: courseDetails.Title || "",
          Description: courseDetails.Description || "",
          maxSeats: courseDetails.maxSeats || 0,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (role && uploader_fullname) {
      try {
        form.setValues({
          Designation: role,
          uploader: uploader_username,
          uploader_name: uploader_fullname,
        });
      } catch (err) {
        console.error("Error setting form values: ", err);
      }
    }
  }, [role, uploader_fullname]);

  const handleSubmit = async (values) => {
    const apiUrl = `${host}/programme_curriculum/api/new_course_proposal_file/`;
    console.log("Form Values:", values);
    const user = localStorage.getItem("authToken");
    console.log(user);

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
      Title: values.Title,
      Description: values.Description,
      uploader: values.uploader,
      Designation: values.Designation,
      isUpdate: true,
    };

    console.log("Payload: ", payload);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Token ${user}`,
          "Content-Type": "application/json", // 🛠 Add this line
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Course updated successfully!");
        console.log("Response Data:", data);
        navigate("/programme_curriculum/faculty_view_course_proposal");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        alert("Failed to update course.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container>
        <Text>Loading course data...</Text>
      </Container>
    );
  }

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
                  Edit Course Proposal
                </Text>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ flex: 1, marginRight: "8px" }}>
                    <Textarea
                      label="Uploader"
                      placeholder=""
                      value={form.values.uploader_name}
                      onChange={(event) =>
                        form.setFieldValue(
                          "uploader",
                          event.currentTarget.value,
                        )
                      }
                    />
                  </div>
                  <div style={{ flex: 1, marginLeft: "8px" }}>
                    <Textarea
                      label="Designation"
                      placeholder=""
                      value={form.values.Designation}
                      onChange={(event) =>
                        form.setFieldValue(
                          "Designation",
                          event.currentTarget.value,
                        )
                      }
                    />
                  </div>
                </div>
                <Textarea
                  label="Title"
                  placeholder="Enter Title"
                  value={form.values.Title}
                  onChange={(event) =>
                    form.setFieldValue("Title", event.currentTarget.value)
                  }
                />
                <Textarea
                  label="Description"
                  placeholder="Enter Description"
                  value={form.values.Description}
                  onChange={(event) =>
                    form.setFieldValue("Description", event.currentTarget.value)
                  }
                />
                <Table
                  striped
                  highlightOnHover
                  style={{ borderCollapse: "collapse", width: "100%" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Course Name:
                      </td>
                      <td
                        style={{ border: "1px solid #1976d2", padding: "10px" }}
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
                          border: "1px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Course Code:
                      </td>
                      <td
                        style={{ border: "1px solid #1976d2", padding: "10px" }}
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
                          border: "1px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Credit:
                      </td>
                      <td
                        style={{ border: "1px solid #1976d2", padding: "10px" }}
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
                          border: "1px solid #1976d2",
                          padding: "10px",
                          fontWeight: "bold",
                          color: "#1976d2",
                        }}
                      >
                        Version:
                      </td>
                      <td
                        style={{ border: "1px solid #1976d2", padding: "10px" }}
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
                  Update Course
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Faculty_edit_course_proposal_form;
