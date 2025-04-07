import { useState, useRef, useEffect } from "react";
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
import axios from "axios";
import { saveAs } from "file-saver";
import {
  batchesRoute,
  courseListRoute,
  studentListRoute,
  verifyRegistrationRoute,
} from "../../routes/academicRoutes";
import { mediaRoute } from "../../routes/globalRoutes";

function VerifyStudentRegistration() {
  const [batch, setBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showNoRecords, setShowNoRecords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [remarks, setRemarks] = useState({});
  const [dataFetched, setDataFetched] = useState(false); // New state to track if data is fetched

  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(batchesRoute, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Fetched Batches:", response.data.batches);
        setBatches(response.data.batches);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
    console.log(batches, loading);
  }, []);

  // Fetch student data from API
  const handleFetch = async (excel) => {
    if (!batch) {
      setError("Please select a batch before fetching data.");
      return;
    }

    setLoading(true);
    setShowNoRecords(false);
    setError(null);
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${studentListRoute}?excel_export=${excel}&batch=${batch}`,
        {
          batch,
        },
        {
          headers: { Authorization: `Token ${token}` },
          responseType: excel ? "blob" : "json",
        },
      );
      if (excel) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `Student_List_${batch}.xlsx`);
      } else {
        setStudents(response.data.students);
        setDataFetched(true); // Mark data as fetched
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch registered courses dynamically
  const handleShowCourses = async (rollNo, semesterNo) => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        courseListRoute,
        {
          student_id: rollNo,
          semester_no: semesterNo,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log("Fetched Course sata:", response.data);
      setSelectedCourses(response.data.final_registration);
      setOpened(true);
    } catch (fetchError) {
      setError(fetchError);
    } finally {
      setLoading(false);
    }
  };

  // Handle Approve/Decline action
  const handleAction = async (rollNo, action, index) => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      setLoading(false);
      return;
    }
    try {
      // const formData = new FormData();
      // formData.append('status_req', action);
      // console.log(remarks[index]);
      // const remark = remarks[index];
      // formData.append('reason', remark);
      // formData.append('student_id', rollNo);
      const response = await axios.post(
        verifyRegistrationRoute,
        {
          status_req: action,
          student_id: rollNo,
          reason: remarks[index] || "",
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log("Fetched response:", response.data);
      if (action === "accept") {
        setStudents((prev) =>
          prev.filter((stu) => stu.student_id__id !== rollNo),
        );
      } else {
        setStudents((prevStudents) =>
          prevStudents.filter((_, i) => i !== index),
        );
      }
    } catch (fetchError) {
      setError(fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleRemarkChange = (index, value) => {
    setRemarks((prev) => ({ ...prev, [index]: value })); // Update remarks for a particular student
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
        placeholder={loading ? "Loading batches..." : "Select Batch"}
        value={batch}
        onChange={(val) => {
          setBatch(val);
        }}
        data={batches.map((bat) => ({
          value: bat.batch_id.toString(),
          label: `${bat.name} ${bat.discipline} ${bat.year}`,
        }))}
        disabled={loading}
        searchable
      />

      <Group position="center" mt="md">
        <Button
          color="blue"
          onClick={() => handleFetch(false)}
          disabled={loading}
        >
          {loading ? <Loader size="xs" /> : "Fetch"}
        </Button>
        <Button
          color="green"
          onClick={() => handleFetch(true)}
          disabled={loading || !dataFetched} // Disable until data is fetched
        >
          {loading ? <Loader size="xs" /> : "Fetch Excel Sheet"}
        </Button>
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
                Roll No: {student.student_id__id}
              </Text>

              {/* Student Details in 3:3:3 Format */}
              <Grid gutter="xs" mt="sm">
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Full Name:</b> {student.student_id__id__user__first_name}{" "}
                    {student.student_id__id__user__last_name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Department:</b>{" "}
                    {student.student_id__id__department__name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Programme:</b> {student.student_id__programme}
                  </Text>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Gender:</b> {student.student_id__id__sex}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Mobile:</b> {student.student_id__id__phone_no}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Batch:</b> {student.student_id__batch}
                  </Text>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Semester:</b> {student.student_id__curr_semester_no}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Category:</b> {student.student_id__category}
                  </Text>
                </Grid.Col>
                {/* <Grid.Col span={4}>
                  <Text size="sm">
                    <b>PWD Status:</b> {student.PWDStatus}
                  </Text>
                </Grid.Col> */}
              </Grid>

              <Group position="center" mt="md">
                <Button
                  color="green"
                  onClick={() =>
                    handleAction(student.student_id__id, "accept", index)
                  }
                >
                  Approve
                </Button>
              </Group>

              {/* Fee Details in 3:3:3 Format */}
              <Grid gutter="xs" mt="md">
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Payment Mode:</b> {student.mode}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Transaction ID:</b> {student.transaction_id}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Deposit Date:</b> {student.deposit_date}
                  </Text>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Actual Fee:</b> ₹{student.actual_fee}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Fee Paid:</b> ₹{student.fee_paid}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>UTR Number:</b> {student.utr_number}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="sm">
                    <b>Reason for less/more fee:</b> {student.reason}
                  </Text>
                </Grid.Col>
              </Grid>

              <Text size="sm" weight={700} mt="md">
                Fee Receipt:{" "}
                <a
                  href={`${mediaRoute}/${student.fee_receipt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Receipt
                </a>
              </Text>

              <Group position="center" mt="md">
                <Button
                  color="indigo"
                  onClick={() =>
                    handleShowCourses(
                      student.student_id__id,
                      student.student_id__curr_semester_no + 1,
                    )
                  }
                >
                  View Registered Courses
                </Button>
              </Group>

              <Textarea
                placeholder="Enter remarks"
                value={remarks[index] || ""}
                onChange={(e) => handleRemarkChange(index, e.target.value)}
                mt="md"
              />
              <Group position="center" mt="md">
                <Button
                  color="red"
                  onClick={() =>
                    handleAction(student.student_id__id, "reject", index)
                  }
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
                {course.course_id.name} ({course.course_id.code}) -{" "}
                {course.course_id.credit} credits
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
