import Axios from "../config/axios.config";

const url = import.meta.env.VITE_BACKEND_URL;
const userRoute = "/api/ideas/likes/";

const apiGetIdeaLikesByIdeaId = async (id) => {
  try {
    const response = await Axios.get(`${url}${userRoute}${id}`);
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

const apiGetTotalLikesReceivedByUserId = async (userId) => {
  try {
    const response = await Axios.get(`${url}${userRoute}/users/${userId}`);
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

const apiDeleteIdeaLikesById = async (id) => {
  try {
    const response = await Axios.delete(`${url}${userRoute}/${id}`);
    if (response.status === 204) {
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

const apiCreateIdeaLikes = async (userId, ideaId) => {
  const idUser = parseInt(userId, 10);
  const idIdea = parseInt(ideaId, 10);

  try {
    const response = await Axios.post(`${url}${userRoute}`, {
      idea_id: idIdea,
      user_id: idUser,
    });
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

export {
  apiGetIdeaLikesByIdeaId,
  apiGetTotalLikesReceivedByUserId,
  apiDeleteIdeaLikesById,
  apiCreateIdeaLikes,
};
