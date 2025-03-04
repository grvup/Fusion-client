import { Button, ScrollArea, Table, Grid, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

function Admin_view_a_courses() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filter, setFilter] = useState({
    code: "",
    name: "",
    version: "",
    credits: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const courses = [
    {
      code: "NS205c",
      name: "Discrete Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "NS205i",
      name: "Culture and Science - comparison",
      version: "1.0",
      credits: 4,
    },
    {
      code: "EC2002",
      name: "Digital Electronics and Microprocessor Interfacing",
      version: "1.0",
      credits: 4,
    },
    { code: "Mathematics", name: "Mechatronics", version: "1.0", credits: 4 },
    { code: "Design", name: "Design", version: "1.0", credits: 4 },
    {
      code: "Natural Sciences",
      name: "Natural Science-Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "Humanities - English",
      name: "Humanities - English",
      version: "1.0",
      credits: 4,
    },
    {
      code: "NS205c",
      name: "Discrete Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "NS205i",
      name: "Culture and Science - comparison",
      version: "1.0",
      credits: 4,
    },
    {
      code: "EC2002",
      name: "Digital Electronics and Microprocessor Interfacing",
      version: "1.0",
      credits: 4,
    },
    { code: "Mathematics", name: "Mechatronics", version: "1.0", credits: 4 },
    { code: "Design", name: "Design", version: "1.0", credits: 4 },
    {
      code: "Natural Sciences",
      name: "Natural Science-Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "Humanities - English",
      name: "Humanities - English",
      version: "1.0",
      credits: 4,
    },
    {
      code: "NS205c",
      name: "Discrete Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "NS205i",
      name: "Culture and Science - comparison",
      version: "1.0",
      credits: 4,
    },
    {
      code: "EC2002",
      name: "Digital Electronics and Microprocessor Interfacing",
      version: "1.0",
      credits: 4,
    },
    { code: "Mathematics", name: "Mechatronics", version: "1.0", credits: 4 },
    { code: "Design", name: "Design", version: "1.0", credits: 4 },
    {
      code: "Natural Sciences",
      name: "Natural Science-Mathematics",
      version: "1.0",
      credits: 4,
    },
    {
      code: "Humanities - English",
      name: "Humanities - English",
      version: "1.0",
      credits: 4,
    },
  ];

  return (
    <div style={{ padding: "20px", paddingTop: "10px" }}>
      <div className="program-options" style={{ borderBottom: "none" }}>
        <Button variant="filled" style={{ marginRight: "10px" }}>
          Courses
        </Button>
      </div>

      <hr />

      <Grid>
        {isMobile && (
          <Grid.Col span={12}>
            <ScrollArea type="hover">
              {[
                { label: "Course Code", name: "code" },
                { label: "Course Name", name: "name" },
                { label: "Version", name: "version" },
                { label: "Credits", name: "credits" },
              ].map((input, index) => (
                <TextInput
                  key={index}
                  label={`${input.label}:`}
                  placeholder={`Select by ${input.label}`}
                  value={filter[input.name]}
                  name={input.name}
                  mb={5}
                  onChange={handleInputChange}
                />
              ))}
            </ScrollArea>
          </Grid.Col>
        )}
        <Grid.Col span={isMobile ? 12 : 9}>
          <div className="courses-table-section">
            <ScrollArea className="courses-scroll-area">
              <div radius="md" className="courses-card-container">
                <Table highlightOnHover striped className="courses-table">
                  <thead className="courses-table-header">
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Version</th>
                      <th>Credits</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={index} className="courses-table-row">
                        <td>
                          <a
                            href={`/programme_curriculum/faculty_course_view?course=${course.code}`}
                            className="course-link"
                          >
                            {course.code}
                          </a>
                        </td>
                        <td>{course.name}</td>
                        <td>{course.version}</td>
                        <td>{course.credits}</td>
                        <td>
                          <a
                            href={`/programme_curriculum/faculty_forward_form?course=${course.code}`}
                          >
                            <Button className="courses-edit-button">
                              Edit
                            </Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </ScrollArea>
          </div>
        </Grid.Col>

        {!isMobile && (
          <Grid.Col span={3}>
            <ScrollArea type="hover">
              {[
                { label: "Course Code", name: "code" },
                { label: "Course Name", name: "name" },
                { label: "Version", name: "version" },
                { label: "Credits", name: "credits" },
              ].map((input, index) => (
                <TextInput
                  key={index}
                  label={`${input.label}:`}
                  placeholder={`Select by ${input.label}`}
                  value={filter[input.name]}
                  name={input.name}
                  mb={5}
                  onChange={handleInputChange}
                />
              ))}
            </ScrollArea>
          </Grid.Col>
        )}
      </Grid>

      <style>{`
        .search-icon {
          cursor: pointer;
          transition: color 0.3s ease-in-out;
        }

        .search-icon:hover {
          color: #0056b3; /* Darker shade on hover */
        }
        
        .courses-container {
          display: flex;
          gap: 20px;
          justify-content: flex-start;
          width: 100%;
          height: 100vh;
          transition: all 0.3s ease-in-out;
        }

        .courses-container.search-active  {
          flex: 1;
        }

        .courses-table-section{
          flex: 3;
        }

        .courses-table-section {
          flex: 3;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 0.3s ease-in-out;
        }

        .courses-search-section {
          flex: 1;
          min-width: 300px;
          transition: all 0.3s ease-in-out;
        }

        .top-actions {
          margin-left: auto; /* This pushes the buttons to the right */
          display: flex;
          gap: 10px; /* Adds space between buttons */
        }

        .course-link:hover {
          text-decoration: underline;
          color: #0056b3;
        }

        .add-course-btn, .search-btn {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          font-size: 16px;
          margin-left: 10px;
        }

        .courses-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #d3d3d3;
        }

        .courses-table-header {
          background-color: #C5E2F6;
        }

        .courses-table th {
          padding: 15px 20px;
          color: #3498db;
          font-size: 16px;
          text-align: center;
          border-right: 1px solid #d3d3d3;
          font-weight: normal;
        }

        .courses-table th:last-child {
          border-right: none;
        }

        .courses-table td {
          padding: 15px 20px;
          text-align: center;
          color: black;
          border-right: 1px solid #d3d3d3;
        }

        .courses-table td:last-child {
          border-right: none;
        }

        .courses-table-row:nth-child(even) {
          background-color: #15ABFF1C;
        }

        .courses-table-row:nth-child(odd) {
          background-color: #fff;
        }

        .course-link {
          color: #3498db;
          text-decoration: none;
          font-size: 14px;
        }

        .courses-table-section {
          flex: 3;
          border: 1px solid #d3d3d3;
          border-radius: 10px;
          height: calc(100vh - 150px);
          overflow: hidden;
        }

        .courses-scroll-area {
          background-color: white;
          height: 100%;
          overflow-y: auto;
        }

        .courses-card-container {
          height: 100%;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .courses-scroll-area::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .courses-scroll-area {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .courses-edit-button {
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .courses-edit-button:hover {
          background-color: #218838;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .courses-search-card {
          background-color: white;
          border: 1px solid #f8f9fa;
          padding: 20px;
          height: 40vh;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .courses-input-field {
          margin-bottom: 15px;
        }

        .courses-select-field {
          margin-bottom: 5px;
        }

        .breadcrumbs {
    font-size: 14px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .breadcrumbs > span {
    margin-right: 5px;
    font-size: 1.4vw;
    font-weight: bold;
  }
  
  .breadcrumbs > span::after {
    content: ">";
    margin-left: 5px;
  }
  
  .breadcrumbs > span:last-child::after {
    content: ""; /* Remove the '>' from the last breadcrumb */
  }
  
  /* Program Options Bar Styling */
  .program-options {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 0;
    font-size: 0.8vw;
    border: none;
    box-shadow: none;
  }
  
  .program-options > p {
    margin: 0;
    color: #666;
    cursor: pointer;
  }
  
  .program-options > p:hover {
    color: #000;
    text-decoration: underline;
  }
  
  /* Active option styling (Programmes) */
  .program-options .active {
    font-weight: bold;
    color: #000;
    text-decoration: none;
  }
  
  .program-options > p::after {
    content: "|";
    margin-left: 10px;
    color: #ddd;
  }
  
  .program-options > p:last-child::after {
    content: ""; /* Remove the '|' from the last item */
  }

        @media (max-width: 768px) {
          .courses-container {
            flex-direction: column;
            gap: 10px;
          }

          .add-course-btn, .search-btn {
            width: 100%;
            font-size: 14px;
          }

          .courses-search-section {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Admin_view_a_courses;
