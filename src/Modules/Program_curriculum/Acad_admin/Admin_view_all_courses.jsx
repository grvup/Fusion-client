import { Button, Card, ScrollArea, Table, Loader } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import axios from "axios";
function Admin_view_all_courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Show loader until data is fetched
  const [error, setError] = useState(null); // Handle errors
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token
  
        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/admin_courses/",
          {
            headers: {
              Authorization: `Token ${token}`,  // Add the Authorization header
            },
          }
        ); // Replace with actual endpoint
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching batch data:", error);
        setError(error.message); // Store error message
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
    
  if (loading) {
    return <Loader size="lg" variant="dots" />; // Show loader while loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue
  }

  return (
    <div>
      <div className={`courses-container ${showSearch ? "search-active" : ""}`}>
        <div className="courses-table-section">
          <div style={{ display: 'flex', margin: '0 0 20px 0px' }}>
            <div>
              <Button variant={"filled"}>
                Courses
              </Button>
            </div>
            <div className="top-actions">
              <a
                href="/programme_curriculum/acad_admin_add_course_proposal_form"
                style={{ textDecoration: "none" }}
              >
                <Button className="add-course-btn">ADD COURSE</Button>
              </a>
              <MagnifyingGlass
                className="search-icon"
                onClick={() => setShowSearch(!showSearch)} // Toggle search form
                size={24} // Set the size of the icon
                color="#007bff" // Set the color of the icon
                style={{ cursor: "pointer", marginLeft: "10px" }} // Add pointer cursor and margin
              />
            </div>
          </div>

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
                          href={`/programme_curriculum/admin_course/${course.id}`}
                          className="course-link"
                          style={{ textDecoration: "none" }}
                        >
                          {course.code}
                        </a>
                      </td>
                      <td>{course.name}</td>
                      <td>{course.version}</td>
                      <td>{course.credits}</td>
                      <td>
                        <a
                          href={`/programme_curriculum/acad_admin_edit_course_form/${course.id}`}
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
          margin:20px 0 0 20px
        }

        .courses-container.search-active  {
          flex: 1;
        }

        .courses-table-section{
          flex: 1;
          display:flex;
          flex-direction: column;
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
          height: 100vh
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

export default Admin_view_all_courses;
