import React, { useState, useEffect, useCallback, memo } from "react";
import { Card, Text, Button, Alert } from "@mantine/core";
import axios from "axios";
import { preCourseRegistrationRoute, preCourseRegistrationSubmitRoute } from "../../routes/academicRoutes";

// Memoized CourseRow component.
// Receives the row data plus the current slot's priorities.
const CourseRow = memo(
  ({ rowData, onPriorityChange, priorityValue, slotPriorities, slotRowSpan }) => {
    const {
      serial,
      isFirst,
      slotName,
      slotType,
      semester,
      slotId,
      course,
      slotLength,
    } = rowData;

    // Build options for native select.
    // Disable an option if it’s already used by another course in the same slot.
    const options = Array.from({ length: slotLength }, (_, i) => {
      const optionValue = `${i + 1}`;
      let isDisabled = false;
      if (slotPriorities) {
        Object.entries(slotPriorities).forEach(([cId, val]) => {
          if (cId !== course.id.toString() && val === optionValue) {
            isDisabled = true;
          }
        });
      }
      return (
        <option key={optionValue} value={optionValue} disabled={isDisabled}>
          {optionValue}
        </option>
      );
    });

    return (
      <tr>
        {isFirst && (
          <td
            style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}
            rowSpan={slotRowSpan}
          >
            {slotName} <br />({slotType}, Sem: {semester})
          </td>
        )}
        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
          {course.code}: {course.name} ({course.credits} credits)
        </td>
        <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
          <select
            value={priorityValue || ""}
            onChange={(e) =>
              onPriorityChange(slotId, course.id, e.target.value)
            }
            style={{
              width: "120px",
              padding: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <option value="">Select</option>
            {options}
          </select>
        </td>
      </tr>
    );
  },
  (prevProps, nextProps) =>
    prevProps.priorityValue === nextProps.priorityValue &&
    prevProps.rowData === nextProps.rowData &&
    JSON.stringify(prevProps.slotPriorities) === JSON.stringify(nextProps.slotPriorities)
);

function PreRegistration() {
  const [coursesData, setCoursesData] = useState([]);
  // priorities: { [slotId]: { [courseId]: priorityValue } }
  const [priorities, setPriorities] = useState({});
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course slot data using axios.
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(new Error("No token found"));
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(preCourseRegistrationRoute, {
          headers: { Authorization: `Token ${token}` },
        });
        // If the response returns a message, then the student is already registered.
        if (response.data.message) {
          setAlreadyRegistered(true);
        } else {
          setCoursesData(response.data);
        }
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // useCallback to avoid re-creating the function on each render.
  const handlePriorityChange = useCallback((slotId, courseId, value) => {
    setPriorities((prev) => ({
      ...prev,
      [slotId]: {
        ...(prev[slotId] || {}),
        [courseId]: value,
      },
    }));
  }, []);

  // isFormComplete checks each slot: it must be either completely empty or completely filled.
  const isFormComplete = () =>
    coursesData.every((slot) => {
      const slotPriorities = priorities[slot.sno] || {};
      const assignedCount = slot.course_choices.filter(
        (course) => slotPriorities[course.id] && slotPriorities[course.id] !== ""
      ).length;
      // Either no course selected (slot skipped) or all courses selected.
      return assignedCount === 0 || assignedCount === slot.course_choices.length;
    });

  // Build and send the registration payload.
  const handleRegister = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError(new Error("No token found"));
      return;
    }
    const registrations = [];
    coursesData.forEach((slot) => {
      // If the slot is left unassigned (all empty), skip it.
      const slotPriorities = priorities[slot.sno] || {};
      const assignedCount = slot.course_choices.filter(
        (course) => slotPriorities[course.id] && slotPriorities[course.id] !== ""
      ).length;
      if (assignedCount === 0) return;
      slot.course_choices.forEach((course) => {
        registrations.push({
          slot_id: slot.sno,
          course_id: course.id,
          priority: slotPriorities[course.id],
        });
      });
    });

    try {
      console.log("Payload:", registrations);
      const response = await axios.post(
        preCourseRegistrationSubmitRoute,
        { registrations },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        setAlertVisible(true);
      } else {
        console.error("Registration failed", response);
      }
    } catch (postError) {
      console.error("Error:", postError);
      setError(postError);
    }
  };

  // Flatten course data into rows with merged slot info.
  const rows = [];
  let serialNumber = 1;
  coursesData.forEach((slot) => {
    const slotLength = slot.course_choices.length;
    slot.course_choices.forEach((course, index) => {
      rows.push({
        serial: index === 0 ? serialNumber++ : "",
        isFirst: index === 0,
        slotId: slot.sno,
        slotName: slot.slot_name,
        slotType: slot.slot_type,
        semester: slot.semester,
        slotLength: slotLength,
        course: course,
      });
    });
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error.message}</Text>;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text align="center" size="lg" weight={700} mb="md" style={{ color: "#3B82F6" }}>
        Pre-Registration for Next Semester Courses
      </Text>
      {alreadyRegistered ? (
        <Alert color="blue" title="Already Registered" withCloseButton>
          You have already completed pre-registration.
        </Alert>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Slot Name</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Course</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <CourseRow
                  key={index}
                  rowData={row}
                  onPriorityChange={handlePriorityChange}
                  priorityValue={
                    priorities[row.slotId]
                      ? priorities[row.slotId][row.course.id]
                      : ""
                  }
                  slotPriorities={priorities[row.slotId] || {}}
                  slotRowSpan={row.slotLength}
                />
              ))}
            </tbody>
          </table>
          <Button
            mt="md"
            style={{ backgroundColor: "#3B82F6", color: "#fff", marginTop: 16 }}
            onClick={handleRegister}
            disabled={!isFormComplete()}
          >
            Register
          </Button>
          {alertVisible && (
            <Alert
              mt="lg"
              title="Registration Complete"
              color="green"
              withCloseButton
              onClose={() => setAlertVisible(false)}
            >
              Registration preferences have been submitted.
            </Alert>
          )}
        </>
      )}
    </Card>
  );
}

export default PreRegistration;
