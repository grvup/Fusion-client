import { React, useEffect, useState } from "react";
import {
  // Breadcrumbs,
  // Anchor,
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
import { useSearchParams } from "react-router-dom";
import axios from "axios";
// import { useSearchParams } from 'react-router-dom';
import {
  fetchAllCourses,
  fetchCourseSlotTypeChoices,
  fetchSemesterDetails,
} from "../api/api";
import { host } from "../../../routes/globalRoutes";

function Admin_add_course_slot_form() {
  const [courses, setCourses] = useState([]);
  // const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [options, setOptions] = useState([]);
  // const [selectedOption, setSelectedOption] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  // const [semesterData, setSemesterData] = useState(null);
  const [semesterOptions, setSemesterOptions] = useState([]);

  useEffect(() => {
    const loadCourseSlotChoices = async () => {
      try {
        const data = await fetchCourseSlotTypeChoices();

        const formattedOptions = data.choices.map((choice) => ({
          value: choice.value,
          label: choice.label,
        }));
        setOptions(formattedOptions);
        setLoading(false);
        // setSelectedOption(data[0]);
      } catch (err) {
        setError("Failed to load course slot type choices.");
        setLoading(false);
      }
    };

    loadCourseSlotChoices();
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllCourses(); // Fetch the courses data
        setCourses(data); // Update the courses state
        setSelectedCourses([]); // Reset the selected courses
      } catch (err) {
        setError("Failed to load courses."); // Handle errors
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    loadCourses(); // Fetch courses on component mount
  }, []);

  const filteredOptions = options.filter((item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase()),
  );
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
  // const { semesterid, curriculumid } = useParams();
  const [searchParams] = useSearchParams();
  // Get the values from the URL
  const semesterid = searchParams.get("semester");
  const curriculumid = searchParams.get("curriculum");
  console.log(semesterid, curriculumid);

  useEffect(() => {
    const loadSemesterDetails = async () => {
      try {
        if (semesterid && curriculumid) {
          const data = await fetchSemesterDetails(curriculumid, semesterid);
          console.log(data);
          // Assuming API response contains curriculum name and semester number
          const formattedOptions = data.semesters.map((semester) => ({
            value: semester.semester_id.toString(),
            label: `${data.curriculum_name} v${data.curriculum_version} Sem-${semester.semester_number}`,
          }));
          setSemesterOptions(formattedOptions);
          // If semesterid exists, set the initial value
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

  // const handleCourseSelect = (selectedId) => {
  //   console.log(selectedId);
  //   // Filter selected courses based on selectedId array
  //   const selectedCourse = courses.filter((course) =>
  //     selectedId.includes(course.id),
  //   );
  //   console.log(selectedCourse);
  //   // Extract only course IDs from selectedCourse
  //   const selectedCourseIds = selectedCourse.map((course) => course.id);
  //   // Avoid duplicate IDs by checking against form values
  //   const newSelectedIds = selectedCourseIds.filter(
  //     (id) => !form.values.courses.includes(id),
  //   );
  //   if (newSelectedIds.length > 0) {
  //     // Update state and form field with unique selected course IDs
  //     setSelectedCourses([...selectedCourses, ...newSelectedIds]);
  //     form.setFieldValue("courses", [
  //       ...form.values.courses,
  //       ...newSelectedIds,
  //     ]);
  //   }
  // };
  const handleCourseSelect = (selectedId) => {
    console.log(selectedId);
    form.setFieldValue("courses", selectedId);

    console.log("Updated courses:", selectedId);
  };

  // const handleRemoveCourse = (courseId) => {
  //   setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
  //   form.setFieldValue(
  //     "courses",
  //     form.values.courses.filter((course) => course.id !== courseId),
  //   );
  // };
  const filteredCourses = courses.filter(
    (course) => !selectedCourses.includes(course.id),
  );

  // const handleSubmit = (values) => {
  //   console.log("Form Submitted:", values);
  // };
  // const handleSubmit = (values) => {
  //   console.log(values);
  // };

  // const breadcrumbItems = [
  //   { title: "Program and Curriculum", href: "#" },
  //   { title: "Curriculums", href: "#" },
  //   { title: "CSE UG Curriculum", href: "#" },
  // ].map((item, index) => (
  //   <Anchor href={item.href} key={index}>
  //     {item.title}
  //   </Anchor>
  // ));

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
      const response = await axios.post(
        `${host}/programme_curriculum/api/admin_add_courseslot/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // onSuccess?.();
        // Redirect to curriculum semesters page
        window.location.href = `/programme_curriculum/view_curriculum/?curriculum=${curriculumid}`;
      }
    } catch (err) {
      console.error("Error submitting course slot:", err);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };
  console.log(form.values);
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
                  Course Slot Form
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

                {/* <Select
                  label="Type"
                  placeholder="Select Type"
                  data={["Lecture", "Lab"]}
                  value={form.values.type}
                  onChange={(value) => form.setFieldValue("type", value)}
                  required
                /> */}
                <Select
                  label="Type"
                  placeholder={loading ? "Loading..." : "Select Type"}
                  data={filteredOptions} // Use the fetched options
                  value={form.values.type} // Bind the value to the form state
                  onChange={(value) => form.setFieldValue("type", value)} // Update the form state
                  required
                  disabled={loading || error !== null} // Disable if loading or an error occurred
                  searchable // Makes the dropdown searchable
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

                {/* <MultiSelect
                  label="Courses"
                  placeholder="Select courses"
                  data={filteredCourses}
                  value={form.values.selectedCourses}
                  onChange={handleCourseSelection}
                  onSearchChange={handleFilter}
                  searchable
                  required
                /> */}
                <MultiSelect
                  label="Courses"
                  placeholder="Search and select courses"
                  data={filteredCourses.map((course) => ({
                    value: `${course.id}`,
                    label: `${course.code} - ${course.name} (${course.version})`,
                  }))}
                  onChange={handleCourseSelect}
                  searchable
                  nothingFound="No courses available"
                  required
                />

                {/* <div>
                  <Text weight={600} size="md" mb="sm">
                    Selected Courses
                  </Text>
                  <Stack>
                    {form.values.courses.map((course) => (
                      <Group key={course.id} position="apart">
                        <Text>
                          {course.code} - {course.name} ({course.version})
                        </Text>
                        <Button
                          color="red"
                          size="xs"
                          onClick={() => handleRemoveCourse(course.id)}
                        >
                          Remove
                        </Button>
                      </Group>
                    ))}
                  </Stack>
                </div> */}
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

export default Admin_add_course_slot_form;
