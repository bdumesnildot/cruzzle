import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  IconButton,
  Tooltip,
  Badge,
  ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function LanguagesMenu() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n } = useTranslation();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const languages = [
    {
      code: "GB",
      value: "EN",
      language: "English",
    },
    {
      code: "FR",
      value: "FR",
      language: "Français",
    },
  ];

  return (
    <div className="languages-menu">
      <Tooltip title="Langages" className="mx-1">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge
            badgeContent={language.toUpperCase()}
            sx={{
              "& .MuiBadge-badge": {
                color: "#FFFFFF",
                backgroundColor: "#7C7C7C",
              },
            }}
          >
            <GlobeAltIcon className="h-7 w-7" />
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
        {languages.map((item) => (
          <MenuItem
            onClick={() => {
              i18n.changeLanguage(item.value.toLowerCase());
              setLanguage(item.value);
            }}
            key={item.value}
          >
            <ListItemIcon>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                alt=""
              />
            </ListItemIcon>
            {item.language}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
