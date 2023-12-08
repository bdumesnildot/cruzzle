import Axios from "../config/axios.config";

const url = import.meta.env.VITE_BACKEND_URL;
const userRoute = "/api/comments/";

const apiGetComments = async (route = "") => {
  try {
    const response = await Axios.get(`${url}${userRoute}${route}`);
    if (response.status === 200) {
      console.info(response.data);
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

const apiGetCommentsByIdeaId = async (id) => {
  try {
    const response = await Axios.get(`${url}${userRoute}/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

const apiGetTotalCommentsReceivedByUserId = async (userId) => {
  try {
    const response = await Axios.get(`${url}${userRoute}user/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch error:", error);
    }
    throw error;
  }
};

const apiUpdateComments = async (id, data) => {
  try {
    const response = await Axios.put(`${url}${userRoute}/${id}`, data);
    console.info(response);
    if (response.status === 201) {
      console.info(response.data);
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

const apiCreateComments = async (data) => {
  try {
    const response = await Axios.post(`${url}${userRoute}`, data);
    console.info(response);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

const apiDeleteComments = async (id) => {
  try {
    const response = await Axios.post(`${url}${userRoute}/${id}`);
    if (response.status === 204) {
      console.info(response.data);
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

export {
  apiGetComments,
  apiUpdateComments,
  apiCreateComments,
  apiDeleteComments,
  apiGetCommentsByIdeaId,
  apiGetTotalCommentsReceivedByUserId,
};
