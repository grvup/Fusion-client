import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Select,
  Tabs,
  Box,
  Space,
} from "@mantine/core";
import FusionTable from "../../components/FusionTable";

const hardcodedStudents = [
  { id: "22BDS001", name: "A S THARUNV ARSHAN", program: "Design" },
  { id: "22BDS002", name: "AADI ABHAY KULKARNI", program: "Design" },
  { id: "22BDS003", name: "AADISH AMARDEEP PATIL", program: "Design" },
  { id: "22BDS004", name: "ABHIRAM VIJAYARAGHAVAN", program: "Design" },
  { id: "22BDS005", name: "AISHWARYA NITIN GHATOLE", program: "Design" },
];

const hardcodedCourses = {
  2024: ["DS3010 - Sustainable Design", "DS3011 - Another Course"],
  2023: ["DS2023 - Legacy Course"],
  2022: ["DS2022 - Foundation Course"],
};

function GenerateStudentList() {
  const [activeTab, setActiveTab] = useState("rolllist");
  const [academicYear, setAcademicYear] = useState("");
  const [course, setCourse] = useState("");
  const [showRollList, setShowRollList] = useState(false);
  const [students, setStudents] = useState([]);
  const [courseOptions, setCourseOptions] = useState({});

  useEffect(() => {
    setCourseOptions(hardcodedCourses);
  }, []);

  const handleGenerateList = () => {
    setTimeout(() => {
      setStudents(hardcodedStudents);
      setShowRollList(true);
    }, 1000);
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List style={{ justifyContent: "center" }}>
          <Tabs.Tab
            value="rolllist"
            style={{
              fontSize: "16px",
              padding: "12px 20px",
              minWidth: "100px",
            }}
          >
            Roll List
          </Tabs.Tab>
          <Tabs.Tab
            value="preregistration"
            style={{
              fontSize: "16px",
              padding: "12px 20px",
              minWidth: "220px",
            }}
          >
            Pre-Registration Report
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="rolllist" pt="xs">
          <Text
            size="lg"
            weight={700}
            mb="md"
            align="center"
            style={{ color: "#3B82F6" }}
          >
            Student Roll List
          </Text>

          <Group position="center" grow style={{ marginBottom: 16 }}>
            <Select
              label="Running Year"
              placeholder="Select year"
              value={academicYear}
              onChange={(val) => {
                setAcademicYear(val);
                setCourse("");
                setShowRollList(false);
              }}
              data={Object.keys(courseOptions)}
              style={{ flex: 1 }}
            />

            <Select
              label="This Semester Courses"
              placeholder="Select course"
              value={course}
              onChange={(val) => {
                setCourse(val);
                setShowRollList(false);
              }}
              data={courseOptions[academicYear] || []}
              style={{ flex: 1 }}
            />
          </Group>

          <Space h="md" />

          {academicYear && course && (
            <Box>
              <Button
                size="sm"
                radius="sm"
                onClick={handleGenerateList}
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                Generate Student List
              </Button>

              {showRollList && (
                <Button
                  size="sm"
                  radius="sm"
                  onClick={() =>
                    console.log("Excel functionality will be added later")
                  }
                  style={{
                    backgroundColor: "#22C55E",
                    color: "white",
                    width: "100%",
                  }}
                >
                  Generate Excel Sheet
                </Button>
              )}
            </Box>
          )}

          <Space h="md" />

          {showRollList && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Box sx={{ maxWidth: 600, width: "100%" }}>
                <FusionTable
                  columnNames={["ID", "Name", "Program"]}
                  elements={students.map((student) => ({
                    ID: student.id,
                    Name: student.name,
                    Program: student.program,
                  }))}
                  width="100%"
                />
              </Box>
            </Box>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="preregistration" pt="xs">
          <Text align="center" size="lg" weight={500}>
            Pre-Registration Report content will go here.
          </Text>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

export default GenerateStudentList;
