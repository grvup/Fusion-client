import axios from "axios";
import { host } from "../../../routes/globalRoutes";

const BASE_URL = host;

export const studentFetchSemesterData = async (id) => {
  try {
    if (!id) {
      throw new Error("Semester ID is required");
    }

    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/semester/${id}`,
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    throw error;
  }
};

export const studentFetchCourseSlotDetails = async (id) => {
  try {
    if (!id) {
      throw new Error("Semester ID is required");
    }

    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/courseslot/${id}`,
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    throw error;
  }
};

export const fetchAllProgrammes = async () => {
  try {
    // Fetch the token from localStorage
    const token = localStorage.getItem("authToken");

    // Check if token exists
    if (!token) {
      throw new Error("Authorization token is required");
    }

    // Make the API call with the token
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_programmes/`,
      {
        headers: {
          Authorization: `Token ${token}`, // Removed trailing comma here
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};

export const fetchSemestersOfCurriculumData = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/curriculum_semesters/${id}/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching curriculum data:", error);
    throw error;
  }
};

export const fetchWorkingCurriculumsData = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_working_curriculums/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching curriculums:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const fetchCurriculumData = async (id) => {
  try {
    // const token = localStorage.getItem("authToken"); // Uncomment if authentication is needed
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/curriculums/${id}`,
      // Uncomment if authentication is needed
      // {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching curriculum data: ", error);
    throw error;
  }
};

export const fetchDisciplinesData = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Replace with your token retrieval method
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_disciplines/`,
      {
        headers: {
          Authorization: `Token ${token}`, // Add Authorization header if needed
        },
      },
    );
    return response.data.disciplines; // Return the fetched disciplines data
  } catch (error) {
    console.error("Error fetching disciplines data:", error);
    throw error;
  }
};

export const fetchBatchesData = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_batches/`,
      {
        headers: {
          Authorization: `Token ${token}`, // Add Authorization header if token exists
        },
      },
    );

    // Assuming the API returns { batches, finished_batches, filter }
    return {
      runningBatches: response.data.batches,
      finishedBatches: response.data.finished_batches,
      filter: response.data.filter,
    };
  } catch (error) {
    console.error("Error fetching batch data:", error);
    throw error; // Propagate error to be handled by the calling function
  }
};

export const fetchCourseSlotData = async (courseslotId) => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_courseslot/${courseslotId}`,
      {
        headers: {
          Authorization: `Token ${token}`, // Add Authorization header
        },
      },
    );
    return response.data; // Return the fetched course slot data
  } catch (error) {
    console.error("Error fetching course slot data:", error);
    throw error; // Propagate error for handling by the caller
  }
};

export const fetchCourseDetails = async (id) => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_course/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`, // Add the Authorization header
        },
      },
    );
    // console.log(response.data);
    return response.data; // Return the fetched course details
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error; // Propagate error for handling by the caller
  }
};

export const fetchAllCourses = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve auth token
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_courses/`,
      {
        headers: {
          Authorization: `Token ${token}`, // Add Authorization header
        },
      },
    );
    return response.data.courses; // Return the courses data
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // Propagate error for handling by the caller
  }
};

export const adminFetchCurriculumSemesters = async (curriculumId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_curriculum_semesters/${curriculumId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchCurriculumSemesters: ", error);
    throw error.response?.data?.detail || "Failed to fetch curriculum data.";
  }
};

export const adminFetchCurriculumData = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/curriculums/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching curriculum data: ", error);
    throw error;
  }
};

export const adminFetchCourseInstructorData = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_instructor/`,
    );
    return response.data.course_instructors;
  } catch (error) {
    console.error("Error fetching course instructor data: ", error);
    throw error;
  }
};

export const fetchCourseSlotTypeChoices = async () => {
  try {
    // const token = localStorage.getItem("authToken"); // Uncomment if authentication is needed
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_get_course_slot_type/`,
      // Uncomment if authentication is needed
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching curriculum data: ", error);
    throw error;
  }
};
export const fetchSemesterDetails = async (curriculumId, semesterId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_get_semesterDetails/?semester_id=${semesterId}&curriculum_id=${curriculumId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    // Extracting curriculum details from response
    return response.data;
    // response.data;

    // Formatting the string as "CSE UG Curriculum v1.0, sem - 1"
    // return `${curriculum_name} v${curriculum_version}, sem - ${semester_number}`;
  } catch (error) {
    console.error("Error fetching curriculum data: ", error);
    throw error;
  }
};

export const fetchProgram = async (programmeId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_get_program/${programmeId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching program data: ", error);
    throw error;
  }
};

export const fetchCourslotData = async (courseslotid) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_edit_courseslot/${courseslotid}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data.courseslot;
  } catch (error) {
    console.error("Error fetching program data: ", error);
    throw error;
  }
};

export const fetchBatchName = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_get_batch_name/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching program data: ", error);
    throw error;
  }
};

export const fetchDisciplines = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_get_disciplines/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching program data: ", error);
    throw error;
  }
};

export const fetchGetUnlinkedCurriculum = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_get_unlinked_curriculam/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching program data: ", error);
    throw error;
  }
};
export const fetchBatchData = async (batch_id) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_edit_batch/${batch_id}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching program data: ", error);
    throw error;
  }
};

export const fetchFacultiesData = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/admin_faculties/`,
    );
    return response.data.faculties;
  } catch (error) {
    console.log("Error fetching faculties data: ", error);
    throw error;
  }
};

export const fetchFacultyCourseProposalData = async (username, designation) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${BASE_URL}/programme_curriculum/api/view_course_proposal_forms/?username=${username}&des=${designation}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error fetching faculties data: ", error);
    throw error;
  }
};

export const fetchFacultySuperiorData = async (username, designation) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${BASE_URL}/programme_curriculum/api/get_superior_data/?uploaderId=${username}&uploaderDes=${designation}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch superior data");
    }

    // console.log(response);
    return response;
  } catch (error) {
    console.log("Error fetching faculties data: ", error);
    throw error;
  }
};

export const fetchFacultyOutwardFilesData = async (username, designation) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${BASE_URL}/programme_curriculum/api/outward_files/?username=${username}&des=${designation}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch superior data");
    }

    // console.log(response);
    return response;
  } catch (error) {
    console.log("Error fetching faculties data: ", error);
    throw error;
  }
};

export const fetchFacultyInwardFilesData = async (username, designation) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${BASE_URL}/programme_curriculum/api/inward_files/?username=${username}&des=${designation}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch superior data");
    }

    // console.log(response);
    return response;
  } catch (error) {
    console.log("Error fetching faculties data: ", error);
    throw error;
  }
};
export const fetchFacultyViewInwardFilesData = async (
  fileId,
  username,
  designation,
) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${BASE_URL}/programme_curriculum/api/view_inward_files/${fileId}/?username=${username}&des=${designation}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch superior data");
    }

    // console.log(response);
    return response;
  } catch (error) {
    console.log("Error fetching faculties data: ", error);
    throw error;
  }
};
export const fetchFacultyCourseProposalCourseData = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${BASE_URL}/programme_curriculum/api/forward_course_forms_II/?id=${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch superior data");
    }

    // console.log(response);
    return response;
  } catch (error) {
    console.log("Error fetching faculties data: ", error);
    throw error;
  }
};
