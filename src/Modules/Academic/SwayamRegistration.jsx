import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Alert,
  Select,
  Modal,
  Checkbox,
  Loader,
} from "@mantine/core";
import FusionTable from "../../components/FusionTable";

// Define course slot options for SWAYAM courses
const swayamCourseSlots = {
  SW4: ["SW4: Agile Software Development Process", "SW4A: Alternative Course"],
  SW5: [
    "SW5: Generative AI for Product Innovation",
    "SW5A: Alternative Course",
  ],
};

// Mapping from selected course option to credit value
const creditMapping = {
  "SW4: Agile Software Development Process": 2,
  "SW4A: Alternative Course": 1,
  "SW5: Generative AI for Product Innovation": 2,
  "SW5A: Alternative Course": 1,
};

// Hardcoded sample data that simulates an API response for Swayam courses
const mockSwayamRegistrationAPIResponse = [
  {
    id: 1,
    code: "SW4",
    name: "Agile Software Development Process",
    type: "Swayam",
    semester: "6",
    credits: 1, // This value is overridden by the mapping
  },
  {
    id: 2,
    code: "SW5",
    name: "Generative AI for Product Innovation",
    type: "Swayam",
    semester: "6",
    credits: 1,
  },
];

// Hardcoded sample data for Replace Courses table (can also come from an API)
const replacedCourses = [
  {
    courseCode: "CS8011",
    courseName: "Machine Learning",
    credits: 3,
    semester: 6,
    type: "Elective",
  },
  {
    courseCode: "OE3C42",
    courseName: "Data Warehousing and Data Mining",
    credits: 3,
    semester: 6,
    type: "Elective",
  },
  {
    courseCode: "OE3D06",
    courseName: "Indian Philosophy and Literature in English",
    credits: 3,
    semester: 6,
    type: "Elective",
  },
];

