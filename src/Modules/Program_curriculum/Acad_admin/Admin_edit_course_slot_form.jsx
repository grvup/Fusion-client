import { React, useEffect, useState } from "react";
import {
  Select,
  NumberInput,
  Textarea,
  TextInput,
  Button,
  Group,
  Text,
  Container,
  Stack,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  fetchAllCourses,
  fetchCourseSlotTypeChoices,
  fetchSemesterDetails,
  fetchCourslotData,
} from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_edit_course_slot_form() {
  const { courseslotid } = useParams(); // Get the course slot ID from the URL
  console.log(courseslotid);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [semesterid, setSemesterid] = useState("");
  const [curriculumid, setCurriculumid] = useState("");
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [initialData, setInitialData] = useState(null);
  console.log(searchValue);
  console.log(initialData);

  const form = useForm({
    initialValues: {
      semester: "",
      courseSlotName: "",
      type: "",
      information: "",
      courses: [],
      duration: 1,
      minLimit: 0,
      maxLimit: 1000,
    },
    validate: {
      courseSlotName: (value) =>
        !value ? "Course slot name is required" : null,
      type: (value) => (!value ? "Type is required" : null),
    },
  });

  useEffect(() => {
    const loadCourseSlotChoices = async () => {
      try {
        const data = await fetchCourseSlotTypeChoices();
        const formattedOptions = data.choices.map((choice) => ({
          value: choice.value,
          label: choice.label,
        }));
        setOptions(formattedOptions);
      } catch (err) {
        setError("Failed to load course slot type choices.");
      }
    };

    const loadCourses = async () => {
      try {
        const data = await fetchAllCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses.");
      }
    };

    const loadCourseSlotDetails = async () => {
      try {
        const data = await fetchCourslotData(courseslotid);
        console.log(data);
        setInitialData(data);
        setSemesterid(data.semester);
        setCurriculumid(data.curriculum_id);
        form.setValues({
          semester: data.semester,
          courseSlotName: data.name,
          type: data.type,
          information: data.course_slot_info,
          courses: data.courses.map((course) => course.toString()),
          duration: data.duration,
          minLimit: data.min_registration_limit,
          maxLimit: data.max_registration_limit,
        });
        setSelectedCourses(data.courses.map((course) => course.toString()));
        // handleCourseSelect(data.courses.map((course) => course));
      } catch (err) {
        setError("Failed to load course slot details.");
      } finally {
        setLoading(false);
      }
    };

    loadCourseSlotChoices();
    loadCourses();
    loadCourseSlotDetails();
  }, [courseslotid]);
  console.log(form.values);
  // const [searchParams] = useSearchParams();
  // const semesterid = searchParams.get("semesterid");
  // const curriculumid = searchParams.get("curriculumid");

  useEffect(() => {
    const loadSemesterDetails = async () => {
      try {
        if (semesterid && curriculumid) {
          const data = await fetchSemesterDetails(curriculumid, semesterid);
          const formattedOptions = data.semesters.map((semester) => ({
            value: semester.semester_id.toString(),
            label: `${data.curriculum_name} v${data.curriculum_version} Sem-${semester.semester_number}`,
          }));
          setSemesterOptions(formattedOptions);
          if (semesterid) {
            form.setFieldValue("semester", semesterid.toString());
          }
        }
      } catch (err) {
        console.error("Error fetching semester details:", err);
      }
    };

    loadSemesterDetails();
  }, [semesterid, curriculumid]);

  const handleCourseSelect = (selectedId) => {
    console.log("Selected courses:", selectedId);
    // console.log(selectedId);
    form.setFieldValue("courses", selectedId);
    // form.setFieldValue("courses", (prevCourses) => {
    //   // prevCourses is the previous value of the "courses" field
    //   console.log("Previous courses:", prevCourses);

    //   // Perform any logic you need with prevCourses and selectedId
    //   const updatedCourses = [...prevCourses, ...selectedId]; // Example: Merge previous and new selected IDs

    //   console.log("Updated courses:", updatedCourses);
    //   return updatedCourses;
    // });

    console.log("Updated courses:", selectedId);
  };

  // useEffect(() => {
  //   handleCourseSelect(form.values.courses.map((course) => course.toString()));
  // }, [form.values.courses[0]]);

  const filteredCourses = courses.filter(
    (course) => !selectedCourses.includes(course.id),
  );

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = {
        semester: values.semester,
        name: values.courseSlotName,
        type: values.type,
        course_slot_info: values.information,
        courses: values.courses,
        duration: values.duration,
        min_registration_limit: values.minLimit,
        max_registration_limit: values.maxLimit,
      };
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${host}/programme_curriculum/api/admin_edit_courseslot/${courseslotid}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        window.location.href = `/programme_curriculum/view_curriculum/?curriculum=${curriculumid}`;
      }
    } catch (err) {
      console.error("Error updating course slot:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            maxWidth: "290vw",
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
                <Text size="xl" weight={700} align="center">
                  Edit Course Slot Form
                </Text>

                <Select
                  label="For Semester"
                  placeholder="Select Semester"
                  data={semesterOptions}
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
                  placeholder={loading ? "Loading..." : "Select Type"}
                  data={options}
                  value={form.values.type}
                  onChange={(value) => form.setFieldValue("type", value)}
                  required
                  disabled={loading || error !== null}
                  searchable
                  onSearchChange={setSearchValue}
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

                <MultiSelect
                  label="Courses"
                  placeholder="Search and select courses"
                  data={filteredCourses.map((course) => ({
                    value: `${course.id}`,
                    label: `${course.code} - ${course.name} (${course.version})`,
                  }))}
                  value={form.values.courses.map((course) => course)}
                  onChange={handleCourseSelect}
                  searchable
                  nothingFound="No courses available"
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
        </div>
      </Container>
    </div>
  );
}

export default Admin_edit_course_slot_form;
