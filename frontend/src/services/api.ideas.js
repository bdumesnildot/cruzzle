import Axios from "../config/axios.config";

const url = import.meta.env.VITE_BACKEND_URL;
const ideaRoute = "/api/ideas/";

const apiIdeas = async (route = "") => {
  try {
    const response = await Axios.get(`${url}${ideaRoute}${route}`);
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

const apiTotalIdeasCount = async () => {
  try {
    const response = await Axios.get(`${url}${ideaRoute}total`);
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

const apiIdeasNew = async (data) => {
  try {
    const response = await Axios.post(`${url}${ideaRoute}`, data);
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
    // Ajouter la redirection (voir pour une fonction dans service qui prend un param "error" afin d'afficher la page erreur)
  }
};

const apiUpdateIdeaView = async (id, data) => {
  try {
    const response = await Axios.patch(`${url}${ideaRoute}views/${id}`, {
      views: data,
    });
    if (response.status === 201) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Internal server error from apiUpdateLike:", error);
    } else {
      console.error("Fetch  error:", error);
    }
    throw error;
  }
};

const apiArchiveIdeas = async (id) => {
  try {
    const response = await Axios.patch(`${url}${ideaRoute}archive/${id}`);
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

const apiUpdateIdeaById = async (id, data) => {
  try {
    const response = await Axios.put(`${url}${ideaRoute}${id}`, data);
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
  apiIdeas,
  apiTotalIdeasCount,
  apiArchiveIdeas,
  apiUpdateIdeaView,
  apiUpdateIdeaById,
  apiIdeasNew,
};
