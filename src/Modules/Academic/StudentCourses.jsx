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
} from "@mantine/core";
import FusionTable from "../../components/FusionTable";

const hardcodedStudents = [
  {
    name: "UTKARSH",
    rollNo: "22BCSD01",
    courses: [
      {
        regId: "22BCSD01-CS8011",
        courseId: "CS8011",
        courseName: "Machine Learning",
        credits: 3,
        semester: 6,
        type: "Regular",
      },
      {
        regId: "22BCSD01-OE3C42",
        courseId: "OE3C42",
        courseName: "Data Warehousing and Data Mining",
        credits: 3,
        semester: 6,
        type: "Regular",
      },
      {
        regId: "22BCSD01-OE3D06",
        courseId: "OE3D06",
        courseName: "Indian Philosophy and Literature in English",
        credits: 3,
        semester: 6,
        type: "Regular",
      },
      {
        regId: "22BCSD01-PC3003",
        courseId: "PC3003",
        courseName: "Professional Development Course 3",
        credits: 1,
        semester: 6,
        type: "Regular",
      },
      {
        regId: "22BCSD01-IT3C03",
        courseId: "IT3C03",
        courseName: "Web and Mobile App Development",
        credits: 2,
        semester: 6,
        type: "Regular",
      },
      {
        regId: "22BCSD01-DS3014",
        courseId: "DS3014",
        courseName: "Fabrication Project",
        credits: 4,
        semester: 6,
        type: "Regular",
      },
    ],
  },
];

function StudentCourses() {
  const [rollNo, setRollNo] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [dropModalOpen, setDropModalOpen] = useState(false);
  const [courseToDrop, setCourseToDrop] = useState(null);
  const [newCourse, setNewCourse] = useState({
    regId: "",
    courseId: "",
    courseName: "",
    credits: 0,
    semester: 0,
    type: "Regular",
  });

  const handleGetCourses = () => {
    const studentFound = hardcodedStudents.find(
      (student) => student.rollNo === rollNo,
    );

    if (!studentFound) {
      setError("No courses found. Please enter a valid roll number.");
      setStudentData(null);
      return;
    }

    setError("");
    setStudentData(studentFound);
  };

  const handleDrop = (regId) => {
    if (studentData) {
      setStudentData({
        ...studentData,
        courses: studentData.courses.filter((course) => course.regId !== regId),
      });
    }
    setDropModalOpen(false);
  };

  const confirmDrop = (regId) => {
    setCourseToDrop(regId);
    setDropModalOpen(true);
  };

  const handleAddCourse = () => {
    if (studentData) {
      setStudentData({
        ...studentData,
        courses: [...studentData.courses, { ...newCourse }],
      });
      setAddModalOpen(false);
      setNewCourse({
        regId: "",
        courseId: "",
        courseName: "",
        credits: 0,
        semester: 0,
        type: "Regular",
      });
    }
  };

  const totalCredits = studentData
    ? studentData.courses.reduce((sum, course) => sum + course.credits, 0)
    : 0;

  const columnNames = [
    "Reg ID",
    "Course Code",
    "Course Name",
    "Credits",
    "Semester",
    "Type",
    "Actions",
  ];

  const mappedCourses = studentData
    ? studentData.courses.map((course) => ({
        "Reg ID": course.regId,
        "Course Code": course.courseId,
        "Course Name": course.courseName,
        Credits: course.credits,
        Semester: course.semester,
        Type: course.type,
        Actions: (
          <Button
            style={{
              backgroundColor: "#FF3131",
              color: "white",
            }}
            size="xs"
            onClick={() => confirmDrop(course.regId)}
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

      {error && (
        <Alert title="Error: No Data" color="red" mt="lg">
          {error}
        </Alert>
      )}

      {studentData && (
        <>
          <Text weight={500} mb="lg">
            Name: {studentData.name}
          </Text>
          <Text weight={500} mb="lg">
            Roll Number: {studentData.rollNo}
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
        <TextInput
          label="Reg ID"
          placeholder="Enter Reg ID"
          value={newCourse.regId}
          onChange={(e) =>
            setNewCourse({ ...newCourse, regId: e.target.value })
          }
          mb="sm"
        />
        <TextInput
          label="Course ID"
          placeholder="Enter Course ID"
          value={newCourse.courseId}
          onChange={(e) =>
            setNewCourse({ ...newCourse, courseId: e.target.value })
          }
          mb="sm"
        />
        <TextInput
          label="Course Name"
          placeholder="Enter Course Name"
          value={newCourse.courseName}
          onChange={(e) =>
            setNewCourse({ ...newCourse, courseName: e.target.value })
          }
          mb="sm"
        />
        <NumberInput
          label="Credits"
          placeholder="Enter Credits"
          value={newCourse.credits}
          onChange={(value) => setNewCourse({ ...newCourse, credits: value })}
          mb="sm"
        />
        <NumberInput
          label="Semester"
          placeholder="Enter Semester"
          value={newCourse.semester}
          onChange={(value) => setNewCourse({ ...newCourse, semester: value })}
          mb="sm"
        />
        <Select
          label="Type"
          placeholder="Select Type"
          data={["Regular", "Audit"]}
          value={newCourse.type}
          onChange={(value) => setNewCourse({ ...newCourse, type: value })}
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
    </Card>
  );
}
export default StudentCourses;
