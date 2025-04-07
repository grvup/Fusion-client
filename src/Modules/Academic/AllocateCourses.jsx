import React, { useState } from "react";
import {
  Card,
  Text,
  Button,
  TextInput,
  Alert,
  NumberInput,
  Loader,
} from "@mantine/core";
import axios from "axios";
import {
  checkAllocationRoute,
  startAllocationRoute,
} from "../../routes/academicRoutes";

function AllocateCourses() {
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  const handleCheckAllocation = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    setShowStartButton(false);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        checkAllocationRoute,
        { batch, sem: semester, year },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = response.data;

      if (result.status === 2) {
        setSuccess("Courses are successfully allocated.");
      } else if (result.status === 1) {
        setError("Courses not yet allocated. Start allocation.");
        setShowStartButton(true);
      } else if (result.status === -1) {
        setError("Registration is under process.");
      } else if (result.status === -2) {
        setError("Registration didn't start.");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error checking allocation.");
    }

    setLoading(false);
  };

  const handleStartAllocation = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        startAllocationRoute,
        { batch, semester, year },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.status === 1) {
        setSuccess("Course allocation successful!");
        setShowStartButton(false);
      } else {
        setError(response.data.message || "Allocation failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error starting allocation.");
    }
    setLoading(false);
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text size="lg" weight={700} mb="md" align="center" color="blue">
        Allocate Courses
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
        onClick={handleCheckAllocation}
        mb="md"
      >
        Check Allocation
      </Button>

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

      {error && (
        <Alert title="Notice" color="red" mt="lg">
          {error}
        </Alert>
      )}

      {success && (
        <Alert title="Success" color="green" mt="lg">
          {success}
        </Alert>
      )}

      {showStartButton && (
        <Button
          style={{ backgroundColor: "#4CBB17", color: "white" }}
          mt="md"
          onClick={handleStartAllocation}
          loading={loading}
        >
          Start Allocation
        </Button>
      )}
    </Card>
  );
}

export default AllocateCourses;
