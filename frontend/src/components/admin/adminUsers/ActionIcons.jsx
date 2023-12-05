import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { EyeIcon, PencilSquareIcon, KeyIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import DialogResetPassword from "./DialogResetPassword";
import DialogUpdateUser from "./DialogUpdateUser";

export default function ActionIcons({ user, setUpdateList }) {
  const { t } = useTranslation();
  const [openDialogPassword, setOpenDialogPassword] = useState(false);
  const [openDialogUpdateUser, setOpenDialogUpdateUser] = useState(false);

  return (
    <>
      <Link to={`/users/${user.id}`}>
        <Tooltip
          title={t("pages.adminpannel.users.tableOfUsers.tooltip.visitprofil")}
          arrow
        >
          <IconButton className="my-1">
            <EyeIcon className="w-4 text-green-600" />
          </IconButton>
        </Tooltip>
      </Link>

      <Tooltip
        title={t("pages.adminpannel.users.tableOfUsers.tooltip.updateuser")}
        arrow
      >
        <IconButton
          onClick={() => setOpenDialogUpdateUser(true)}
          className="my-1"
        >
          <PencilSquareIcon className="w-4 text-yellow-600" />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={t(
          "pages.adminpannel.users.tableOfUsers.tooltip.updatecredentials"
        )}
        arrow
      >
        <IconButton
          onClick={() => setOpenDialogPassword(true)}
          className="my-1"
        >
          <KeyIcon className="w-4 text-sky-600" />
        </IconButton>
      </Tooltip>

      <DialogUpdateUser
        openDialogUpdateUser={openDialogUpdateUser}
        setOpenDialogUpdateUser={setOpenDialogUpdateUser}
        user={user}
        setUpdateList={setUpdateList}
      />

      <DialogResetPassword
        openDialogPassword={openDialogPassword}
        setOpenDialogPassword={setOpenDialogPassword}
        user={user}
        setUpdateList={setUpdateList}
      />
    </>
  );
}

ActionIcons.propTypes = {
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
  setUpdateList: PropTypes.func.isRequired,
};
