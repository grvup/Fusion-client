import React, { useState } from "react";
import {
  Card,
  Text,
  Button,
  TextInput,
  Alert,
  Modal,
  Group,
  NumberInput,
  Select,
  Loader,
} from "@mantine/core";
import axios from "axios";
import FusionTable from "../../components/FusionTable";
import {
  addStudentCourseRoute,
  dropStudentCourseRoute,
  getStudentCourseRoute,
} from "../../routes/academicRoutes";

function StudentCourses() {
  const [rollNo, setRollNo] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [dropModalOpen, setDropModalOpen] = useState(false);
  const [courseToDrop, setCourseToDrop] = useState(null);
  const [newCourse, setNewCourse] = useState({
    course_id: "",
    courseslot_id: "",
    semester_no: 0,
    registration_type: "",
    working_year: "",
    old_course: "",
  });
  const [loading, setLoading] = useState(false);

  const handleGetCourses = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        getStudentCourseRoute,
        {
          rollno: rollNo,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log("Fetched Courses:", response.data);
      setStudentData(response.data);
    } catch (fetchError) {
      setError(fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (regId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${dropStudentCourseRoute}?id=${regId}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      // console.log("Fetched Courses:", response.data);
      if (response.status === 200) {
        alert("Course dropped Successfully!");
        await handleGetCourses();
      }
    } catch (fetchError) {
      setError(fetchError);
    } finally {
      setDropModalOpen(false);
      setLoading(false);
    }
  };

  const confirmDrop = (regId) => {
    setCourseToDrop(regId);
    setDropModalOpen(true);
  };

  const handleAddCourse = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      return;
    }
    const formData = new FormData();
    formData.append("course_id", newCourse.course_id);
    formData.append("courseslot_id", newCourse.courseslot_id);
    formData.append("registration_type", newCourse.registration_type);
    formData.append("roll_no", rollNo);
    formData.append("semester_id", newCourse.semester_no);
    formData.append("working_year", newCourse.working_year);
    formData.append("old_course", newCourse.old_course);
    setLoading(true);
    try {
      const response = await axios.post(addStudentCourseRoute, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // console.log("Fetched Courses:", response.data);
      if (response.status === 200) {
        alert("Course Added Successfully!");
        handleGetCourses();
      }
    } catch (fetchError) {
      setError(fetchError);
    } finally {
      setLoading(false);
    }
    setAddModalOpen(false);
  };

  const totalCredits = studentData
    ? studentData.details.reduce((sum, course) => sum + course.credits, 0)
    : 0;

  const columnNames = [
    "Reg ID",
    "Course Code",
    "Course Name",
    "Credits",
    "Semester",
    "Type",
    "Replaced By",
    "Actions",
  ];

  const mappedCourses = studentData
    ? studentData.details.map((course) => ({
        "Reg ID": course.rid,
        "Course Code": course.course_id,
        "Course Name": course.course_name,
        Credits: course.credits,
        Semester: course.sem,
        Type: course.registration_type,
        "Replaced By": course.replaced_by
          ? `${course?.replaced_by?.course_id.code} - ${course?.replaced_by?.course_id.name} - Sem - ${course?.replaced_by?.semester_id?.semester_no}`
          : "NA",
        Actions: (
          <Button
            variant="outline"
            color="red"
            size="xs"
            onClick={() => confirmDrop(course.reg_id)}
          >
            Drop
          </Button>
        ),
      }))
    : [];

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", width: "100%", color: "#3B82F6" }}
      >
        Registered Courses For Sem-2 AY 2024-25
      </Text>

      <TextInput
        placeholder="Enter Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        mb="lg"
        label="Student Roll Number"
      />
      <Button
        style={{ backgroundColor: "#3B82F6", color: "white" }}
        onClick={handleGetCourses}
        mb="md"
      >
        Fetch Courses
      </Button>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader variant="dots" />
        </div>
      ) : (
        <>
          {error && (
            <Alert title="Error: No Data" color="red" mt="lg">
              {error}
            </Alert>
          )}

          {studentData && (
            <>
              <Text weight={500} mb="lg">
                Name: {studentData.dict2.firstname} {studentData.dict2.lastname}
              </Text>
              <Text weight={500} mb="lg">
                Roll Number: {studentData.dict2.roll_no}
              </Text>

              <div style={{ overflowX: "auto" }}>
                <FusionTable
                  columnNames={columnNames}
                  elements={mappedCourses}
                  width="100%"
                />
              </div>

              <Button
                style={{
                  backgroundColor: "#4CBB17",
                  color: "white",
                }}
                mt="lg"
                onClick={() => setAddModalOpen(true)}
              >
                Add Course
              </Button>

              <Text weight={700} mt="lg">
                Total Credits: {totalCredits}
              </Text>
            </>
          )}

          {/* Add Course Modal */}
          <Modal
            opened={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            title="Add New Course"
          >
            <Select
              label="Course Slot"
              placeholder="Enter Course Slot"
              value={newCourse.courseslot_id}
              onChange={(value) =>
                setNewCourse({ ...newCourse, courseslot_id: value })
              }
              data={
                studentData
                  ? studentData.courseslot_list.map((slot) => ({
                      value: slot.id.toString(),
                      label: slot.name,
                    }))
                  : []
              }
              mb="sm"
              searchable
            />
            <Select
              label="Course ID"
              placeholder="Enter Course ID"
              value={newCourse.course_id}
              onChange={(value) =>
                setNewCourse({ ...newCourse, course_id: value })
              }
              data={
                studentData
                  ? studentData.course_list.map((course) => ({
                      value: course.id.toString(),
                      label: `${course.code} - ${course.name}`,
                    }))
                  : []
              }
              mb="sm"
              searchable
            />
            <Select
              label="Semester"
              placeholder="Enter Semester"
              value={newCourse.semester_no}
              onChange={(value) =>
                setNewCourse({ ...newCourse, semester_no: value })
              }
              mb="sm"
              data={
                studentData
                  ? studentData.semester_list.map((sem) => ({
                      value: sem.id.toString(),
                      label: `Semester - ${sem.semester_no}`,
                    }))
                  : []
              }
              searchable
            />
            <NumberInput
              label="Working Year"
              placeholder="Enter Working Year"
              value={newCourse.working_year}
              onChange={(value) =>
                setNewCourse({ ...newCourse, working_year: value })
              }
              mb="sm"
            />
            <Select
              label="Type"
              placeholder="Select Type"
              data={["Regular", "Improvement", "Backlog", "Audit"]}
              value={newCourse.registration_type}
              onChange={(value) =>
                setNewCourse({ ...newCourse, registration_type: value })
              }
              searchable
              mb="sm"
            />
            <Select
              label="Replace Course"
              placeholder="Select the course to replace"
              data={
                studentData
                  ? studentData.details.map((course) => ({
                      value: course.reg_id.toString(),
                      label: `${course.course_id} - sem - ${course.sem}`,
                    }))
                  : []
              }
              value={newCourse.old_course}
              onChange={(value) =>
                setNewCourse({ ...newCourse, old_course: value })
              }
              searchable
              mb="sm"
            />
            <Group position="right">
              <Button color="green" onClick={handleAddCourse}>
                Add
              </Button>
            </Group>
          </Modal>

          <Modal
            opened={dropModalOpen}
            onClose={() => setDropModalOpen(false)}
            title="Confirm Course Drop"
          >
            <Text>Are you sure you want to drop this course?</Text>
            <Text weight={600} mt="sm">
              This action cannot be undone!
            </Text>
            <Group position="right" mt="lg">
              <Button variant="outline" onClick={() => setDropModalOpen(false)}>
                Cancel
              </Button>
              <Button color="red" onClick={() => handleDrop(courseToDrop)}>
                Confirm Drop
              </Button>
            </Group>
          </Modal>
        </>
      )}
    </Card>
  );
}
export default StudentCourses;
