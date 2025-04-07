import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { generate_transcript, get_courses } from "../routes/examinationRoutes";
import {
  Container,
  Title,
  Paper,
  Table,
  Text,
  Group,
  Button,
  Divider,
  Badge,
  Loader,
  Box,
  Card,
  Grid,
  Alert,
} from "@mantine/core";
import {
  IconDownload,
  IconPrinter,
  IconAlertCircle,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
// Grade point mapping - matching the Django template
const gradePoints = {
  O: 10,
  "A+": 10,
  A: 9,
  "B+": 8,
  B: 7,
  "C+": 6,
  C: 5,
  "D+": 4,
  D: 3,
  F: 2,
};

function StudentTranscript(props) {
  const userRole = useSelector((state) => state.user.role);
  const location = useLocation();
  const student = props.student;
  const semester = props.semester;
  const [transcriptData, setTranscriptData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spi, setSpi] = useState("N/A");
  const [cpi, setCpi] = useState("N/A");
  const [dataReady, setDataReady] = useState(false);
  // Fetch both transcript and course data simultaneously
  useEffect(() => {
    if (!student || !student.id_id || !semester) {
      setError("Invalid student data");
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found!");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch both data sets in parallel
        const [courseResponse, transcriptResponse] = await Promise.all([
          axios.post(
            get_courses, 
            { Role:userRole, academic_year: "2024" },
            { headers: { Authorization: `Token ${token}` }}
          ),
          axios.post(
            generate_transcript, 
            { Role: userRole, student: student.id_id, semester },
            { headers: { Authorization: `Token ${token}` }}
          )
        ]);
        
        const courses = courseResponse.data.courses;
        const transcript = transcriptResponse.data;
        
        setCourseData(courses);
        setTranscriptData(transcript);
        
        // Set a flag indicating both data sets are loaded
        setDataReady(true);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [student, semester]);

  // Calculate SPI and CPI only when both data sets are ready
  useEffect(() => {
    if (dataReady && transcriptData?.courses_grades && courseData) {
      calculateSPIAndCPI();
    }
  }, [dataReady, transcriptData, courseData]);

  // Calculate SPI and CPI
  const calculateSPIAndCPI = () => {
    // Calculate SPI (Semester Performance Index)
    let totalCredits = 0;
    let totalGradePoints = 0;
    let creditsDebug = [];

    // We need to add credit information to each course
    Object.values(transcriptData.courses_grades).forEach((course) => {
      // Find credit information for the course
      const courseInfo = courseData.find((c) => c.code === course.course_code);
      const credit = courseInfo?.credit || 3; // Default to 3 if not found
      
      // Debug information
      creditsDebug.push({
        course_code: course.course_code,
        credit: credit,
        found: !!courseInfo
      });

      // Calculate grade points
      const gradePoint = gradePoints[course.grade] || 0;

      totalGradePoints += gradePoint * credit;
      totalCredits += credit;
    });
    
    console.log("Credits debugging info:", creditsDebug);
    console.log("Total grade points:", totalGradePoints);
    console.log("Total credits:", totalCredits);
    console.log("SPI calculation:", totalGradePoints / totalCredits);
    
    const calculatedSPI =
      totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "N/A";
    setSpi(calculatedSPI);

    // Calculate CPI (Cumulative Performance Index) using total_courses_registered
    let totalCreditsCPI = 0;
    let totalGradePointsCPI = 0;
    let cpiDebug = [];

    if (
      transcriptData.total_courses_registered &&
      Array.isArray(transcriptData.total_courses_registered)
    ) {
      transcriptData.total_courses_registered.forEach((course) => {
        // For CPI calculation, we need to find the course by ID
        const courseInfo = courseData.find((c) => c.id === course.course_id);
        const credit = courseInfo?.credit || 3;
        
        // Debug information
        cpiDebug.push({
          course_id: course.course_id,
          credit: credit,
          found: !!courseInfo
        });

        // Calculate grade points
        const gradePoint = gradePoints[course.grade] || 0;

        totalGradePointsCPI += gradePoint * credit;
        totalCreditsCPI += credit;
      });

      console.log("CPI credits debugging info:", cpiDebug);
      console.log("Total CPI grade points:", totalGradePointsCPI);
      console.log("Total CPI credits:", totalCreditsCPI);
      console.log("CPI calculation:", totalGradePointsCPI / totalCreditsCPI);
      
      const calculatedCPI =
        totalCreditsCPI > 0
          ? (totalGradePointsCPI / totalCreditsCPI).toFixed(2)
          : "N/A";
      setCpi(calculatedCPI);
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Transcript", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Student ID: ${student?.id_id || "N/A"}`, 14, 30);
    doc.text(`Name: ${student?.name || "Student"}`, 14, 40);
    doc.text(`Semester: ${semester || "N/A"}`, 14, 50);
    doc.text(`SPI: ${spi}`, 14, 60);
    doc.text(`CPI: ${cpi}`, 14, 70);

    const tableColumn = ["Course Code", "Course Name", "Credits", "Grade"];
    const tableRows = [];

    if (transcriptData?.courses_grades) {
      Object.entries(transcriptData.courses_grades).forEach(
        ([courseId, course]) => {
          // Find credit information
          const courseInfo = courseData?.find((c) => c.code === course.course_code);
          const credit = courseInfo?.credit || 3;

          const courseRow = [
            course.course_code,
            course.course_name,
            credit.toString(),
            course.grade,
          ];
          tableRows.push(courseRow);
        },
      );
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 139, 202] },
    });

    doc.save("student_transcript.pdf");
  };

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Paper p="md" shadow="sm" radius="md">
          <Group position="center">
            <Loader size="lg" />
            <Text>Loading transcript data...</Text>
          </Group>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" py="xl">
         <Button
  leftIcon={<IconArrowLeft size={16} />} // Ensure this is correctly formatted
  onClick={props.onBack}
  variant="outline"
  style={{ marginTop: "16px" }} // Add some margin for better spacing
>
  Back to List
</Button>
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  if (
    !transcriptData?.courses_grades ||
    Object.keys(transcriptData.courses_grades).length === 0
  ) {
    return (
      <Container size="md" py="xl">
          <Button
  leftIcon={<IconArrowLeft size={16} />} // Ensure this is correctly formatted
  onClick={props.onBack}
  variant="outline"
  style={{ marginTop: "16px" }} // Add some margin for better spacing
>
  Back to List
</Button>
        <Paper p="md" shadow="sm" radius="md">
          <Text size="lg" align="center">
            Marks not yet submitted.
          </Text>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
       <Button
  leftIcon={<IconArrowLeft size={16} />} // Ensure this is correctly formatted
  onClick={props.onBack}
  variant="outline"
  style={{ marginTop: "16px" }} // Add some margin for better spacing
>
  Back to List
</Button>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Title order={2}>Student Transcript</Title>
            <Group>
              <Button
                leftIcon={<IconPrinter size={16} />}
                onClick={() => window.print()}
                variant="outline"
              >
                Print
              </Button>
              <Button
                leftIcon={<IconDownload size={16} />}
                onClick={generatePDF}
              >
                Download PDF
              </Button>
            </Group>
          </Group>
        </Card.Section>

        <Box mt="md">
          <Grid>
            <Grid.Col span={6}>
              <Text weight={500}>Student ID: {student?.id_id || "N/A"}</Text>
              <Text weight={500}>Name: {student?.name || "Student"}</Text>
            </Grid.Col>
            <Grid.Col span={6} style={{ textAlign: "right" }}>
              <Text weight={500}>Semester: {semester || "N/A"}</Text>
            </Grid.Col>
          </Grid>
        </Box>

        <Divider my="md" />

        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Credits</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {transcriptData?.courses_grades &&
              Object.entries(transcriptData.courses_grades).map(
                ([courseId, course], index) => {
                  // Find credit information
                  const courseInfo = courseData?.find(
                    (c) => c.code === course.course_code
                  );
                  const credit = courseInfo?.credit || 3;

                  return (
                    <tr key={index}>
                      <td>{course.course_name}</td>
                      <td>{course.course_code}</td>
                      <td>{credit}</td>
                      <td>
                        <Badge
                          color={
                            course.grade === "O" || course.grade.startsWith("A")
                              ? "green"
                              : course.grade.startsWith("B")
                                ? "blue"
                                : course.grade.startsWith("C")
                                  ? "yellow"
                                  : "red"
                          }
                        >
                          {course.grade}
                        </Badge>
                      </td>
                    </tr>
                  );
                },
              )}
          </tbody>
        </Table>

        <Divider my="md" />

        <Grid>
          <Grid.Col span={6}>
            <Paper p="md" withBorder>
              <Title order={4}>Semester Performance Index (SPI)</Title>
              <Text weight={700} size="xl" mt="md">
                {spi}
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper p="md" withBorder>
              <Title order={4}>Cumulative Performance Index (CPI)</Title>
              <Text weight={700} size="xl" mt="md">
                {cpi}
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>

        <Divider my="md" />

        <Group position="right">
          <Text size="sm" color="dimmed">
            Generated on: {new Date().toLocaleDateString()}
          </Text>
        </Group>
      </Card>
    </Container>
  );
}

export default StudentTranscript;
