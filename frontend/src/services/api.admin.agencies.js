import Axios from "../config/axios.config";

const url = `http://${import.meta.env.VITE_BACKEND_URL}`;

const apiAdminAgencies = async () => {
  const route = "/api/admin/agencies/";
  const response = await Axios.get(`${url}${route}`);
  return response;
};

export default apiAdminAgencies;