function SwayamRegistration() {
  const [courses, setCourses] = useState([]);
  const [remarksSelections, setRemarksSelections] = useState({});
  const [choicesSelections, setChoicesSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0);
  const [showReplaceTable, setShowReplaceTable] = useState(false);
  const [droppedCourses, setDroppedCourses] = useState(new Set());
  const [extraCreditsOnly, setExtraCreditsOnly] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    // For API integration, replace the below hardcoded call with a fetch call
    // For example:
    // const fetchCourses = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch("https://api.example.com/swayam-courses");
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     setCourses(data);
    //   } catch (err) {
    //     setError("Failed to fetch courses. Please try again later.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCourses();

    // Using hardcoded data for now:
    setLoading(true);
    // Simulate an API call delay
    setTimeout(() => {
      setCourses(mockSwayamRegistrationAPIResponse);
      setLoading(false);
    }, 500);
  }, []);

  const handleRemarksChange = (id, value) => {
    setRemarksSelections((prev) => ({ ...prev, [id]: value }));
  };

  const handleChoiceChange = (id, value) => {
    setChoicesSelections((prev) => ({ ...prev, [id]: value }));
  };

  const handleDropCourse = (courseCode) => {
    setDroppedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseCode)) {
        newSet.delete(courseCode);
      } else {
        newSet.add(courseCode);
      }
      return newSet;
    });
  };

  // Ensure each course row has both a choice and a remark selected
  const isFormComplete = () =>
    courses.every(
      (course) =>
        choicesSelections[course.id] !== undefined &&
        choicesSelections[course.id] !== "" &&
        remarksSelections[course.id] !== undefined &&
        remarksSelections[course.id] !== "",
    );

  // On submit, calculate total credits from the selected choices
  const handleSubmit = () => {
    const total = courses.reduce((sum, course) => {
      const choice = choicesSelections[course.id];
      return sum + (creditMapping[choice] || 0);
    }, 0);

    setTotalCredits(total);
    setSubmitted(true);
    setShowReplaceTable(true);
  };

  // Final submission API call (if needed)
  const handleFinalSubmit = async () => {
    // Construct the payload from the current state
    // eslint-disable-next-line no-unused-vars
    const payload = {
      courses: courses.map((course) => ({
        id: course.id,
        selectedCourse: choicesSelections[course.id],
        remark: remarksSelections[course.id],
      })),
      droppedCourses: Array.from(droppedCourses),
      extraCreditsOnly,
      totalCredits,
    };

    // For API integration, uncomment the fetch call below
    // try {
    //   const response = await fetch("https://api.example.com/submit-registration", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Submission failed");
    //   }
    //   // Process response as needed, e.g., show a success message
    //   window.alert("Registration submitted successfully!");
    //   setShowConfirmationModal(false);
    // } catch (error) {
    //   window.alert("An error occurred during submission. Please try again.");
    // }

    // For now, just simulate a successful submission:
    window.alert("Registration submitted successfully!");
    setShowConfirmationModal(false);
  };

  // Columns for the first (SWAYAM) table
  const columnNames = [
    "ID",
    "Slot Code",
    "Type",
    "Semester",
    "Choices",
    "Credits",
    "Remarks",
  ];

  // Mapped data for the first (SWAYAM) table
  const mappedCourses = courses.map((course) => {
    const selectedChoice = choicesSelections[course.id];
    const creditValue = selectedChoice ? creditMapping[selectedChoice] : "-";
    return {
      ID: course.id,
      "Slot Code": course.code,
      Type: course.type,
      Semester: course.semester,
      Choices: (
        <Select
          placeholder="Select Course"
          data={(swayamCourseSlots[course.code] || []).map((option) => ({
            value: option,
            label: option,
          }))}
          value={choicesSelections[course.id] || ""}
          onChange={(value) => handleChoiceChange(course.id, value)}
        />
      ),
      Credits: creditValue,
      Remarks: (
        <Select
          placeholder="Select Remark"
          data={[
            { value: "Extra Credits", label: "Extra Credits" },
            { value: "Replace Course", label: "Replace Course" },
          ]}
          value={remarksSelections[course.id] || ""}
          onChange={(value) => handleRemarksChange(course.id, value)}
        />
      ),
    };
  });

  // Columns for the second (Replace Courses) table
  const replaceColumnNames = [
    "Course Code",
    "Course Name",
    "Credits",
    "Semester",
    "Type",
    "Actions",
  ];

  // Mapped data for the second (Replace Courses) table
  const replacedCoursesData = replacedCourses.map((course) => ({
    "Course Code": course.courseCode,
    "Course Name": course.courseName,
    Credits: course.credits,
    Semester: course.semester,
    Type: course.type,
    Actions: droppedCourses.has(course.courseCode) ? (
      <Button color="gray" variant="outline" size="xs" disabled>
        Dropped
      </Button>
    ) : (
      <Button
        color="red"
        variant="outline"
        size="xs"
        onClick={() => handleDropCourse(course.courseCode)}
      >
        Drop and Replace
      </Button>
    ),
  }));

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text
        size="lg"
        weight={700}
        mb="md"
        style={{ textAlign: "center", width: "100%", color: "#3B82F6" }}
      >
        Swayam Registration For This Semester
      </Text>

      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <FusionTable
              columnNames={columnNames}
              elements={mappedCourses}
              width="100%"
            />
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
              Total no. of credit registered through SWAYAM courses in this
              semester: {totalCredits}
            </Alert>
          )}

          {showReplaceTable && (
            <div style={{ marginTop: "1rem" }}>
              <Text
                size="lg"
                weight={700}
                mb="md"
                style={{ textAlign: "center", width: "100%", color: "#3B82F6" }}
              >
                Replace Elective Courses With Swayam For This Semester (if any)
              </Text>

              <Checkbox
                checked={extraCreditsOnly}
                onChange={(event) =>
                  setExtraCreditsOnly(event.currentTarget.checked)
                }
                label="I am taking all Swayam courses for extra credits and do not wish to drop any courses."
                mb="md"
              />

              {!extraCreditsOnly && (
                <div style={{ overflowX: "auto" }}>
                  <FusionTable
                    columnNames={replaceColumnNames}
                    elements={replacedCoursesData}
                    width="100%"
                  />
                </div>
              )}

              <Button
                onClick={() => setShowConfirmationModal(true)}
                disabled={!extraCreditsOnly && droppedCourses.size === 0}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#3B82F6",
                  color: "#fff",
                }}
              >
                Final Submit
              </Button>
            </div>
          )}
        </>
      )}

      <Modal
        opened={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        title="Confirm Submission"
        withCloseButton
      >
        <Text mb="sm">Total Credits through Swayam: {totalCredits}</Text>
        {extraCreditsOnly ? (
          <Text>
            No courses are being dropped. All Swayam courses are for extra
            credits.
          </Text>
        ) : (
          <>
            <Text mb="sm">The following courses will be dropped:</Text>
            <ul>
              {replacedCourses
                .filter((course) => droppedCourses.has(course.courseCode))
                .map((course) => (
                  <li key={course.courseCode}>{course.courseName}</li>
                ))}
            </ul>
          </>
        )}
        <Button
          onClick={handleFinalSubmit}
          mt="md"
          style={{ backgroundColor: "#3B82F6", color: "#fff" }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => setShowConfirmationModal(false)}
          variant="outline"
          mt="md"
          ml="sm"
        >
          Cancel
        </Button>
      </Modal>
    </Card>
  );
}

export default SwayamRegistration;