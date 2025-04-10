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
import axios from "axios"; // Import axios
import "./styles/verify.css";
import { check_result } from "./routes/examinationRoutes";
function CheckResult() {
  const [showContent, setShowContent] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [resultData, setResultData] = useState([]);
  const [spi, setSpi] = useState(0);
  const [su, setSu] = useState(0);
  const [tu, setTu] = useState(0);

  const handleSearch = async () => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage
// console.log(token);
    if (!selectedSemester) {
      alert("Please select a semester");
      return;
    }

    try {
      const response = await axios.post(
        check_result, 
        { semester: selectedSemester},
        {
          headers: {Authorization: `Token ${token}`}
        }
      );
      const { courses, spi, su, tu } = response.data;
    //  console.log(selectedSemester); 
      setResultData(courses);
      setSpi(spi);
      setSu(su);
      setTu(tu);
      // console.log(courses);
      // console.log(spi, su, tu);
      setShowContent(true);
    } catch (error) {
      console.error("Error fetching result:", error);
      alert("Failed to fetch result. Please try again.");
    }
  };

  const rows = resultData.map((item, index) => (
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
        // borderLeft: "10px solid #1E90FF",
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
                { value: "6", label: "Semester 6" },
                { value: "7", label: "Semester 7" },
                { value: "8", label: "Semester 8" },
              ]}
              value={selectedSemester}
              onChange={(value) => setSelectedSemester(value)}
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
                <span style={{ fontSize: "50px" }}>{spi}</span>
                <span>SPI</span>
              </div>
              <div className="box">
                <span style={{ fontSize: "50px" }}>{su}</span>
                <span>SU</span>
              </div>
              <div className="box">
                <span style={{ fontSize: "50px" }}>{tu}</span>
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
