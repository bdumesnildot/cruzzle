import Axios from "../config/axios.config";

const url = `http://${import.meta.env.VITE_BACKEND_URL}`;
const route = "/api/agencies/";

const apiAgencies = async () => {
  try {
    const response = await Axios.get(`${url}${route}`);
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

export default apiAgencies;
