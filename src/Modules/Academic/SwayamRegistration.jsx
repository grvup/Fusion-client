import React, { useState, useEffect } from "react";
import { Card, Text, Button, Alert, Select, Loader } from "@mantine/core";
import FusionTable from "../../components/FusionTable";
import axios from "axios";
import {
  swayamRegistrationRoute,
  swayamRegistrationSubmitRoute,
} from "../../routes/academicRoutes";

function SwayamRegistration() {
  const [courseSlots, setCourseSlots] = useState([]);
  // Selections keyed by slot id.
  const [choicesSelections, setChoicesSelections] = useState({});
  const [remarksSelections, setRemarksSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch course slot data from the backend.
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(swayamRegistrationRoute, {
          headers: { Authorization: `Token ${token}` },
        });
        setCourseSlots(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  // Update selected course for a given slot.
  const handleChoiceChange = (slotId, value) => {
    setChoicesSelections((prev) => ({ ...prev, [slotId]: value }));
  };

  // Update remark for a given slot.
  const handleRemarksChange = (slotId, value) => {
    setRemarksSelections((prev) => ({ ...prev, [slotId]: value }));
  };

  // Form is complete if every slot has both a non-empty course option and a remark.
  const isFormComplete = () =>
    courseSlots.every(
      (slot) =>
        choicesSelections[slot.sno] &&
        choicesSelections[slot.sno] !== "" &&
        remarksSelections[slot.sno] &&
        remarksSelections[slot.sno] !== ""
    );

  // On submission, calculate total credits and build the payload.
  const handleSubmit = async () => {
    // Calculate total credits based on selected course's credits per slot.
    const total = courseSlots.reduce((sum, slot) => {
      const selectedCourseIdStr = choicesSelections[slot.sno];
      if (selectedCourseIdStr) {
        // Convert string to number.
        const selectedCourseId = parseInt(selectedCourseIdStr, 10);
        const course = slot.course_choices.find((c) => c.id === selectedCourseId);
        if (course) {
          return sum + course.credits;
        }
      }
      return sum;
    }, 0);
    setTotalCredits(total);

    // Build registrations payload: one entry per slot.
    const registrations = courseSlots.map((slot) => ({
      slot_id: slot.sno,
      course_id: parseInt(choicesSelections[slot.sno], 10),
      selected_option: choicesSelections[slot.sno], // as string
      remark: remarksSelections[slot.sno],
    }));

    const payload = {
      registrations,
      totalCredits: total,
    };

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      return;
    }
    try {
      const response = await axios.post(
        swayamRegistrationSubmitRoute,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
      } else {
        setError(new Error("Registration submission failed."));
      }
    } catch (postError) {
      setError(postError);
    }
  };

  // Define columns for the FusionTable.
  const columnNames = [
    "S. No",
    "Slot Name",
    "Type",
    "Semester",
    "Course Options",
    "Remark",
  ];

  // Map courseSlots to table rows.
  const tableRows = courseSlots.map((slot, index) => ({
    "S. No": index + 1,
    "Slot Name": slot.slot_name,
    "Type": slot.slot_type,
    "Semester": slot.semester,
    "Course Options": (
      <Select
        placeholder="Select course"
        // Build options from the course_choices array.
        data={slot.course_choices.map((course) => ({
          value: String(course.id), // convert id to string
          label: `${course.code} - ${course.name}`,
        }))}
        value={choicesSelections[slot.sno] || ""}
        onChange={(value) => handleChoiceChange(slot.sno, value)}
      />
    ),
    "Remark": (
      <Select
        placeholder="Select remark"
        data={[
          { value: "Extra Credits", label: "Extra Credits" },
          { value: "Replace Course", label: "Replace Course" },
        ]}
        value={remarksSelections[slot.sno] || ""}
        onChange={(value) => handleRemarksChange(slot.sno, value)}
      />
    ),
  }));

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text size="lg" weight={700} mb="md" style={{ textAlign: "center", color: "#3B82F6" }}>
        Swayam Registration For This Semester
      </Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red" mb="md">{error.toString()}</Alert>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <FusionTable columnNames={columnNames} elements={tableRows} width="100%" />
          </div>
          <Button
            size="sm"
            radius="sm"
            mt="md"
            style={{ backgroundColor: "#3B82F6", color: "#fff" }}
            onClick={handleSubmit}
            disabled={!isFormComplete()}
          >
            Submit
          </Button>
          {submitted && (
            <Alert
              mt="lg"
              title="Registration Complete"
              color="green"
              withCloseButton
              onClose={() => setSubmitted(false)}
            >
              Total SWAYAM credits registered in this semester: {totalCredits}
            </Alert>
          )}
        </>
      )}
    </Card>
  );
}


export default SwayamRegistration;
