import dayjs from "dayjs";
import {
  apiCreateNotificationsIdea,
  apiUpdateNotificationsIdea,
  apiDeleteOneNotificationIdea,
  apiDeleteManyNotificationIdea,
} from "../services/api.notifications";

const createNotification = async (currentUserId, idea, type) => {
  if (currentUserId !== idea.user.id) {
    const notification = {
      idea_id: idea.id,
      user_id: currentUserId,
      type,
    };
    try {
      const res = await apiCreateNotificationsIdea(notification);
      if (res.status !== 201) {
        console.error("Cannot create notification");
      }
    } catch (error) {
      console.error("Error creating notification", error);
    }
  }
};

const setNotificationAsRed = async (id, setter = () => {}) => {
  const item = {
    red_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };
  try {
    const res = await apiUpdateNotificationsIdea(id, item);
    if (res.status === 200) {
      if (setter) setter(true);
    } else {
      console.error("Cannot set notification as read");
    }
  } catch (error) {
    console.error("Error setting notification as read", error);
  }
};

const setNotificationAsNotRed = async (id, setter = () => {}) => {
  const item = {
    red_at: null,
  };
  try {
    const res = await apiUpdateNotificationsIdea(id, item);
    if (res.status === 200) {
      if (setter) setter(true);
    } else {
      console.error("Cannot set notification as not read");
    }
  } catch (error) {
    console.error("Error setting notification as not read", error);
  }
};

const deleteOneNotification = async (id, setter = () => {}) => {
  try {
    const res = await apiDeleteOneNotificationIdea(id);
    if (res.status === 200) {
      if (setter) setter(true);
    } else {
      console.error("Cannot delete notification");
    }
  } catch (error) {
    console.error("Error deleting notification", error);
  }
};

const deleteManyNotification = async (currentUserId, idea, type) => {
  const notification = {
    idea_id: idea.id,
    user_id: currentUserId,
    type,
  };
  try {
    const res = await apiDeleteManyNotificationIdea(notification);
    if (res.status !== 200) {
      console.error("Cannot delete notification");
    }
  } catch (error) {
    console.error("Error deleting notification", error);
  }
};

export {
  createNotification,
  setNotificationAsRed,
  setNotificationAsNotRed,
  deleteOneNotification,
  deleteManyNotification,
};
