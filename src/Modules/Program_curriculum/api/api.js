import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

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
