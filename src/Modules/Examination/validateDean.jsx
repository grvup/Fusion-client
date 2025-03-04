import React, { useState } from "react";
import {
  Select,
  Button,
  TextInput,
  Grid,
  Paper,
  Container,
  ScrollArea,
  Box,
  Table,
} from "@mantine/core";
import "./styles/submit.css";

const courses = [
  "Software Engineering - CS3010",
  "Introduction to Programming in C - IT1001",
  "Artificial Intelligence - CS3001",
  "IOT - CS3010",
  "Database Management System(DBMS) - CS3010",
  "Data Structures and Algorithms - CS3010",
];

const years = ["2020-2021", "2021-2022", "2022-2023", "2023-2024"];

const studentData = [
  {
    id: "22bcs184",
    batch: 2022,
    sem: "SEM 4",
    courseid: "CS2003",
    remarks: "S",
    gradesDB: "A+",
    gradesCSV: "A",
  },
  {
    id: "22bcs164",
    batch: 2022,
    sem: "SEM 4",
    courseid: "CS2004",
    remarks: "S",
    gradesDB: "A+",
    gradesCSV: "B",
  },
  {
    id: "22bcs183",
    batch: 2022,
    sem: "SEM 4",
    courseid: "CS2004",
    remarks: "S",
    gradesDB: "B+",
    gradesCSV: "A",
  },
];

function ValidateDean() {
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [unmatch, setUnmatch] = useState(false);

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const isFormComplete = () => {
    return course && year && excelFile;
  };

  return (
    <Container
      size="xl"
      style={{
        borderRadius: "15px",
        padding: "0 20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        borderLeft: "10px solid #1E90FF",
        backgroundColor: "white",
      }}
    >
      <Paper p="md">
        <h1>Validate Grades</h1>

        <Grid>
          <Grid.Col xs={12} sm={6}>
            <Select
              label="Course"
              placeholder="Select Course"
              data={courses}
              value={course}
              onChange={setCourse}
              required
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <Select
              label="Academic Year"
              placeholder="Select Year"
              data={years}
              value={year}
              onChange={setYear}
              required
            />
          </Grid.Col>
        </Grid>

        <Box mt="md">
          <TextInput
            type="file"
            label="Upload Excel Sheet"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            required
          />
        </Box>

        <Box mt="md" className="btn-div">
          <Button
            size="sm"
            color={isFormComplete() ? "blue" : "gray"}
            disabled={!isFormComplete()}
            onClick={() => setUnmatch(true)}
          >
            Submit
          </Button>
        </Box>

        {unmatch && (
          <ScrollArea>
            <h3>Mis-Matched Student Grades</h3>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Batch</th>
                  <th>Semester</th>
                  <th>Course ID</th>
                  <th>Remarks</th>
                  <th>Grades in DB</th>
                  <th>Grades in CSV</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.batch}</td>
                    <td>{student.sem}</td>
                    <td>{student.courseid}</td>
                    <td>{student.remarks}</td>
                    <td>{student.gradesDB}</td>
                    <td>{student.gradesCSV}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        )}
      </Paper>
    </Container>
  );
}

export default ValidateDean;
