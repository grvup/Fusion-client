import React, { useState } from "react";
import {
  Table,
  Button,
  Select,
  Text,
  Container,
  Paper,
  Grid,
  ScrollArea,
  Box,
} from "@mantine/core";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./styles/verify.css";

const data = [
  {
    id: "22bcs184",
    batch: 2023,
    semester: "SEM 1",
    courseid: "CS2003",
    remarks: "S",
    grade: "B",
  },
  {
    id: "22bcs184",
    batch: 2024,
    semester: "SEM 2",
    courseid: "CS2002",
    remarks: "S",
    grade: "A",
  },
  {
    id: "22bcs234",
    batch: 2024,
    semester: "SEM 3",
    courseid: "CS2003",
    remarks: "S",
    grade: "C",
  },
  {
    id: "22bcs123",
    batch: 2022,
    semester: "SEM 4",
    courseid: "CS2004",
    remarks: "S",
    grade: "C+",
  },
  {
    id: "22bcs234",
    batch: 2021,
    semester: "SEM 5",
    courseid: "CS2003",
    remarks: "S",
    grade: "F",
  },
  {
    id: "22bcs345",
    batch: 2022,
    semester: "SEM 5",
    courseid: "CS2002",
    remarks: "S",
    grade: "O",
  },
  {
    id: "22bcs124",
    batch: 2024,
    semester: "SEM 5",
    courseid: "CS2003",
    remarks: "S",
    grade: "A+",
  },
  {
    id: "22bcs225",
    batch: 2023,
    semester: "SEM 5",
    courseid: "CS2001",
    remarks: "S",
    grade: "B+",
  },
];

const gradeData = [
  { name: "A/A+", value: 30, color: "#4caf50" },
  { name: "B/B+", value: 25, color: "#2196f3" },
  { name: "C/C+", value: 35, color: "#ff9800" },
  { name: "D/D+", value: 10, color: "#f44336" },
  { name: "F", value: 0.2, color: "#9e9e9e" },
];

const COLORS = gradeData.map((entry) => entry.color);

function VerifyDean() {
  // const [verified, setVerified] = useState(false);
  const verified = false;
  const [showContent, setShowContent] = useState(false);
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  // const handleVerify = () => setVerified(!verified);

  const handlePublish = () => {
    if (verified) {
      alert("Results published successfully!");
    } else {
      alert("Please verify the results before publishing.");
    }
  };

  const handleSearch = () => {
    setShowContent(true);
  };

  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.batch}</td>
      <td>{item.semester}</td>
      <td>{item.courseid}</td>
      <td>{item.remarks}</td>
      <td>{item.grade}</td>
    </tr>
  ));

  return (
    <Container
      size="xl"
      style={{
        borderRadius: "15px",
        padding: " 0 20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        borderLeft: "10px solid #1E90FF",
        backgroundColor: "white",
      }}
    >
      <Paper p="md">
        <h1>Update Grades</h1>
        <Grid>
          <Grid.Col xs={12} sm={4}>
            <Select
              label="Course"
              placeholder="Select course"
              value={course}
              onChange={setCourse}
              data={["CS3010", "CS3020", "CS3030"]}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <Select
              label="Academic Year"
              placeholder="Select year"
              value={year}
              onChange={setYear}
              data={["2022-23", "2021-22", "2020-21"]}
            />
          </Grid.Col>
        </Grid>
        <Box mt="md">
          <Button onClick={handleSearch} size="sm">
            Search
          </Button>
        </Box>

        {showContent && (
          <>
            <ScrollArea mt="lg">
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Batch</th>
                    <th>Semester</th>
                    <th>Course ID</th>
                    <th>Remarks</th>
                    <th>Grades</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>

            <Grid mt="xl">
              <Grid.Col xs={12} md={6}>
                <Paper p="md" className="statistics">
                  <Text
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    mb="sm"
                  >
                    Statistics
                  </Text>
                  <PieChart width={400} height={300} className="pie-chart">
                    <Pie
                      style={{ fontSize: "20px" }}
                      data={gradeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      label
                    >
                      {gradeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{
                        fontSize: "1rem",
                        marginTop: "20px",
                      }}
                    />
                  </PieChart>
                </Paper>
              </Grid.Col>
              <Grid.Col
                xs={12}
                md={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button ml="md" onClick={handlePublish} color="blue">
                  Verify
                </Button>
                <Button
                  ml="md"
                  onClick={() => {
                    alert("Are You Sure, Faculty Now Can ReSubmit the Grades");
                  }}
                  color="blue"
                >
                  Allow ReSubmission
                </Button>
              </Grid.Col>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default VerifyDean;
