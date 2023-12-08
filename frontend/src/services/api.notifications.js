import Axios from "../config/axios.config";

const url = `http://${import.meta.env.VITE_BACKEND_URL}`;

const apiGetCurrentUserNotificationsIdea = async (id) => {
  const route = "/api/notifications/ideas/";
  const response = await Axios.get(`${url}${route}${id}`);
  return response;
};

const apiCreateNotificationsIdea = async (item) => {
  const route = "/api/notifications/ideas/";
  const response = await Axios.post(`${url}${route}`, item);
  return response;
};

const apiUpdateNotificationsIdea = async (id, item) => {
  const route = "/api/notifications/ideas/";
  const response = await Axios.put(`${url}${route}${id}`, item);
  return response;
};

const apiDeleteOneNotificationIdea = async (id) => {
  const route = "/api/notifications/ideas/";
  const response = await Axios.delete(`${url}${route}${id}`);
  return response;
};

const apiDeleteManyNotificationIdea = async (item) => {
  const route = "/api/notifications/ideas/delete";
  const response = await Axios.put(`${url}${route}`, item);
  return response;
};

export {
  apiGetCurrentUserNotificationsIdea,
  apiCreateNotificationsIdea,
  apiUpdateNotificationsIdea,
  apiDeleteOneNotificationIdea,
  apiDeleteManyNotificationIdea,
};
