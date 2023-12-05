import Axios from "../config/axios.config";

const url = import.meta.env.VITE_BACKEND_URL;

const apiAdminUsers = async () => {
  const route = "/api/admin/users/";
  const response = await Axios.get(`${url}${route}`);
  return response;
};

const apiAdminCreateUser = async (newUser) => {
  const route = "/api/admin/users/";
  const response = await Axios.post(`${url}${route}`, newUser);
  return response;
};

const apiAdminUpdateUserById = async (id, updatedUser) => {
  const route = "/api/admin/users/";
  const response = await Axios.put(`${url}${route}${id}`, updatedUser);
  return response;
};

const apiAdminUpdateUserRoleById = async (id, updatedUser) => {
  const route = "/api/admin/users/roles/";
  const response = await Axios.put(`${url}${route}${id}`, updatedUser);
  return response;
};

export {
  apiAdminUsers,
  apiAdminCreateUser,
  apiAdminUpdateUserById,
  apiAdminUpdateUserRoleById,
};
