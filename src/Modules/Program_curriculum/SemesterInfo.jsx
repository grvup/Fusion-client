import React, { useState } from "react";
import { Container, Button, Table, Flex, Text } from "@mantine/core";
import PropTypes from "prop-types";

export default function SemesterInfo({ curriculum }) {
  const [activeTab, setActiveTab] = useState(0);

  const sampleSemester = {
    semester_no: 1,
    is_instigated: false,
    start_date: null,
    end_date: null,
    info: null,
  };

  const courseSlots = [
    {
      id: "NS1",
      type: "Natural Science",
      courseCode: "NS101",
      courseName: "Mathematics-I",
      credits: 4,
    },
    {
      id: "NS2",
      type: "Natural Science",
      courseCode: "NS102",
      courseName: "Engineering Mechanics",
      credits: 4,
    },
  ];

  const handleInstigateSemester = () => {
    console.log("Semester Instigated!");
  };

  const handleAddCourseSlot = () => {
    console.log("Add Course Slot!");
  };

  const handleEditSlot = (slotId) => {
    console.log(`Edit Slot: ${slotId}`);
  };

  const handleRemoveSlot = (slotId) => {
    console.log(`Remove Slot: ${slotId}`);
  };

  const renderTableRows = (data) =>
    data.map((slot, index) => (
      <tr key={slot.id}>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            color: "#3498db",
            backgroundColor: index % 2 === 0 ? "#E6F7FF" : "#D5EAF8",
            borderRight: "1px solid #d3d3d3",
          }}
        >
          {slot.courseCode}
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "left",
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#E6F7FF",
            borderRight: "1px solid #d3d3d3",
          }}
        >
          {slot.courseName}
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            backgroundColor: index % 2 === 0 ? "#E6F7FF" : "#D5EAF8",
          }}
        >
          {slot.credits}
        </td>
        <td
          style={{
            padding: "15px 20px",
            textAlign: "center",
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#E6F7FF",
          }}
        >
          <Button
            variant="outline"
            color="blue"
            onClick={() => handleEditSlot(slot.id)}
            size="xs"
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            color="red"
            onClick={() => handleRemoveSlot(slot.id)}
            size="xs"
          >
            Remove
          </Button>
        </td>
      </tr>
    ));

  return (
    <Container
      style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
    >
      {/* Breadcrumb Section */}
      <Flex justify="flex-start" align="center" mb={20}>
        <Text size="md" weight={500} style={{ color: "#2C3E50" }}>
          Program and Curriculum &gt; Curriculums &gt; CSE UG Curriculum
        </Text>
      </Flex>

      {/* Tabs for Semester Info and Course Slots */}
      <Flex mb={20}>
        <Button
          variant={activeTab === 0 ? "filled" : "outline"}
          onClick={() => setActiveTab(0)}
          style={{ marginRight: "10px" }}
        >
          Semester {sampleSemester.semester_no} Info
        </Button>
        <Button
          variant={activeTab === 1 ? "filled" : "outline"}
          onClick={() => setActiveTab(1)}
        >
          Semester {sampleSemester.semester_no} Course Slots
        </Button>
      </Flex>

      {/* Conditional Rendering for Semester Info Tab */}
      {activeTab === 0 && (
        <div>
          <Text size="lg" weight={600}>
            Curriculum: {curriculum || "CSE UG Curriculum v1.0"}
          </Text>
          <Text size="md" weight={500}>
            Semester: {sampleSemester.semester_no}
          </Text>

          <Table
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #d3d3d3",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  Instigate Semester
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#E6F7FF",
                    color: sampleSemester.is_instigated ? "green" : "red",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {sampleSemester.is_instigated ? "Active" : "Not Yet"}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                  }}
                >
                  Start Semester Date
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  {sampleSemester.start_date || "None"}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                  }}
                >
                  End Semester Date
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#E6F7FF",
                    textAlign: "center",
                  }}
                >
                  {sampleSemester.end_date || "None"}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                  }}
                >
                  Semester Information
                </td>
                <td
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  {sampleSemester.info || "None"}
                </td>
              </tr>
            </tbody>
          </Table>

          <Flex mt={20}>
            <Button
              variant="filled"
              color="blue"
              onClick={handleInstigateSemester}
              style={{ marginRight: "10px" }}
            >
              Instigate Semester
            </Button>
            <Button
              variant="filled"
              color="green"
              onClick={handleAddCourseSlot}
            >
              Add Course Slot
            </Button>
          </Flex>
        </div>
      )}

      {/* Conditional Rendering for Course Slots Tab */}
      {activeTab === 1 && (
        <div>
          <Text size="md" weight={500} mb={10}>
            Course slots for Semester {sampleSemester.semester_no}
          </Text>
          <Table
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #d3d3d3",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                  }}
                >
                  Course Code
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                  }}
                >
                  Course Name
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                  }}
                >
                  Credits
                </th>
                <th
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    textAlign: "center",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{renderTableRows(courseSlots)}</tbody>
          </Table>

          <Flex mt={20}>
            <Button
              variant="filled"
              color="green"
              onClick={handleAddCourseSlot}
            >
              Add Course Slot
            </Button>
          </Flex>
        </div>
      )}
    </Container>
  );
}

SemesterInfo.propTypes = {
  curriculum: PropTypes.string,
};
