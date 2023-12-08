import Axios from "../config/axios.config";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminIdeas = async () => {
  const route = "/api/admin/ideas/";
  const response = await Axios.get(`${url}${route}`);
  return response;
};

const apiAdminArchiveIdea = async (id) => {
  const route = "/api/admin/ideas/archive/";
  const response = await Axios.put(`${url}${route}${id}`);
  return response;
};

const apiAdminDeleteIdea = async (id) => {
  const route = "/api/admin/ideas/delete/";
  const response = await Axios.put(`${url}${route}${id}`);
  return response;
};

export { apiAdminIdeas, apiAdminArchiveIdea, apiAdminDeleteIdea };
