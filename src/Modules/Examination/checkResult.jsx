import React, { useState } from "react";
import {
  Table,
  Button,
  Select,
  Container,
  Paper,
  Grid,
  ScrollArea,
  Box,
} from "@mantine/core";

import "./styles/verify.css";

const data = [
  {
    courseid: "CS2003",
    coursename: "Database & Management System",
    credits: 4,
    grade: "B",
  },
  {
    courseid: "CS2002",
    coursename: "Computer Architecture",
    credits: 4,
    grade: "B",
  },
  { courseid: "CS2004", coursename: "Data Science", credits: 4, grade: "B" },
  { courseid: "CS2003", coursename: "IT Workshop II", credits: 2, grade: "B" },
  { courseid: "CS2005", coursename: "Swayam", credits: 2, grade: "B" },
];

function CheckResult() {
  const [showContent, setShowContent] = useState(false);

  const handleSearch = () => {
    setShowContent(true);
  };

  const rows = data.map((item, index) => (
    <tr key={index}>
      <td>{item.courseid}</td>
      <td>{item.coursename}</td>
      <td>{item.credits}</td>
      <td>{item.grade}</td>
    </tr>
  ));

  return (
    <Container
      size="xl"
      style={{
        borderRadius: "15px",
        padding: "0px 20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        borderLeft: "10px solid #1E90FF",
        backgroundColor: "white",
      }}
    >
      <Paper p="md">
        <h1>Check Result</h1>
        <Grid>
          <Grid.Col xs={12} sm={4}>
            <Select
              label="Semester"
              placeholder="Semester"
              data={[
                { value: "1", label: "Semester 1" },
                { value: "2", label: "Semester 2" },
                { value: "3", label: "Semester 3" },
                { value: "4", label: "Semester 4" },
                { value: "5", label: "Semester 5" },
              ]}
            />
          </Grid.Col>
        </Grid>
        <Box mt="md">
          <Button onClick={handleSearch} size="sm">
            View Result
          </Button>
        </Box>

        {showContent && (
          <ScrollArea mt="lg">
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <div className="result-box">
              <div className="box">
                <span style={{ fontSize: "50px" }}>8.4</span>
                <span>SPI</span>
              </div>
              <div className="box">
                <span style={{ fontSize: "50px" }}>21</span>
                <span>SU</span>
              </div>
              <div className="box">
                <span style={{ fontSize: "50px" }}>102</span>
                <span>TU</span>
              </div>
            </div>
          </ScrollArea>
        )}
      </Paper>
    </Container>
  );
}

export default CheckResult;
