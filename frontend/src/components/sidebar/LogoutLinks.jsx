import { useContext } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { UserContext } from "../../contexts/UserContext";
import { sm } from "../../utils/mediaQueries";

function LogoutLinks() {
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const smallQuery = useMediaQuery(sm.query);

  const handleLogout = () => {
    console.info("logout");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return !smallQuery ? (
    <ListItemButton
      onClick={handleLogout}
      component={Link}
      to="#"
      className={`w-full ${
        location.pathname === "#" ? "Mui-selected text-primary-50" : ""
      }`}
    >
      <ListItemIcon>
        <ArrowRightOnRectangleIcon
          className={`h-6 w-6 ${
            location.pathname === "#" ? "text-primary-50" : ""
          }`}
        />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  ) : null;
}
export default LogoutLinks;
