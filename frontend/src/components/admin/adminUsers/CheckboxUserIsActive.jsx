import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { apiAdminUpdateUserById } from "../../../services/api.admin.users";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function CheckboxUserIsActive(props) {
  const { t } = useTranslation();
  const { setOpen, setMessage, setSeverity } = useContext(AlertToastContext);
  const { isActiveUser, setIsActiveUser, userId } = props;

  const handleChange = () => {
    apiAdminUpdateUserById(userId, { is_active: !isActiveUser })
      .then((res) => {
        if (res.status === 200) {
          setIsActiveUser(!isActiveUser);
          setMessage(
            t("pages.adminpannel.users.tableOfUsers.tooltip.active.alert")
          );
          setOpen(true);
        } else {
          setSeverity("error");
          setMessage(
            t("pages.adminpannel.users.tableOfUsers.tooltip.active.error")
          );
          setOpen(true);
        }
      })
      .catch((error) => {
        setSeverity("error");
        setMessage(
          t("pages.adminpannel.users.tableOfUsers.tooltip.active.error")
        );
        setOpen(true);
        console.error("Error setting user Active/Unactive", error);
      });
  };

  return (
    <Tooltip
      title={t("pages.adminpannel.users.tableOfUsers.tooltip.active.title")}
      arrow
    >
      <Checkbox checked={isActiveUser} onChange={handleChange} />
    </Tooltip>
  );
}

CheckboxUserIsActive.propTypes = {
  isActiveUser: PropTypes.bool.isRequired,
  setIsActiveUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
