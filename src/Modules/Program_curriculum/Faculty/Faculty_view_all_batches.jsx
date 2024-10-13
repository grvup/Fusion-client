import React, { useState } from "react";
import { ScrollArea, Button, Select, TextInput } from "@mantine/core";
// import { BiSearch } from "react-icons/bi"; // Search icon
// import { AiOutlineClose } from "react-icons/ai"; // Close icon
import { MagnifyingGlass, X } from "@phosphor-icons/react";

function Batches() {
  const [activeTab, setActiveTab] = useState("Batches");
  const [filter, setFilter] = useState({
    name: "",
    year: "",
    curriculum: "",
    runningBatch: "",
    discipline: "",
  });
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const batches = [
    {
      name: "PhD",
      discipline: "Mechanical Engineering ME",
      year: 2016,
      curriculum: "ME PhD Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Computer Science and Engineering CSE",
      year: 2016,
      curriculum: "CSE PhD Curriculum v1.0",
    },
    {
      name: "B.Tech",
      discipline: "Mechanical Engineering ME",
      year: 2016,
      curriculum: "ME UG Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Electronics and Communication Engineering ECE",
      year: 2016,
      curriculum: "ECE PhD Curriculum v1.0",
    },

    {
      name: "PhD",
      discipline: "Mechanical Engineering ME",
      year: 2016,
      curriculum: "ME PhD Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Computer Science and Engineering CSE",
      year: 2016,
      curriculum: "CSE PhD Curriculum v1.0",
    },
    {
      name: "B.Tech",
      discipline: "Mechanical Engineering ME",
      year: 2016,
      curriculum: "ME UG Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Electronics and Communication Engineering ECE",
      year: 2016,
      curriculum: "ECE PhD Curriculum v1.0",
    },

    {
      name: "PhD",
      discipline: "Mechanical Engineering ME",
      year: 2016,
      curriculum: "ME PhD Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Computer Science and Engineering CSE",
      year: 2016,
      curriculum: "CSE PhD Curriculum v1.0",
    },
    {
      name: "B.Tech",
      discipline: "Mechanical Engineering ME",
      year: 2016,
      curriculum: "ME UG Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Electronics and Communication Engineering ECE",
      year: 2016,
      curriculum: "ECE PhD Curriculum v1.0",
    },
  ];

  const finishedBatches = [
    {
      name: "B.Tech",
      discipline: "Mechanical Engineering ME",
      year: 2015,
      curriculum: "ME UG Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Computer Science and Engineering CSE",
      year: 2015,
      curriculum: "CSE PhD Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Design Des.",
      year: 2015,
      curriculum: "PhD in Design v1.0",
    },
    {
      name: "B.Tech",
      discipline: "Mechanical Engineering ME",
      year: 2015,
      curriculum: "ME UG Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Computer Science and Engineering CSE",
      year: 2015,
      curriculum: "CSE PhD Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Design Des.",
      year: 2015,
      curriculum: "PhD in Design v1.0",
    },
    {
      name: "B.Tech",
      discipline: "Mechanical Engineering ME",
      year: 2015,
      curriculum: "ME UG Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Computer Science and Engineering CSE",
      year: 2015,
      curriculum: "CSE PhD Curriculum v1.0",
    },
    {
      name: "PhD",
      discipline: "Design Des.",
      year: 2015,
      curriculum: "PhD in Design v1.0",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div>
      <nav className="breadcrumbs">
        <span>Program and Curriculum</span>
        <span>Curriculums</span>
        <span>CSE UG Curriculum</span>
      </nav>

      <div className="program-options">
        <p>Programmes</p>
        <p className="active">Curriculums</p>
        <p>Courses</p>
        <p>disciplines</p>
        <p>batches</p>

        <div className="top-actions">
          {/* <Button variant="filled" color="blue">Add Batch</Button> */}

          {/* Toggle search icon and close icon based on search visibility */}
          {!isSearchVisible ? (
            <MagnifyingGlass
              size={24}
              onClick={() => setIsSearchVisible(true)}
              style={{ cursor: "pointer", color: "#007bff" }}
            />
          ) : null}
        </div>
      </div>

      <div className="courses-container">
        <div
          className={`courses-table-section ${isSearchVisible ? "" : "full-width"}`}
        >
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

          <ScrollArea
            className="courses-scroll-area"
            type="hover"
            style={{ height: "300px" }}
          >
            {activeTab === "Batches" && (
              <div className="batches-table">
                <table className="courses-table">
                  <thead className="courses-table-header">
                    <tr>
                      <th>Name</th>
                      <th>Discipline</th>
                      <th>Year</th>
                      <th>Curriculum</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch, index) => (
                      <tr key={index} className="courses-table-row">
                        <td>{batch.name}</td>
                        <td>{batch.discipline}</td>
                        <td>{batch.year}</td>
                        <td>
                          <a href="/dashboard" className="course-link">
                            {batch.curriculum}
                          </a>
                        </td>
                        <td>
                          <Button variant="light" color="green">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Finished Batches" && (
              <div className="batches-table">
                <table className="courses-table">
                  <thead className="courses-table-header">
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
                      <tr key={index} className="courses-table-row">
                        <td>{batch.name}</td>
                        <td>{batch.discipline}</td>
                        <td>{batch.year}</td>
                        <td>
                          <a href="/dashboard" className="course-link">
                            {batch.curriculum}
                          </a>
                        </td>
                        <td>
                          <Button variant="light" color="green">
                            Edit
                          </Button>
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
          <ScrollArea
            className="courses-search-section"
            type="hover"
            style={{ height: "500px" }}
          >
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
                  onChange={(value) =>
                    setFilter({ ...filter, curriculum: value })
                  }
                  data={[
                    {
                      value: "CSE PhD Curriculum v1.0",
                      label: "CSE PhD Curriculum v1.0",
                    },
                    {
                      value: "ME PhD Curriculum v1.0",
                      label: "ME PhD Curriculum v1.0",
                    },
                  ]}
                />
                <Select
                  label="Running batch"
                  placeholder="Select batch status"
                  value={filter.runningBatch}
                  onChange={(value) =>
                    setFilter({ ...filter, runningBatch: value })
                  }
                  data={[
                    { value: "Unknown", label: "Unknown" },
                    { value: "Running", label: "Running" },
                  ]}
                />
                <Select
                  label="Discipline"
                  placeholder="Select discipline"
                  value={filter.discipline}
                  onChange={(value) =>
                    setFilter({ ...filter, discipline: value })
                  }
                  data={[
                    {
                      value: "Mechanical Engineering ME",
                      label: "Mechanical Engineering ME",
                    },
                    {
                      value: "Computer Science and Engineering CSE",
                      label: "Computer Science and Engineering CSE",
                    },
                  ]}
                />
                <Button variant="filled" color="blue">
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
          height: 100vh;
          transition: all 0.3s ease-in-out;
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
        }

        .tabs {
          display: flex;
          gap: 20px;
          margin-top: 10px;
        }

        .courses-scroll-area {
          margin-top: 20px;
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

export default Batches;
