import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  Flex,
  Group,
  Modal,
  Text,
} from "@mantine/core";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { host } from "../../routes/globalRoutes";

export default function SemesterInfo() {
  const [activeTab, setActiveTab] = useState(0);

  const [searchParams] = useSearchParams();
  const semesterId = searchParams.get("semester_id");
  const curriculumId = searchParams.get("curriculum_id");
  const [semcourseSlots, setsemCourseSlots] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  useEffect(() => {
    const fetchsemCourseslotData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token

        const response = await axios.get(
          `${host}/programme_curriculum/api/admin_semester/${semesterId}`, // Use backticks for template literal
          {
            headers: {
              Authorization: `Token ${token}`, // Add the Authorization header
            },
          },
        );
        // console.log(response)
        setsemCourseSlots(response.data);
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchsemCourseslotData();
  }, []);

  // console.log(semcourseSlots)
  const handleDeleteCourseSlot = async () => {
    if (!slotToDelete) return; // Add safety check

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `${host}/programme_curriculum/api/admin_delete_courseslot/${slotToDelete}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // Remove the deleted course slot from the state
        setsemCourseSlots((prevSlots) => ({
          ...prevSlots,
          course_slots: prevSlots.course_slots.filter(
            (slot) => slot.id !== slotToDelete,
          ),
        }));
        alert("Course slot deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting course slot:", error);
      alert("Failed to delete course slot.");
    } finally {
      setDeleteModalOpen(false);
      setSlotToDelete(null);
    }
  };
  if (loading) return <div>Loading...</div>;

  const renderCourseTables = (data) =>
    data.map((slot) => (
      <Table
        key={slot.id}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid #d3d3d3",
          marginBottom: "20px", // add spacing between table
          width: "100%", // full width for the table
        }}
      >
        <thead>
          <tr>
            <th
              colSpan="4"
              style={{
                padding: "15px 20px",
                backgroundColor: "#F9F9F9",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.25rem",
                borderBottom: "1px solid #d3d3d3",
              }}
            >
              {slot.name || "NS1"}
            </th>
          </tr>
          <tr>
            <th
              colSpan="4"
              style={{
                padding: "15px 20px",
                backgroundColor: "#F9F9F9",
                textAlign: "center",
                fontWeight: "bold",
                borderBottom: "1px solid #d3d3d3",
              }}
            >
              Type : {slot.type || "Natural Science"}
            </th>
          </tr>
          <tr>
            <th
              style={{
                padding: "12px 20px",
                backgroundColor: "#C5E2F6",
                color: "#3498db",
                textAlign: "center",
                width: "20%", // fixed width for Course Code
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
                width: "40%", // fixed width for Course Name
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
                width: "20%", // fixed width for Credits
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
                width: "20%", // fixed width for Actions
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {slot.courses.map((course) => (
            <tr key={`${slot.id}-${course.courseCode}`}>
              <td
                style={{
                  padding: "15px 20px",
                  textAlign: "center",
                  color: "#3498db",
                  backgroundColor: "#ffffff",
                  borderRight: "1px solid #d3d3d3",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                <a
                  href={`/programme_curriculum/admin_course/${course.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {course.code}
                </a>
              </td>
              <td
                style={{
                  padding: "15px 20px",
                  textAlign: "left",
                  backgroundColor: "#ffffff",
                  borderRight: "1px solid #d3d3d3",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                {course.name}
              </td>
              <td
                style={{
                  padding: "15px 20px",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  borderRight: "1px solid #d3d3d3",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                {course.credit}
              </td>
              <td
                style={{
                  padding: "15px 20px",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  borderRight: "1px solid #d3d3d3",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                <a
                  href={`/programme_curriculum/acad_admin_edit_course_form/${course.id}`}
                >
                  <Button
                    variant="outline"
                    color="green"
                    size="xs"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                </a>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" style={{ textAlign: "right", padding: "10px" }}>
              <a
                href={`/programme_curriculum/admin_edit_course_slot_form/${slot.id}`}
              >
                <Button
                  variant="solid"
                  color="green"
                  size="md"
                  style={{ marginRight: "10px" }}
                >
                  Edit Slot
                </Button>
              </a>
              <Button
                variant="solid"
                color="red"
                size="md"
                onClick={() => {
                  setSlotToDelete(slot.id);
                  setDeleteModalOpen(true);
                }}
              >
                Remove Slot
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    ));

  return (
    <Container
      style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
    >
      {/* Breadcrumb Section */}
      {/* <Flex justify="flex-start" align="center" mb={20}>
        <Text size="md" weight={500} style={{ color: "#2C3E50" }}>
          Program and Curriculum &gt; Curriculums &gt; CSE UG Curriculum
        </Text>
      </Flex> */}
      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Warning"
        centered
      >
        <Text size="md" mb="xl">
          Are you sure you want to remove this course slot?
        </Text>
        <Group position="right">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteCourseSlot}>
            Remove
          </Button>
        </Group>
      </Modal>

      {/* Tabs for Semester Info and Course Slots */}
      <Flex mb={20}>
        <Button
          variant={activeTab === 0 ? "filled" : "outline"}
          onClick={() => setActiveTab(0)}
          style={{ marginRight: "10px" }}
        >
          Semester {semcourseSlots.semester_no} Info
        </Button>
        <Button
          variant={activeTab === 1 ? "filled" : "outline"}
          onClick={() => setActiveTab(1)}
        >
          Semester {semcourseSlots.semester_no} Course Slots
        </Button>
      </Flex>

      {/* Conditional Rendering for Semester Info Tab */}
      {activeTab === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left side: Semester Information Table */}
          <div>
            <Table
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #d3d3d3",
                width: "65vw",
              }}
            >
              <tbody>
                {/* First row: Curriculum */}
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      textAlign: "center",
                      fontWeight: "bold",
                      borderBottom: "1px solid #d3d3d3",
                    }}
                  >
                    {semcourseSlots.curriculum || "CSE UG Curriculum "} v
                    {semcourseSlots.curriculum_version}
                  </td>
                </tr>

                {/* Second row: Semester */}
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      textAlign: "center",
                      fontWeight: "bold",
                      borderBottom: "1px solid #d3d3d3",
                    }}
                  >
                    Semester : {semcourseSlots.semester_no}
                  </td>
                </tr>

                {/* Third row: Instigate Semester */}
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
                    }}
                  >
                    Instigate Semester
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      color: semcourseSlots.is_instigated ? "green" : "red",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {semcourseSlots.instigate_semester ? "Active" : "Not Yet"}
                  </td>
                </tr>

                {/* Fourth row: Start Semester Date */}
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
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
                    {semcourseSlots.start_semester || "None"}
                  </td>
                </tr>

                {/* Fifth row: End Semester Date */}
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
                    }}
                  >
                    End Semester Date
                  </td>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#C5E2F6",
                      textAlign: "center",
                    }}
                  >
                    {semcourseSlots.end_semester || "None"}
                  </td>
                </tr>

                {/* Sixth row: Semester Information */}
                <tr>
                  <td
                    style={{
                      padding: "15px 20px",
                      backgroundColor: "#ffffff",
                      color: "#3498db",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRight: "1px solid #d3d3d3",
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
                    {semcourseSlots.semester_info || "None"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Right side: Buttons */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              margin: "0 1vw",
            }}
          >
            <Group>
              {/* <a
                href={`/programme_curriculum/acad_admin_instigate_form?semester=
                  ${semcourseSlots.semester_no}`}
              >
                <Button
                  variant="filled"
                  color="blue"
                  spacing="md"
                  direction="column"
                  style={{ width: "12vw" }}
                  // onClick={handleInstigateSemester}
                  // style={{ marginBottom: "10px" }}
                >
                  Instigate Semester
                </Button>
              </a> */}
              {/* <Link to="/programme_curriculum/acad_admin_add_courseslot_form"> */}
              <Link
                to={`/programme_curriculum/acad_admin_add_courseslot_form?semester=${semesterId}&curriculum=${curriculumId}`}
              >
                <Button
                  variant="filled"
                  color="green"
                  style={{ width: "12vw" }}
                >
                  Add Course Slot
                </Button>
              </Link>
            </Group>
          </div>
        </div>
      )}

      {/* Conditional Rendering for Course Slots Tab */}
      {activeTab === 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ width: "65vw" }}>
            {renderCourseTables(semcourseSlots.course_slots)}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              margin: "0 1vw",
            }}
          >
            <Group>
              {/* <a
                href={`/programme_curriculum/acad_admin_instigate_form?semester=
                  ${semcourseSlots.semester_no}`}
              >
                <Button
                  variant="filled"
                  color="blue"
                  spacing="md"
                  direction="column"
                  style={{ width: "12vw" }}
                >
                  Instigate Semester
                </Button>
              </a> */}
              <Link
                to={`/programme_curriculum/acad_admin_add_courseslot_form?semester=${semesterId}&curriculum=${curriculumId}`}
              >
                <Button
                  variant="filled"
                  color="green"
                  style={{ width: "12vw" }}
                >
                  Add Course Slot
                </Button>
              </Link>
            </Group>
          </div>
        </div>
      )}
    </Container>
  );
}
