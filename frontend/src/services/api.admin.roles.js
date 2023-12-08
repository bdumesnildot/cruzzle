import Axios from "../config/axios.config";

const url = `http://${import.meta.env.VITE_BACKEND_URL}`;

const apiAdminRoles = async () => {
  const route = "/api/admin/roles/";
  const response = await Axios.get(`${url}${route}`);
  return response;
};

export default apiAdminRoles;
