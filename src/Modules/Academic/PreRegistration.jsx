import React, { useState, useEffect } from "react";
import { Card, Text, Button, Alert, Select } from "@mantine/core";
import FusionTable from "../../components/FusionTable";

// Course slots data remains constant (could also be fetched from an API if needed)
const courseSlots = {
  OE4: [
    "OE3C41: Agile Software Development Process",
    "CS8012: Compiler Design",
    "OE3C42: Data Warehousing and Data Mining",
    "OE3E30: Fibre Optics",
    "EC5011: Advance Semiconductor Devices",
    "ME8021: Advanced Mechanics of Solids",
    "OE3M35: Advance welding and joining",
    "OE3D20: Industrial Design",
    "SW3004: SWAYAM 4",
  ],
  OE5: [
    "CS8009: Image Processing",
    "CS8010: Digital Watermarking",
    "OE3E15: Information Theory and Coding",
    "OE3E09: IC Fabrication",
    "OE3M34: Introduction to Non Destructive Evaluation",
    "ME8019: Robotics and Intelligent Systems",
    "OE3M36: Generative AI for Product Innovation",
    "OE3D06: Indian Philosophy and Literature in English",
    "OE3N37: Optimization Techniques",
    "OE3D38: Human Computer Interaction",
    "OE3D21: Communication Design",
    "SW3005: SWAYAM 5",
  ],
  OE6: [
    "CS8011: Machine Learning",
    "OE2C09: Graph Theory",
    "OE3E35: Speech Processing",
    "OE3M37: Industrial Engineering",
    "ME8014: NC-CNC Machine Tools and Programming",
    "OE4M27: Computer Integrated Manufacturing Systems",
    "OE3N33: Quantum Mechanics for Engineers",
    "OE3D12: Communication Skills Management",
    "OE4L01: Japanese Language Course Level-1",
    "SW3006: SWAYAM 6",
  ],
  DC8: ["DS3014: Fabrication Project"],
  IT4: ["IT3C03: Web And Mobile App Development"],
  PC3: ["PC3003: Professional Development Course 3"],
  PR3: ["No", "Yes - PR3003: Optional PR Project"],
  PR2: ["No", "Yes - PR2001: PR Project(Defered)"],
  Others: [
    "No",
    "NS1004: Engineering Mechanics-II",
    "NS103-b: Engineering Mathematics-II",
  ],
};

const mockPreRegistrationAPIResponse = [
  {
    sno: 1,
    id: 1,
    code: "OE4",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 2,
    id: 1,
    code: "OE4",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 3,
    id: 1,
    code: "OE4",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 4,
    id: 1,
    code: "OE4",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 5,
    id: 1,
    code: "OE4",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 6,
    id: 1,
    code: "OE4",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 7,
    id: 2,
    code: "OE5",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 8,
    id: 2,
    code: "OE5",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 9,
    id: 2,
    code: "OE5",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 10,
    id: 2,
    code: "OE5",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 11,
    id: 2,
    code: "OE5",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 12,
    id: 2,
    code: "OE5",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 13,
    id: 3,
    code: "OE6",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 14,
    id: 3,
    code: "OE6",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 15,
    id: 3,
    code: "OE6",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 16,
    id: 3,
    code: "OE6",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 17,
    id: 3,
    code: "OE6",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  {
    sno: 18,
    id: 3,
    code: "OE6",
    type: "Open Elective",
    semester: "6",
    credits: 3,
  },
  { sno: 19, id: 4, code: "DC8", type: "Core", semester: "6", credits: 4 },
  { sno: 20, id: 5, code: "IT4", type: "Core", semester: "6", credits: 2 },
  { sno: 21, id: 6, code: "PC3", type: "Core", semester: "6", credits: 1 },
  { sno: 22, id: 7, code: "PR3", type: "Optional", semester: "6", credits: 2 },
  {
    sno: 23,
    id: 8,
    code: "PR2",
    type: "Backlog/Improvement",
    semester: "6",
    credits: 2,
  },
  {
    sno: 24,
    id: 9,
    code: "Others",
    type: "Backlog/Improvement",
    semester: "6",
    credits: 4,
  },
];

function PreRegistration() {
  const [coursesData, setCoursesData] = useState([]);
  const [selections, setSelections] = useState({});
  const [priorities, setPriorities] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      setCoursesData(mockPreRegistrationAPIResponse);
    };

    fetchCourses();
  }, []);

  const handleSelectionChange = (sno, value) => {
    setSelections((prev) => ({ ...prev, [sno]: value }));
  };

  const handlePriorityChange = (sno, value) => {
    setPriorities((prev) => ({ ...prev, [sno]: value }));
  };

  const isFormComplete = () =>
    coursesData.every((course) => selections[course.sno]);

  const handleRegister = () => {
    const pr3Credits = selections[22] === "No" ? 0 : 2;
    const pr2Credits = selections[23] === "No" ? 0 : 2;
    const othersCredits = selections[24] === "No" ? 0 : 4;
    const total =
      3 + 3 + 3 + 4 + 2 + 1 + pr3Credits + pr2Credits + othersCredits;
    setTotalCredits(total);
    setAlertVisible(true);
  };

  const columnNames = [
    "ID",
    "Slot Code",
    "Type",
    "Semester",
    "Credits",
    "Priority",
    "Choice",
  ];

  const mappedCourses = coursesData.map((course) => ({
    ID: course.id,
    "Slot Code": course.code,
    Type: course.type,
    Semester: course.semester,
    Credits: course.credits,
    Priority:
      course.type === "Open Elective" ? (
        <Select
          placeholder="Priority"
          data={Array.from({ length: 6 }, (_, i) => `${i + 1}`)}
          value={priorities[course.sno]}
          onChange={(value) => handlePriorityChange(course.sno, value)}
        />
      ) : (
        "N/A"
      ),
    Choice: (
      <Select
        placeholder="Select Course"
        data={(courseSlots[course.code] || []).map((option) => ({
          value: option,
          label: option,
        }))}
        value={selections[course.sno]}
        onChange={(value) => handleSelectionChange(course.sno, value)}
      />
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
        Pre-Registration for Next Semester Courses
      </Text>
      <FusionTable columnNames={columnNames} elements={mappedCourses} />
      <Button
        size="md"
        radius="md"
        style={{ backgroundColor: "#3B82F6", color: "#fff" }}
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
          Total Credits Registered: {totalCredits}
        </Alert>
      )}
    </Card>
  );
}

export default PreRegistration;
