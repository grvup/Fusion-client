import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Select,
  Button,
  Group,
  Title,
  Text,
  Loader,
  Alert,
  Card,
  Stack,
  Grid,
  Badge,
  ScrollArea,
  Divider,
  Transition,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {get_courses_prof,download_grades_prof} from "./routes/examinationRoutes"
import axios from "axios";
import { Alarm, Book, Calendar, Download } from "phosphor-react";
import { useSelector } from "react-redux";
function GradesDownloadPage() {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const generatedYears = Array.from({ length: currentYear - 2021 + 1 }, (_, i) => (currentYear - i).toString());
        setYears(generatedYears);
      }, []);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const userRole = useSelector((state) => state.user.role);
  useEffect(() => {
    // Show animation on initial load
    toggle();

    // Fetch courses on component mount
    fetchCourses(selectedYear);
  }, []);

  const fetchCourses = async (year) => {
    setLoading(true);
    setError("");
    setSelectedCourse(null);

    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored here

      const response = await axios.post(
        get_courses_prof,
        {
          Role: userRole,
          academic_year: year,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setCourses(response.data.courses);
    } catch (err) {
      console.error("Error fetching courses:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to load courses. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    fetchCourses(year);
  };

  const handleDownload = async (courseId) => {
    setDownloadLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios({
        url: download_grades_prof,
        method: "POST",
        data: {
          Role: userRole,
          course_id: courseId,
          academic_year: selectedYear,
        },
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob", // Important for file downloads
      });

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `grades_${courseId}_${selectedYear}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading grades:", err);

      if (err.response && err.response.data) {
        // For blob responses, we need to convert to text first
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result);
            setError(errorData.error || "Failed to download grades");
          } catch (e) {
            setError("Failed to download grades. Please try again.");
          }
        };
        reader.readAsText(err.response.data);
      } else {
        setError("Failed to download grades. Please try again.");
      }
    } finally {
      setDownloadLoading(false);
    }
  };

  const truncateSyllabus = (syllabus) => {
    if (!syllabus || syllabus === "NA") return "No syllabus available";
    return syllabus.length > 100
      ? syllabus.substring(0, 100) + "..."
      : syllabus;
  };

  // Inline styles instead of createStyles
  const containerStyle = {
    maxWidth: "calc(100% - 50px)",
    width: "100%",
    padding: "24px",
  };

  const headerStyle = {
    marginBottom: "16px",
    borderBottom: "1px solid #e9ecef",
    paddingBottom: "12px",
  };

  const courseCardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const courseCardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };

  const selectedCardStyle = {
    borderColor: "#228be6",
    borderWidth: 2,
    borderStyle: "solid",
  };

  const badgeStyle = {
    marginRight: "8px",
  };

  const cardContentStyle = {
    flex: 1,
  };

  const downloadButtonStyle = {
    marginTop: "auto",
  };

  return (
    <Transition
      mounted={visible}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Container style={{ ...containerStyle, ...styles }}>
          <Paper shadow="sm" p="md" withBorder>
            <div style={headerStyle}>
              <Group position="apart" mb="xs">
                <Title order={2}>
                  {/* <Book
                    size={28}
                    style={{ marginRight: 10, verticalAlign: "bottom" }}
                  /> */}
                  Course Grades Download
                </Title>
                <Select
                  placeholder="Select Academic Year"
                //   label="Academic Year"
                  icon={<Calendar size={16} />}
                  value={selectedYear}
                  onChange={handleYearChange}
                  data={years}
                  style={{ width: 200 }}
                />
              </Group>
              <Text color="dimmed">
                Select a course to download its grade sheet
              </Text>
            </div>

            {error && (
              <Alert
                icon={<Alarm size={16} />}
                title="Error"
                color="red"
                mb="md"
                withCloseButton
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            {loading ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "50px 0",
                }}
              >
                <Loader size="lg" variant="dots" />
              </Box>
            ) : courses.length === 0 ? (
              <Alert color="blue" title="No courses found">
                No courses are available for the selected academic year.
              </Alert>
            ) : (
              <ScrollArea style={{ height: "auto" }}>
                <Grid gutter="md">
                  {courses.map((course) => (
                    <Grid.Col key={course.id} xs={12} sm={6} md={6} lg={4}>
                      <Card
                        p="lg"
                        withBorder
                        style={{
                          ...courseCardStyle,
                          ...(selectedCourse === course.id
                            ? selectedCardStyle
                            : {}),
                        }}
                        sx={(theme) => ({
                          "&:hover": courseCardHoverStyle,
                        })}
                        onClick={() => setSelectedCourse(course.id)}
                      >
                        <Card.Section p="md" withBorder>
                          <Group position="apart">
                            <Text weight={700} size="lg">
                              {course.name}
                            </Text>
                            {course.latest_version && (
                              <Badge color="green" variant="filled" size="sm">
                                Latest Version
                              </Badge>
                            )}
                          </Group>
                          <Text color="dimmed" size="sm">
                            {course.code}
                          </Text>
                        </Card.Section>

                        <Stack spacing="xs" mt="md" style={cardContentStyle}>
                          <Group spacing="xs">
                            <Badge
                              style={badgeStyle}
                              color="blue"
                              variant="light"
                            >
                              Credits: {course.credit}
                            </Badge>
                            <Badge
                              style={badgeStyle}
                              color="grape"
                              variant="light"
                            >
                              Max Seats: {course.max_seats}
                            </Badge>
                          </Group>

                          <Divider
                            my="sm"
                            label="Course Details"
                            labelPosition="center"
                          />

                          <Group spacing="xs" grow>
                            <Text size="sm" weight={500}>
                              Hours:
                            </Text>
                            <Text size="sm">
                              L:{course.lecture_hours} T:{course.tutorial_hours}{" "}
                              P:{course.pratical_hours}
                            </Text>
                          </Group>

                          <Group spacing="xs" grow>
                            <Text size="sm" weight={500}>
                              Prerequisites:
                            </Text>
                            <Text size="sm">
                              {course.pre_requisits || "None"}
                            </Text>
                          </Group>

                          <Text size="sm" mt="xs">
                            <Text weight={500} component="span">
                              Syllabus:{" "}
                            </Text>
                            {truncateSyllabus(course.syllabus)}
                          </Text>
                        </Stack>

                        <Button
                          fullWidth
                          mt="md"
                          leftIcon={<Download size={16} />}
                          style={downloadButtonStyle}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(course.id);
                          }}
                          loading={
                            downloadLoading && selectedCourse === course.id
                          }
                        >
                          Download Grades
                        </Button>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </ScrollArea>
            )}
          </Paper>
        </Container>
      )}
    </Transition>
  );
}

export default GradesDownloadPage;
