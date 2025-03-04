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
} from "@mantine/core";
import FusionTable from "../../components/FusionTable";

const mockAllocationsAPIResponse = [
  {
    batch: "2022",
    semester: 6,
    year: 2024,
    courses: [
      {
        regId: "2022-CS301",
        courseId: "CS301",
        courseName: "Computer Networks",
        version: "1.0",
        credits: 3,
        professorCode: "P001",
      },
      {
        regId: "2022-CS302",
        courseId: "CS302",
        courseName: "Operating Systems",
        version: "1.0",
        credits: 3,
        professorCode: "P002",
      },
    ],
  },
];

function AllocateCourses() {
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [allocationData, setAllocationData] = useState(null);
  const [error, setError] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    regId: "",
    courseId: "",
    courseName: "",
    version: "",
    credits: 0,
    professorCode: "",
  });

  // Simulate API Call
  const fetchAllocations = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAllocationsAPIResponse);
      }, 500);
    });
  };

  const handleGetAllocations = async () => {
    setError("");
    setAllocationData(null);

    const data = await fetchAllocations();
    const allocationFound = data.find(
      (allocation) =>
        allocation.batch === batch &&
        allocation.semester === parseInt(semester, 10) &&
        allocation.year === parseInt(year, 10),
    );

    if (!allocationFound) {
      setError("No allocations found.");
      return;
    }

    setAllocationData(allocationFound);
  };

  const handleStartAllocation = () => {
    setAllocationData({
      batch,
      semester: parseInt(semester, 10),
      year: parseInt(year, 10),
      courses: [],
    });
    setError("");
  };

  const handleAddCourse = () => {
    if (allocationData) {
      setAllocationData({
        ...allocationData,
        courses: [...allocationData.courses, newCourse],
      });
      setAddModalOpen(false);
      setNewCourse({
        regId: "",
        courseId: "",
        courseName: "",
        version: "",
        credits: 0,
        professorCode: "",
      });
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text size="lg" weight={700} mb="md" align="center" color="blue">
        Allocated Courses
      </Text>

      <TextInput
        placeholder="Enter Batch"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        mb="lg"
        label="Batch"
      />
      <NumberInput
        placeholder="Enter Semester"
        value={semester}
        onChange={(value) => setSemester(value)}
        mb="lg"
        label="Semester"
      />
      <NumberInput
        placeholder="Enter Year"
        value={year}
        onChange={(value) => setYear(value)}
        mb="lg"
        label="Year"
      />
      <Button
        style={{ backgroundColor: "#3B82F6", color: "white" }}
        onClick={handleGetAllocations}
        mb="md"
      >
        Fetch Allocations
      </Button>

      {/* Show error message */}
      {error && (
        <Alert title="No Data Found" color="red" mt="lg">
          No allocation data found. Please start allocation for batch {batch},
          semester {semester}, year {year}.
        </Alert>
      )}

      {/* Show Start Allocation button only if no data exists */}
      {error && (
        <Button
          style={{ backgroundColor: "#4CBB17", color: "white" }}
          mt="md"
          onClick={handleStartAllocation}
        >
          Start Allocation
        </Button>
      )}

      {/* Show Allocations when data exists */}
      {allocationData && (
        <>
          <Text weight={500} mt="lg">
            Batch: {allocationData.batch}
          </Text>
          <Text weight={500} mt="lg">
            Semester: {allocationData.semester}
          </Text>
          <Text weight={500} mt="lg">
            Year: {allocationData.year}
          </Text>

          <div style={{ overflowX: "auto" }}>
            <FusionTable
              columnNames={[
                "Reg ID",
                "Course Code",
                "Course Name",
                "Version",
                "Credits",
                "Professor Code",
              ]}
              elements={allocationData.courses.map((course) => ({
                "Reg ID": course.regId,
                "Course Code": course.courseId,
                "Course Name": course.courseName,
                Version: course.version,
                Credits: course.credits,
                "Professor Code": course.professorCode,
              }))}
              width="100%"
            />
          </div>

          <Button
            style={{ backgroundColor: "#4CBB17", color: "white" }}
            mt="lg"
            onClick={() => setAddModalOpen(true)}
          >
            Allocate Course
          </Button>
        </>
      )}

      {/* Add Course Modal */}
      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Allocate New Course"
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
        <TextInput
          label="Version"
          placeholder="Enter Version"
          value={newCourse.version}
          onChange={(e) =>
            setNewCourse({ ...newCourse, version: e.target.value })
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
        <TextInput
          label="Professor Code"
          placeholder="Enter Professor Code"
          value={newCourse.professorCode}
          onChange={(e) =>
            setNewCourse({ ...newCourse, professorCode: e.target.value })
          }
          mb="sm"
        />
        <Group position="right">
          <Button color="green" onClick={handleAddCourse}>
            Allocate
          </Button>
        </Group>
      </Modal>
    </Card>
  );
}

export default AllocateCourses;
