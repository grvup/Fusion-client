import { Button, Card, ScrollArea, Table } from "@mantine/core";
import React, { useState } from "react";
// import { FaSearch, FaTimes } from "react-icons/fa";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

function Admin_view_a_courses() {
  // const [selectedOption, setSelectedOption] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

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

  // if (loading) {
  //   return <Loader />; // Show loader while loading
  // }

  return (
    <div>
      <nav className="breadcrumbs">
        <span>Program and Curriculum</span>
        <span>Courses</span>
      </nav>

      {/* Options Section */}
      <div className="program-options">
        <p>Programmes</p>
        <p className="active">Curriculums</p>
        <p>Courses</p>
        <p>disciplines</p>
        <p>batches</p>

        <div className="top-actions">
          {/* <Button className="add-course-btn">ADD COURSE</Button> */}
          {/* <Button className="search-btn" onClick={() => setShowSearch(!showSearch)}>
          {showSearch ? 'Hide Search' : 'Search Courses'}
          </Button> */}
          <MagnifyingGlass
            className="search-icon"
            onClick={() => setShowSearch(!showSearch)} // Toggle search form
            size={24} // Set the size of the icon
            color="#007bff" // Set the color of the icon
            style={{ cursor: "pointer", marginLeft: "10px" }} // Add pointer cursor and margin
          />
        </div>
      </div>

      <h4>Courses</h4>
      <div className={`courses-container ${showSearch ? "search-active" : ""}`}>
        <div className="courses-table-section">
          <ScrollArea className="courses-scroll-area">
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="courses-card-container"
            >
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
                          <Button className="courses-edit-button">Edit</Button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </ScrollArea>
        </div>

        {showSearch && (
          <div className="courses-search-section">
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="courses-search-card"
            >
              <X
                className="close-search-icon"
                onClick={() => setShowSearch(false)} // Close search when clicked
                size={20}
                color="red"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
              />

              <h4 className="courses-form-title">FILTER SEARCH</h4>
              {/* <ScrollArea>
                <label htmlFor="code-input">Code contains</label>
                <TextInput 
                  id="code-input" 
                  placeholder="Code contains:" 
                  className="courses-input-field" 
                />

                <label htmlFor="name-input">Name contains</label>
                <TextInput 
                  id="name-input" 
                  placeholder="Name contains:" 
                  className="courses-input-field" 
                />

                <label htmlFor="version-input">Version</label>
                <TextInput 
                  id="version-input" 
                  placeholder="Version:" 
                  className="courses-input-field" 
                />

                <Select
                  label="Working course:"
                  placeholder="Unknown"
                  data={['Unknown', 'Yes', 'No']}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  className="courses-select-field"
                />
              </ScrollArea> */}
              <Button fullWidth className="add-course-btn">
                Search
              </Button>
            </Card>
          </div>
        )}
      </div>

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

        // .course-link {
        //   color: #007bff;
        //   text-decoration: none;
        //   font-weight: bold;
        // }

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
          table-layout: fixed;
        }

        .courses-table-header {
          background-color: #b0e0ff;
          color: black;
          border: 2px solid #007bff;
        }

        .courses-table-row:hover {
          background-color: #f0f8ff;
        }

        .courses-table td, .courses-table th {
          border: 1px solid #007bff;
          padding: 10px;
          text-align: left;
        }

        .courses-table th {
          font-weight: bold;
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

        .courses-scroll-area {
          flex-grow: 1;
          height: calc(100vh - 60px); /* Full height minus the space for the top actions (adjust accordingly) */
          overflow-y: auto;
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
    border-bottom: 1px solid #e0e0e0;
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
