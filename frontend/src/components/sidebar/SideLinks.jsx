import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  HomeIcon,
  LightBulbIcon,
  StarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import Collapse from "@mui/material/Collapse";
import LogoutLinks from "./LogoutLinks";
import { MenuContext } from "../../contexts/MenuContext";
import { UserContext } from "../../contexts/UserContext";

function SideLinks() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const isAdmin = [55, 88].includes(user.role.id);
  const navigate = useNavigate();

  const iconSize = (item) => {
    return `h-6 w-6 ${location.pathname === item.to ? "text-primary-50" : ""}`;
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleGoTo = (link) => {
    setActiveMenu(!activeMenu);
    navigate(link);
  };

  const navlinks = [
    {
      to: "/dashboard",
      primary: t("menu.sidebar.home"),
      icon: HomeIcon,
    },
    {
      to: "/ideas",
      primary: t("menu.sidebar.ideas"),
      icon: LightBulbIcon,
    },
    {
      to: "/favorites",
      primary: t("menu.sidebar.favorites"),
      icon: StarIcon,
    },
    {
      to: "/users",
      primary: t("menu.sidebar.community"),
      icon: UserGroupIcon,
    },
    {
      primary: t("menu.sidebar.admin.pannel"),
      icon: WrenchScrewdriverIcon,
      admin: true,
      subLink: [
        {
          to: "/admin/users",
          primary: t("menu.sidebar.admin.users"),
        },
        {
          to: "/admin/ideas",
          primary: t("menu.sidebar.admin.ideas"),
        },
        {
          to: "/admin/categories",
          primary: t("menu.sidebar.admin.categories"),
        },
      ],
    },
    {
      to: "/settings",
      primary: t("menu.sidebar.settings"),
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <div className="flex flex-col flex-1 w-full">
      <List
        sx={{
          width: "100%",
          bgcolor: "background.transparent",
        }}
        component="nav"
      >
        {navlinks.map((item) => {
          return (
            <React.Fragment key={item.primary}>
              {((!item.subLink && !item.admin) ||
                (!item.subLink && item.admin && isAdmin)) && (
                <ListItemButton
                  key={item.primary}
                  onClick={() => handleGoTo(item.to)}
                  className={`w-full ${
                    location.pathname === item.to
                      ? "Mui-selected text-primary-50"
                      : ""
                  }`}
                >
                  <ListItemIcon>
                    <item.icon className={iconSize(item)} />
                  </ListItemIcon>
                  <ListItemText primary={item.primary} />
                </ListItemButton>
              )}
              {((item.subLink && !item.admin) ||
                (item.subLink && item.admin && isAdmin)) && (
                <React.Fragment key={item.primary}>
                  <ListItemButton onClick={handleClick} className="w-full">
                    <ListItemIcon>
                      <item.icon className={iconSize(item)} />
                    </ListItemIcon>
                    <ListItemText primary={item.primary} />
                    {open ? (
                      <ChevronUpIcon className={iconSize(item)} />
                    ) : (
                      <ChevronDownIcon className={iconSize(item)} />
                    )}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subLink?.map((subitem) => (
                        <ListItemButton
                          sx={{ pl: 8 }}
                          key={`subitem ${subitem.to}`}
                          onClick={() => handleGoTo(subitem.to || "")}
                          className={` ${
                            location.pathname === subitem.to
                              ? "Mui-selected text-primary-50"
                              : ""
                          }`}
                        >
                          <ListItemText primary={subitem.primary} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
        <LogoutLinks />
      </List>
    </div>
  );
}
export default SideLinks;
