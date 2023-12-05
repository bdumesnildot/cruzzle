import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { apiAdminUpdateUserRoleById } from "../../../services/api.admin.users";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function TableSelectRole({ user, roleList }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setOpen, setMessage, setSeverity } = useContext(AlertToastContext);
  const [selectedUserRole, setSelectedUserRole] = useState(user.role.id);

  const handleChange = (event) => {
    const roleId = event.target.value;
    apiAdminUpdateUserRoleById(user.id, { role_id: roleId })
      .then((res) => {
        if (res.status === 200) {
          setSelectedUserRole(event.target.value);
          setMessage(t("pages.adminpannel.users.alert.success.updateRole"));
          setOpen(true);
        } else {
          setSelectedUserRole(user.role.id);
          setSeverity("error");
          setMessage(t("pages.adminpannel.users.alert.error.updateRole"));
          setOpen(true);
        }
      })
      .catch((error) => {
        setSelectedUserRole(user.role.id);
        navigate("/error", {
          state: {
            error: {
              status: 500,
            },
          },
        });
        console.error("Error updating user role", error);
      });
  };

  return (
    <FormControl variant="standard" size="small" className="w-28">
      <Select
        id="select-small"
        value={selectedUserRole}
        onChange={handleChange}
      >
        {roleList.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

TableSelectRole.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mail: PropTypes.string.isRequired,
    role: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    agency: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    joined_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    is_active: PropTypes.bool.isRequired,
    position: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  roleList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
