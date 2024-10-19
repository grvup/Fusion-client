import React, { useState, useEffect } from "react";
import { ScrollArea, Button, Select, TextInput } from "@mantine/core";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import axios from "axios"; // Assuming axios is used for API calls

function AdminViewAllBatches() {
  const [activeTab, setActiveTab] = useState("Batches");
  const [filter, setFilter] = useState({
    name: "",
    year: "",
    curriculum: "",
    runningBatch: "",
    discipline: "",
  });
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [batches, setBatches] = useState([]);
  const [finishedBatches, setFinishedBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token
  
        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/admin_batches/",
          {
            headers: {
              Authorization: `Token ${token}`,  // Add the Authorization header
            },
          }
        ); // Replace with actual endpoint
        setBatches(response.data.batches); // Assuming API returns {runningBatches, finishedBatches}
        setFinishedBatches(response.data.finished_batches);
        setFilteredBatches(response.data.filter);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchBatches();
  }, []);
  // console.log(batches)
  // Handle search input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Filter logic (can be adjusted based on API response structure)
  const handleSearch = () => {
    const filtered = batches.filter((batch) => {
      return (
        (filter.name === "" || batch.name.includes(filter.name)) &&
        (filter.year === "" || String(batch.year).includes(filter.year)) &&
        (filter.curriculum === "" || batch.curriculum === filter.curriculum) &&
        (filter.runningBatch === "" || batch.status === filter.runningBatch) &&
        (filter.discipline === "" || batch.discipline === filter.discipline)
      );
    });
    setFilteredBatches(filtered);
  };
  // console.log(filteredBatches)
  // console.log(finishedBatches)
  return (
    <div>
      <div className="courses-container">
        <div className={`courses-table-section ${isSearchVisible ? "" : "full-width"}`}>
          <div className="tabs">
            <Button
              variant={activeTab === "Batches" ? "filled" : "outline"}
              onClick={() => setActiveTab("Batches")}
            >
              Batches
            </Button>
            <Button
              variant={activeTab === "Finished Batches" ? "filled" : "outline"}
              onClick={() => setActiveTab("Finished Batches")}
            >
              Finished Batches
            </Button>
          </div>
          <div className="top-actions">
            <a href="/programme_curriculum/acad_admin_add_batch_form" style={{ textDecoration: "none" }}>
              <Button variant="filled" color="blue">
                Add Batch
              </Button>
            </a>
            {!isSearchVisible ? (
              <MagnifyingGlass
                size={24}
                onClick={() => setIsSearchVisible(true)}
                style={{ cursor: "pointer", color: "#007bff" }}
              />
            ) : null}
          </div>
          <ScrollArea className="courses-scroll-area" type="hover" style={{ height: "100vh" ,backgroundColor:'white',padding:'0px 20px',boxShadow:'0px 0px 1px 1px rgba(0, 0, 0, 0.2)',borderRadius:'5px', margin:'20px 0 0 0'}}>
            {activeTab === "Batches" && (
              <div className="batches-table">
                <table className="courses-table">
                  <thead className="courses-table-header" style={{ backgroundColor: "#b0e0ff" }}>
                    <tr>
                      <th>Name</th>
                      <th>Discipline</th>
                      <th>Year</th>
                      <th>Curriculum</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(batches) && batches.length > 0 ? (
                      batches.map((batch, index) => (
                        <tr
                          key={index}
                          className="courses-table-row"
                          style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#15ABFF1C" }}
                        >
                          <td>{batch.name}</td>
                          <td>{batch.discipline}</td>
                          <td>{batch.year}</td>
                          <td>
                            <a
                              href={`/programme_curriculum/view_curriculum?curriculum=${batch.curriculum}`}
                              className="course-link"
                              style={{ textDecoration: "none" }}
                            >
                              {batch.curriculum} &nbsp;v{batch.curriculumVersion}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`/programme_curriculum/admin_edit_batch_form?batch=${batch.name}`}
                              className="course-link"
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="filled" color="green">
                                Edit
                              </Button>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No batches found</td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            )}

            {activeTab === "Finished Batches" && (
              <div className="batches-table">
                <table className="courses-table">
                  <thead className="courses-table-header" style={{ backgroundColor: "#b0e0ff" }}>
                    <tr>
                      <th>Name</th>
                      <th>Discipline</th>
                      <th>Year</th>
                      <th>Curriculum</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finishedBatches.map((batch, index) => (
                      <tr key={index} className="courses-table-row" style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#15ABFF1C" }}>
                        <td>{batch.name}</td>
                        <td>{batch.discipline}</td>
                        <td>{batch.year}</td>
                        <td>
                          <a
                            href={`/programme_curriculum/view_curriculum?curriculum=${batch.curriculum}`}
                            className="course-link"
                            style={{ textDecoration: "none" }}
                          >
                            {batch.curriculum} &nbsp;v{batch.curriculumVersion}
                          </a>
                        </td>
                        <td>
                          <a
                            href={`/programme_curriculum/admin_edit_batch_form?batch=${batch.name}`}
                            className="course-link"
                            style={{ textDecoration: "none" }}
                          >
                            <Button variant="filled" color="green">
                              Edit
                            </Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ScrollArea>
        </div>

        {isSearchVisible && (
          <ScrollArea className="courses-search-section" type="hover" style={{ height: "500px" }}>
            <div className="courses-search-card">
              <div className="filter-form">
                {/* Close icon in the search section */}
                <X
                  size={24}
                  onClick={() => setIsSearchVisible(false)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                    color: "#ff0000",
                  }}
                />

                <h3>Filter Search</h3>
                <TextInput
                  label="Name contains:"
                  value={filter.name}
                  name="name"
                  onChange={handleInputChange}
                />
                <TextInput
                  label="Year contains:"
                  value={filter.year}
                  name="year"
                  onChange={handleInputChange}
                />
                <Select
                  label="Curriculum"
                  placeholder="Select curriculum"
                  value={filter.curriculum}
                  onChange={(value) => setFilter({ ...filter, curriculum: value })}
                  data={[
                    { value: "CSE PhD Curriculum v1.0", label: "CSE PhD Curriculum v1.0" },
                    { value: "ME PhD Curriculum v1.0", label: "ME PhD Curriculum v1.0" },
                  ]}
                />
                <Select
                  label="Running batch"
                  placeholder="Select batch status"
                  value={filter.runningBatch}
                  onChange={(value) => setFilter({ ...filter, runningBatch: value })}
                  data={[
                    { value: "Unknown", label: "Unknown" },
                    { value: "Running", label: "Running" },
                  ]}
                />
                <Select
                  label="Discipline"
                  placeholder="Select discipline"
                  value={filter.discipline}
                  onChange={(value) => setFilter({ ...filter, discipline: value })}
                  data={[
                    { value: "Mechanical Engineering ME", label: "Mechanical Engineering ME" },
                    { value: "Computer Science and Engineering CSE", label: "Computer Science and Engineering CSE" },
                  ]}
                />
                <Button variant="filled" color="blue" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>

      <style>{`
        .courses-container {
          display: flex;
          gap: 20px;
          width: 100%;
          transition: all 0.3s ease-in-out;
          margin:20px 0 0 20px;
        }

        .courses-table-section {
          flex: 3;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease-in-out;
        }

        .full-width {
          flex: 1;
        }

        .top-actions {
          display: flex;
          gap: 10px;
          margin-left: auto;
          align-items: center;
          margin-top:-5vh
        }

        .tabs {
          display: flex;
          gap: 20px;
        }

        .courses-scroll-area {
          height:150vh
        }

        .batches-table {
          margin-top: 20px;
        }

        .courses-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #007bff;
        }

        .courses-table th, .courses-table td {
          padding: 10px;
          text-align: left;
          border: 1px solid #007bff;

        }

        .courses-search-section {
          flex: 1;
          min-width: 300px;
          transition: all 0.3s ease-in-out;
          height: 400px;
          position: relative;
        }

        .filter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .breadcrumbs {
          font-size: 14px;
          margin-bottom: 10px;
          color: #333;
          font-size: 20px;
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
      `}</style>
    </div>
  );
}

export default AdminViewAllBatches;
