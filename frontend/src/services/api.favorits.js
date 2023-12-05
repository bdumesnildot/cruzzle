import Axios from "../config/axios.config";

const url = import.meta.env.VITE_BACKEND_URL;
const userRoute = "/api/favorits/";

const postFavorit = async (user, id) => {
  try {
    const response = await Axios.post(`${url}${userRoute}`, {
      userId: user,
      ideaId: id,
    });
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

const deleteFavorit = async (user, id) => {
  try {
    const response = await Axios.delete(`${url}${userRoute}`, {
      data: {
        userId: user,
        ideaId: id,
      },
    });
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

export { postFavorit, deleteFavorit };
