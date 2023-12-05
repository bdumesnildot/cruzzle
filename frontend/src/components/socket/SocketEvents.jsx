import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import socket from "../../config/socket.config";
import { UserContext } from "../../contexts/UserContext";

export default function SocketEvents({ setRefresh, setPlayNotificationSound }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [user]);

  useEffect(() => {
    function onConnect() {
      socket.emit("addUserId", user.id);
    }

    function onNewNotification() {
      setRefresh(true);
      setPlayNotificationSound(true);
    }

    socket.on("connect", onConnect);
    socket.on("new-notification", onNewNotification);

    return () => {
      socket.off("connect", onConnect);
      socket.off("new-notification", onNewNotification);
    };
  }, []);

  return <div />;
}

SocketEvents.propTypes = {
  setRefresh: PropTypes.func.isRequired,
  setPlayNotificationSound: PropTypes.func.isRequired,
};
