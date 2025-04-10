import { useState } from "react";
import {
  Card,
  Text,
  Button,
  TextInput,
  Alert,
  Group,
  Modal,
  Loader,
} from "@mantine/core";
import axios from "axios";
import FusionTable from "../../components/FusionTable";
import {
  deletePreRegistrationRoute,
  searchPreRegistrationRoute,
} from "../../routes/academicRoutes";

function RegistrationSearch() {
  const [rollNo, setRollNo] = useState("");
  const [semester, setSemester] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSearch = async () => {
    setError("");
    setSearchResults(null);
    setLoading(true); // Start loading
    if (!rollNo || !semester) {
      setError("Please fill both Roll No and Semester fields");
      setLoading(false); // Stop loading
      return;
    }

    const token = localStorage.getItem("authToken"); // Get token from local storage
    if (!token) {
      setLoading(false); // Stop loading
      throw new Error("No token found"); // Handle the case where the token is not available
    }

    try {
      const response = await axios.post(
        searchPreRegistrationRoute,
        {
          roll_no: rollNo,
          sem_no: semester,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response.data);
      if (response.data.student_registration_check) {
        setSearchResults(response.data);
      } else {
        setError("No Registration Found!");
      }
    } catch (err) {
      console.error("Error searching:", err);
      setError(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken"); // Get token from local storage
    if (!token) {
      throw new Error("No token found"); // Handle the case where the token is not available
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        deletePreRegistrationRoute,
        {
          roll_no: searchResults.student_registration_check.student_id,
          sem_no: searchResults.initial_registration[0].semester_id.semester_no,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response.data.message);
      setDeleteModalOpen(false);
      alert(response.data.message);
      setSearchResults(null);
    } catch (er) {
      console.error("Error searching:", er);
      setError(er);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const columnNames = ["Course", "Semester", "Course Slot", "Type", "Priority"];

  const mappedResults = searchResults
    ? searchResults?.initial_registration.map((result) => ({
        Course: result.course_id.name,
        Semester: result.semester_id.semester_no,
        "Course Slot": result.course_slot_id.name,
        Type: result.registration_type,
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Search"} {/* Show loading text */}
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
                {searchResults.student_registration_check.student_id}
              </Text>
            </Group>
            <Group spacing="xs" mb={4}>
              <Text weight={500}>Pre-Registration Flag:</Text>
              <Text
                color={
                  searchResults.student_registration_check.pre_registration_flag
                    ? "green"
                    : "red"
                }
                weight={600}
              >
                {searchResults.student_registration_check.pre_registration_flag
                  ? "True"
                  : "False"}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text weight={500}>Final Registration Flag:</Text>
              <Text
                color={
                  searchResults.student_registration_check
                    .final_registration_flag
                    ? "green"
                    : "red"
                }
                weight={600}
              >
                {searchResults.student_registration_check
                  .final_registration_flag
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

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Loader variant="dots" />
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
              handleDelete();
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Deleting..." : "Confirm Delete"}{" "}
            {/* Show loading text */}
          </Button>
        </Group>
      </Modal>
    </Card>
  );
}

export default RegistrationSearch;
