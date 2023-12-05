import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  IconButton,
  Tooltip,
  Badge,
  // ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../../contexts/UserContext";
import { apiGetCurrentUserNotificationsIdea } from "../../services/api.notifications";
import {
  setNotificationAsRed,
  setNotificationAsNotRed,
  deleteOneNotification,
} from "../../utils/notifications";
import SocketEvents from "../socket/SocketEvents";
import NotificationSound from "../../assets/audio/notification-sound.mp3";

export default function NotificationsMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationList, setNotificationList] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [playNotificationSound, setPlayNotificationSound] = useState(false);
  const audioPlayer = useRef(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setRefresh(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = (id) => () => {
    const not = notificationList.find((item) => item.id === id);
    if (not.red_at === null) {
      try {
        setNotificationAsRed(not.id, setRefresh);
      } catch (error) {
        console.error(error);
      } finally {
        navigate(`/ideas/${not.idea.id}`);
      }
    } else {
      navigate(`/ideas/${not.idea.id}`);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiGetCurrentUserNotificationsIdea(user.id);
        if (res.status === 200) {
          setNotificationList(res.data);
        } else {
          console.error("Cannot get notifications");
        }
      } catch (error) {
        console.error("Error getting notification", error);
      } finally {
        setRefresh(false);
      }
    };

    fetchNotifications();
  }, [refresh, user.id]);

  useEffect(() => {
    if (notificationList.length > 0) {
      const tot = notificationList.reduce(
        (acc, item) => acc + (item.red_at === null ? 1 : 0),
        0
      );
      setNotificationCount(tot);
    } else {
      setNotificationCount(0);
      setAnchorEl(null);
    }
  }, [notificationList]);

  useEffect(() => {
    if (playNotificationSound) {
      audioPlayer.current.play();
    }
    setPlayNotificationSound(false);
  }, [notificationList]);

  return (
    <div className="notification-menu">
      <Tooltip title={t("notifications.tooltip")} className="mx-1">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={notificationCount} color="primary">
            <BellIcon className="h-7 w-7" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notificationList.length > 0 ? (
          notificationList.map((not) => (
            <MenuItem
              key={`noti${not.id}`}
              className={`${
                not.red_at ? "" : "bg-[#f0e4f5]"
              } flex justify-between`}
            >
              <button
                id="notificationBtn"
                type="button"
                className="border-none bg-transparent cursor-pointer"
                onClick={handleClickNotification(not.id)}
              >
                {not.type === "like" ? (
                  <HandThumbUpIcon className="w-4 h-4 mr-2" />
                ) : (
                  <ChatBubbleBottomCenterIcon className="w-4 h-4 mr-2" />
                )}
                {`${t("notifications.from")} ${not.user.firstname} ${
                  not.user.lastname
                } - ${not.idea.title}`}
                <span className="text-xs text-gray-500 ml-2 hidden md:inline">{`(${dayjs(
                  not.created_at
                ).format(t("notifications.dateFormats.long"))})`}</span>
              </button>

              <div className="notification-action-btn">
                {not.red_at ? (
                  <IconButton
                    className="ml-4"
                    onClick={(event) => {
                      event.stopPropagation();
                      setNotificationAsNotRed(not.id, setRefresh);
                    }}
                  >
                    <EyeSlashIcon className="w-4 h-4" />
                  </IconButton>
                ) : (
                  <IconButton
                    className="ml-4"
                    onClick={(event) => {
                      event.stopPropagation();
                      setNotificationAsRed(not.id, setRefresh);
                    }}
                  >
                    <EyeIcon className="w-4 h-4" />
                  </IconButton>
                )}

                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteOneNotification(not.id, setRefresh);
                  }}
                >
                  <TrashIcon className="w-4" />
                </IconButton>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem>{t("notifications.menuItem")}</MenuItem>
        )}
      </Menu>
      <SocketEvents
        setRefresh={setRefresh}
        setPlayNotificationSound={setPlayNotificationSound}
      />

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio className="hidden" ref={audioPlayer} src={NotificationSound} />
    </div>
  );
}
