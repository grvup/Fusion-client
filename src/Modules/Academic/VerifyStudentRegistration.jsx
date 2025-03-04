import { useState, useRef } from "react";
import {
  Card,
  Text,
  Button,
  Select,
  Group,
  Textarea,
  Modal,
  List,
  Grid,
  Loader,
  Notification,
} from "@mantine/core";

function VerifyStudentRegistration() {
  const [batch, setBatch] = useState("");
  const [students, setStudents] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showNoRecords, setShowNoRecords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Fetch student data from API
  const handleFetch = async () => {
    if (!batch) {
      setError("Please select a batch before fetching data.");
      return;
    }

    setLoading(true);
    setShowNoRecords(false);
    setError(null);

    try {
      const response = await fetch(
        `https://your-api.com/students?batch=${batch}`,
      );
      if (!response.ok) throw new Error("Failed to fetch students");

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch registered courses dynamically
  const handleShowCourses = async (rollNo) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://your-api.com/students/${rollNo}/courses`,
      );
      if (!response.ok) throw new Error("Failed to fetch courses");

      const courses = await response.json();
      setSelectedCourses(courses);
      setOpened(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Approve/Decline action
  const handleAction = async (rollNo, action, remarks = "") => {
    try {
      const response = await fetch(
        `https://your-api.com/students/${rollNo}/${action}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ remarks }),
        },
      );

      if (!response.ok) throw new Error(`Failed to ${action} student`);

      setStudents((prev) =>
        prev.filter((student) => student.rollNo !== rollNo),
      );
      if (students.length === 1) setShowNoRecords(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", color: "#3B82F6" }}
      >
        Verify Student Registration
      </Text>

      <Select
        label="Batch"
        placeholder="Select Batch"
        value={batch}
        onChange={setBatch}
        data={["2019", "2020", "2021", "2022", "2023", "2024"].map((year) => ({
          value: year,
          label: year,
        }))}
      />

      <Group position="center" mt="md">
        <Button color="blue" onClick={handleFetch} disabled={loading}>
          {loading ? <Loader size="xs" /> : "Fetch"}
        </Button>
        <Button color="green">Fetch Excel Sheet</Button>
      </Group>

      {error && (
        <Notification color="red" mt="md">
          {error}
        </Notification>
      )}

      {students.length > 0 && (
        <div
          ref={containerRef}
          style={{
            marginTop: "16px",
            maxHeight: "400px",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {students.map((student, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#f9fafb",
                marginBottom: "10px",
              }}
            >
              <Text size="md" weight={600} align="center">
                Roll No: {student.rollNo}
              </Text>

              {/* Student Details in 3:3:3 Format */}
              <Grid gutter="xs" mt="sm">
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Full Name:</b> {student.fullName}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Department:</b> {student.department}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Programme:</b> {student.programme}
                  </Text>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Gender:</b> {student.gender}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Mobile:</b> {student.mobileNumber}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Batch:</b> {student.batch}
                  </Text>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Semester:</b> {student.semester}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Category:</b> {student.category}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>PWD Status:</b> {student.PWDStatus}
                  </Text>
                </Grid.Col>
              </Grid>

              <Group position="center" mt="md">
                <Button
                  color="green"
                  onClick={() => handleAction(student.rollNo, "approve")}
                >
                  Approve
                </Button>
              </Group>

              {/* Fee Details in 3:3:3 Format */}
              <Grid gutter="xs" mt="md">
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Payment Mode:</b> {student.paymentMode}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Transaction ID:</b> {student.transactionId}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Deposit Date:</b> {student.depositDate}
                  </Text>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Actual Fee:</b> ₹{student.actualFee}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Fee Paid:</b> ₹{student.feePaid}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>UTR Number:</b> {student.utrNumber}
                  </Text>
                </Grid.Col>
              </Grid>

              <Text size="sm" weight={700} mt="md">
                Fee Receipt:{" "}
                <a
                  href={student.feeReceipt}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Receipt
                </a>
              </Text>

              <Group position="center" mt="md">
                <Button
                  color="indigo"
                  onClick={() => handleShowCourses(student.rollNo)}
                >
                  View Registered Courses
                </Button>
              </Group>

              <Textarea placeholder="Enter remarks" mt="md" />
              <Group position="center" mt="md">
                <Button
                  color="red"
                  onClick={() => handleAction(student.rollNo, "decline")}
                >
                  Decline
                </Button>
              </Group>
            </div>
          ))}

          {showNoRecords && (
            <Text size="lg" weight={700} align="center" color="red" mt="lg">
              No more records found
            </Text>
          )}
        </div>
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Registered Courses"
        centered
      >
        {selectedCourses.length > 0 ? (
          <List spacing="sm" size="sm">
            {selectedCourses.map((course, index) => (
              <List.Item key={index}>
                {course.name} ({course.code}) - {course.credits} credits
              </List.Item>
            ))}
          </List>
        ) : (
          <Text size="sm">No courses registered.</Text>
        )}
      </Modal>
    </Card>
  );
}

export default VerifyStudentRegistration;
