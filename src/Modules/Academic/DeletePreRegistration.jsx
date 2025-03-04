import { useState } from "react";
import {
  Card,
  Text,
  Button,
  TextInput,
  Alert,
  Group,
  Modal,
} from "@mantine/core";
import FusionTable from "../../components/FusionTable";

const hardcodedRegistrations = [
  {
    studentInfo: {
      rollNo: "22BCSD01",
      preRegistrationFlag: true,
      finalRegistrationFlag: true,
    },
    registrations: [
      {
        semester: "CSE UG Curriculum v1.1, sem-6",
        course: "IT3C03 - Web and mobile App development- v1.0",
        courseSlot: "CSE UG Curriculum v1.1, sem-6, IT4",
        timestamp: "Nov. 18, 2024, 11:22 p.m.",
        priority: 1,
      },
      {
        semester: "CSE UG Curriculum v1.1, sem-6",
        course: "OE4L01 - Japanese Language Course - Level-1- v1.1",
        courseSlot: "CSE UG Curriculum v1.1, sem-6, OE6",
        timestamp: "Nov. 18, 2024, 11:22 p.m.",
        priority: 1,
      },
      {
        semester: "CSE UG Curriculum v1.1, sem-6",
        course: "OE3D12 - Communication Skills Management- v1.0",
        courseSlot: "CSE UG Curriculum v1.1, sem-6, OE6",
        timestamp: "Nov. 18, 2024, 11:22 p.m.",
        priority: 2,
      },
      {
        semester: "CSE UG Curriculum v1.1, sem-6",
        course: "OE2C09 - Graph Theory- v1.0",
        courseSlot: "CSE UG Curriculum v1.1, sem-6, OE6",
        timestamp: "Nov. 18, 2024, 11:22 p.m.",
        priority: 3,
      },
    ],
  },
];

function RegistrationSearch() {
  const [rollNo, setRollNo] = useState("");
  const [semester, setSemester] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSearch = () => {
    if (!rollNo || !semester) {
      setError("Please fill both Roll No and Semester fields");
      return;
    }

    const foundStudent = hardcodedRegistrations.find(
      (reg) => reg.studentInfo.rollNo === rollNo,
    );

    if (!foundStudent) {
      setError("No registrations found for this student");
      setSearchResults(null);
      return;
    }

    const semesterCourses = foundStudent.registrations.filter((course) => {
      // Assume course.semester is something like "CSE UG Curriculum v1.1, sem-6"
      const match = course.semester.match(/sem-(\d+)/);
      // If a match is found, match[1] will be the semester number as a string
      return match && match[1] === semester;
    });

    if (semesterCourses.length === 0) {
      setError("No courses found for this semester");
      setSearchResults(null);
      return;
    }

    setError("");
    setSearchResults({
      studentInfo: foundStudent.studentInfo,
      courses: semesterCourses,
    });
  };

  const columnNames = [
    "Course",
    "Semester",
    "Course Slot",
    "Timestamp",
    "Priority",
  ];

  const mappedResults = searchResults
    ? searchResults.courses.map((result) => ({
        Course: result.course,
        Semester: result.semester,
        "Course Slot": result.courseSlot,
        Timestamp: result.timestamp,
        Priority: result.priority,
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
        Search and Manage Registrations
      </Text>

      <div style={{ maxWidth: "100%", gap: 16, display: "grid" }}>
        <TextInput
          label="Roll No:"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        <TextInput
          label="Semester:"
          placeholder="Enter Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        <Button
          size="md"
          radius="sm"
          onClick={handleSearch}
          style={{ backgroundColor: "#3B82F6", color: "white" }}
        >
          Search
        </Button>
      </div>

      {error && (
        <Alert title="Error" color="red" mt="md">
          {error}
        </Alert>
      )}

      {searchResults && (
        <div style={{ marginTop: 20 }}>
          <Text weight={600} mb="sm" size="xl">
            Search Results
          </Text>

          <Text weight={600} size="lg" mb="md" style={{ color: "#3B82F6" }}>
            Initial Registrations:
          </Text>

          <div style={{ overflowX: "auto" }}>
            <FusionTable
              columnNames={columnNames}
              elements={mappedResults}
              width="100%"
            />
          </div>

          <Text
            weight={600}
            size="lg"
            mt="lg"
            mb="md"
            style={{ color: "#3B82F6" }}
          >
            Student Registration Check:
          </Text>

          <Card
            shadow="sm"
            p="md"
            withBorder
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Group spacing="xs" mb={4}>
              <Text weight={500}>Student Roll No:</Text>
              <Text style={{ fontWeight: 600 }}>
                {searchResults.studentInfo.rollNo}
              </Text>
            </Group>
            <Group spacing="xs" mb={4}>
              <Text weight={500}>Pre-Registration Flag:</Text>
              <Text
                color={
                  searchResults.studentInfo.preRegistrationFlag
                    ? "green"
                    : "red"
                }
                weight={600}
              >
                {searchResults.studentInfo.preRegistrationFlag
                  ? "True"
                  : "False"}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text weight={500}>Final Registration Flag:</Text>
              <Text
                color={
                  searchResults.studentInfo.finalRegistrationFlag
                    ? "green"
                    : "red"
                }
                weight={600}
              >
                {searchResults.studentInfo.finalRegistrationFlag
                  ? "True"
                  : "False"}
              </Text>
            </Group>
            <Group position="right" mt="md">
              <Button
                variant="outline"
                color="red"
                size="sm"
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete Pre-Registration
              </Button>
            </Group>
          </Card>
        </div>
      )}

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <Text mb="sm">
          Are you sure you want to delete pre-registration details?
        </Text>
        <Text weight={600} mb="lg">
          This action cannot be undone!
        </Text>
        <Group position="right">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              setSearchResults(null);
              setDeleteModalOpen(false);
            }}
          >
            Confirm Delete
          </Button>
        </Group>
      </Modal>
    </Card>
  );
}

export default RegistrationSearch;
