import Axios from "../config/axios.config";

const url = import.meta.env.VITE_BACKEND_URL;
const userRoute = "/api/categories/";

const apiCategories = async (route = "") => {
  try {
    const response = await Axios.get(`${url}${userRoute}${route}`);
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
    // Ajouter la redirection (voir pour une fonction dans service qui prend un param "error" afin d'afficher la page erreur)
  }
};

const apiCategoriesOrder = async () => {
  try {
    const response = await Axios.get(`${url}${userRoute}order`);
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
    // Ajouter la redirection (voir pour une fonction dans service qui prend un param "error" afin d'afficher la page erreur)
  }
};

export { apiCategories, apiCategoriesOrder };
