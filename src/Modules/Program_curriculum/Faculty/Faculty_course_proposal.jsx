import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ScrollArea,
  Button,
  Container,
  Table,
  Grid,
  MantineProvider,
  Flex,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { fetchFacultyCourseProposalData } from "../api/api";
import { host } from "../../../routes/globalRoutes";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CourseProposalTable({ courseProposals, onArchiveSuccess }) {
  const navigate = useNavigate();
  const handleNavigation = (id) => {
    navigate(`/programme_curriculum/view_a_course_proposal_form?proposalid=${id}`);
  };

  const handleArchive = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${host}/programme_curriculum/api/file_archive/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const data = await response.json();
      
      if (response.ok) {
        onArchiveSuccess(id);
        alert("Course archived successfully");
      } else {
        throw new Error(data.message || "Failed to archive course");
      }
    } catch (error) {
      console.error("Error archiving course: ", error);
      alert("Failed to archive course");
    }
  };

  return (
    <div style={{ maxHeight: "61vh", overflowY: "auto", border: "1px solid #d3d3d3", borderRadius: "10px" }}>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Table style={{ backgroundColor: "white", padding: "20px", flexGrow: 1 }}>
        <thead>
          <tr>
            {["Created By", "Course Name", "Course Code", "View", "Submit", "Archive"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    fontSize: "16px",
                    textAlign: "center",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {courseProposals.length > 0 ? (
            courseProposals
              .filter((proposal) => proposal.fields.is_archive === false)
              .map((proposal, index) => (
                <tr
                  key={index}
                  style={{ backgroundColor: index % 2 !== 0 ? "#E6F7FF" : "#ffffff" }}
                >
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    {proposal.fields.uploader}
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    {proposal.fields.name}
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    {proposal.fields.code}
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    <Button
                      onClick={() => handleNavigation(proposal.pk)}
                      variant="filled"
                      style={{ backgroundColor: "#3498db" }}
                    >
                      View
                    </Button>
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    <Link to={`/programme_curriculum/filetracking?id=${proposal.pk}`}>
                      <Button
                        variant="filled"
                        style={{ backgroundColor: "#2ecc71" }}
                      >
                        Submit
                      </Button>
                    </Link>
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    <Button
                      onClick={() => handleArchive(proposal.pk)}
                      variant="filled"
                      style={{ backgroundColor: "gray" }}
                    >
                      Archive
                    </Button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "15px 20px" }}>
                No course proposals available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

function ArchivedCoursesTable({ courseProposals, onRestoreSuccess }) {
  const navigate = useNavigate();
  const handleNavigation = (courseCode) => {
    navigate(`/programme_curriculum/faculty_course_view?course=${courseCode}`);
  };

  const handleRestore = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${host}/programme_curriculum/api/file_unarchive/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        onRestoreSuccess(id);
        alert("Course restored successfully");
      } else {
        throw new Error(data.message || "Failed to restore course");
      }
    } catch (error) {
      console.error("Error restoring course: ", error);
      alert(error.message || "Failed to restore course");
    }
  };

  return (
    <div style={{ maxHeight: "61vh", overflowY: "auto", border: "1px solid #d3d3d3", borderRadius: "10px" }}>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Table style={{ backgroundColor: "white", padding: "20px", flexGrow: 1 }}>
        <thead>
          <tr>
            {["Created By", "Course Name", "Course Code", "View", "Restore"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{
                    padding: "15px 20px",
                    backgroundColor: "#C5E2F6",
                    color: "#3498db",
                    fontSize: "16px",
                    textAlign: "center",
                    borderRight: "1px solid #d3d3d3",
                  }}
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {courseProposals.length > 0 ? (
            courseProposals
              .filter((proposal) => proposal.fields.is_archive === true)
              .map((proposal, index) => (
                <tr
                  key={index}
                  style={{ backgroundColor: index % 2 !== 0 ? "#E6F7FF" : "#ffffff" }}
                >
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    {proposal.fields.uploader}
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    {proposal.fields.name}
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    {proposal.fields.code}
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    <Button
                      onClick={() => handleNavigation(proposal.fields.code)}
                      variant="filled"
                      style={{ backgroundColor: "#3498db" }}
                    >
                      View
                    </Button>
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "center", color: "black", borderRight: "1px solid #d3d3d3" }}>
                    <Button
                      onClick={() => handleRestore(proposal.pk)}
                      variant="filled"
                      style={{ backgroundColor: "#2ecc71" }}
                    >
                      Restore
                    </Button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "15px 20px" }}>
                No archived course proposals available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

function FormSection({
  activeTab,
  setActiveTab,
  title,
  formType,
  onArchiveSuccess,
  onRestoreSuccess,
  filteredProposals,
}) {
  return (
    <Container style={{ padding: "20px", maxWidth: "100%" }}>
      <Flex justify="flex-start" align="center" mb={10}>
        <Button
          variant={activeTab === "new-courses" ? "filled" : "outline"}
          onClick={() => setActiveTab("new-courses")}
          style={{ marginRight: "10px" }}
        >
          {title}
        </Button>
        <Button
          variant={activeTab === "archived-courses" ? "filled" : "outline"}
          onClick={() => setActiveTab("archived-courses")}
          style={{ marginRight: "10px" }}
        >
          Archived Files
        </Button>
        
        {formType === "new-forms" && (
          <Button 
            component={Link} 
            to="/programme_curriculum/new_course_proposal_form"
            variant="outline"
            style={{ marginLeft: "auto" }}
          >
            Add Course Proposal Form
          </Button>
        )}
        
        {formType === "updated-forms" && (
          <Button 
            component={Link}
            to="/programme_curriculum/faculty_courses"
            variant="outline"
            style={{ marginLeft: "auto" }}
          >
            Update Course Proposal Form
          </Button>
        )}
      </Flex>
      
      <Grid mt={20}>
        <Grid.Col span={12}>
          {activeTab === "new-courses" ? (
            <CourseProposalTable
              courseProposals={filteredProposals}
              onArchiveSuccess={onArchiveSuccess}
            />
          ) : (
            <ArchivedCoursesTable
              courseProposals={filteredProposals}
              onRestoreSuccess={onRestoreSuccess}
            />
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}

function Admin_course_proposal_form() {
  const [activeForm, setActiveForm] = useState("new-forms");
  const [activeTab, setActiveTab] = useState("new-courses");
  const [courseProposals, setCourseProposals] = useState([]);
  const [filter, setFilter] = useState({
    uploader: "",
    name: "",
    code: "",
  });
  const username = useSelector((state) => state.user.roll_no);
  const role = useSelector((state) => state.user.role);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (username) {
      const fetchFacultyCourseProposal = async (uname, des) => {
        try {
          const response = await fetchFacultyCourseProposalData(uname, des);
          sessionStorage.setItem(
            "courseProposals",
            JSON.stringify(response.courseProposals),
          );
          setCourseProposals(response.courseProposals);
        } catch (error) {
          console.error("Error fetching courses: ", error);
        }
      };
      fetchFacultyCourseProposal(username, role);
    }
  }, [username, role]);

  const handleArchiveSuccess = (archivedId) => {
    setCourseProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.pk === archivedId
          ? { ...proposal, fields: { ...proposal.fields, is_archive: true } }
          : proposal,
      ),
    );
  };

  const handleRestoreSuccess = (restoredId) => {
    setCourseProposals((prevProposals) =>
      prevProposals.map((proposal) =>
        proposal.pk === restoredId
          ? { ...proposal, fields: { ...proposal.fields, is_archive: false } }
          : proposal,
      ),
    );
  };

  const handleFormSwitch = (form) => {
    setActiveForm(form);
    setActiveTab("new-courses");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const applyFilters = (data) => {
    return data.filter((proposal) => {
      return (
        proposal.fields.uploader.toLowerCase().includes(filter.uploader.toLowerCase()) &&
        proposal.fields.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        proposal.fields.code.toLowerCase().includes(filter.code.toLowerCase())
      );
    });
  };

  const filteredProposals = applyFilters(courseProposals);

  return (
    <MantineProvider theme={{ colorScheme: "light" }} withGlobalStyles withNormalizeCSS>
      <Container style={{ padding: "20px", maxWidth: "100%" }}>
      <Flex justify="flex-start" align="center" mb={10}>
          <Button
            onClick={() => handleFormSwitch("new-forms")}
            variant={activeForm === "new-forms" ? "outline" : "subtle"}
            style={{ marginRight: "10px" }}
          >
            New Forms
          </Button>
          <Button
            onClick={() => handleFormSwitch("updated-forms")}
            variant={activeForm === "updated-forms" ? "outline" : "subtle"}
            style={{ marginRight: "10px" }}
          >
            Updated Forms
          </Button>
        </Flex>
        
        <hr />
        
        <Grid mt={20}>
          {isMobile && (
            <Grid.Col span={12} mb={20}>
              <ScrollArea type="hover">
                {[
                  { label: "Created By", name: "uploader" },
                  { label: "Course Name", name: "name" },
                  { label: "Course Code", name: "code" },
                ].map((input, index) => (
                  <TextInput
                    key={index}
                    label={`${input.label}:`}
                    placeholder={`Filter by ${input.label}`}
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
            <div style={{ backgroundColor: "#f5f7f8", borderRadius: "10px" }}>
              {activeForm === "new-forms" && (
                <FormSection
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  title="New Course Proposal Forms"
                  formType="new-forms"
                  courseProposals={courseProposals}
                  onArchiveSuccess={handleArchiveSuccess}
                  onRestoreSuccess={handleRestoreSuccess}
                  filteredProposals={filteredProposals}
                />
              )}

              {activeForm === "updated-forms" && (
                <FormSection
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  title="Updated Course Proposal Forms"
                  formType="updated-forms"
                  courseProposals={courseProposals}
                  onArchiveSuccess={handleArchiveSuccess}
                  onRestoreSuccess={handleRestoreSuccess}
                  filteredProposals={filteredProposals}
                />
              )}
            </div>
          </Grid.Col>
          
          {!isMobile && (
            <Grid.Col span={3}>
              <ScrollArea type="hover">
                {[
                  { label: "Created By", name: "uploader" },
                  { label: "Course Name", name: "name" },
                  { label: "Course Code", name: "code" },
                ].map((input, index) => (
                  <TextInput
                    key={index}
                    label={`${input.label}:`}
                    placeholder={`Filter by ${input.label}`}
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
      </Container>
    </MantineProvider>
  );
}

FormSection.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  courseProposals: PropTypes.array.isRequired,
  filteredProposals: PropTypes.array.isRequired,
  onArchiveSuccess: PropTypes.func,
  onRestoreSuccess: PropTypes.func,
};

CourseProposalTable.propTypes = {
  courseProposals: PropTypes.array.isRequired,
  onArchiveSuccess: PropTypes.func,
};

ArchivedCoursesTable.propTypes = {
  courseProposals: PropTypes.array.isRequired,
  onRestoreSuccess: PropTypes.func,
};

export default Admin_course_proposal_form;