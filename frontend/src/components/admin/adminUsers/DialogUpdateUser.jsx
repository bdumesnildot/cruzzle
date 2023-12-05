import { useState, useContext } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation, Trans } from "react-i18next";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogUserSelectAgency from "./DialogUserSelectAgency";
import DialogUserSelectPosition from "./DialogUserSelectPosition";
import { apiAdminUpdateUserById } from "../../../services/api.admin.users";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function DialogUpdateUser({
  user,
  openDialogUpdateUser,
  setOpenDialogUpdateUser,
  setUpdateList,
}) {
  const { t } = useTranslation();

  const { setMessage, setOpen, setSeverity } = useContext(AlertToastContext);
  // Fields values
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [joinAt, setJoinAt] = useState(user.joined_at);
  const [agency, setAgency] = useState(user.agency);
  const [position, setPosition] = useState(user.position);

  // Fiels values validation
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [joinAtError, setJoinAtError] = useState(false);
  const [agencyError, setAgencyError] = useState(false);
  const [positionError, setPositionError] = useState(false);

  // Handle values change
  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastname(event.target.value);
  };

  // Handle form closing
  const handleClose = () => {
    setFirstnameError(false);
    setLastnameError(false);
    setJoinAtError(false);
    setAgencyError(false);
    setPositionError(false);
    setOpenDialogUpdateUser(false);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setJoinAt(user.joined_at);
    setAgency(user.agency);
    setPosition(user.position);
  };

  const handleSubmit = async () => {
    const isFirstnameValid = firstname.length >= 2;
    const isLastnameValid = lastname.length >= 2;
    const isJoinAtValid = dayjs(joinAt).isValid();
    const isAgencyValid = typeof agency.id === "number";
    const isPositionValid = typeof position.id === "number";

    setFirstnameError(!isFirstnameValid);
    setLastnameError(!isLastnameValid);
    setJoinAtError(!isJoinAtValid);
    setAgencyError(!isAgencyValid);
    setPositionError(!isPositionValid);

    if (
      isFirstnameValid &&
      isLastnameValid &&
      isJoinAtValid &&
      isAgencyValid &&
      isPositionValid
    ) {
      const updatedUser = {
        firstname,
        lastname,
        agency_id: agency.id,
        joined_at: joinAt,
        position_id: position.id,
      };

      apiAdminUpdateUserById(user.id, updatedUser)
        .then((res) => {
          if (res.status === 200) {
            setUpdateList(true);
            setMessage(t("pages.adminpannel.users.alert.success.update"));
            setOpen(true);
            handleClose();
          } else {
            setMessage(t("pages.adminpannel.users.alert.error.update"));
            setSeverity("error");
            setOpen(true);
          }
        })
        .catch((err) => {
          setMessage(t("pages.adminpannel.users.alert.error.update"));
          setSeverity("error");
          setOpen(true);
          console.error("error updating user", err);
        });
    }
  };

  return (
    <Dialog
      open={openDialogUpdateUser}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{`${t(
        "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.title"
      )} ${user.firstname} ${user.lastname}`}</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            marginBottom: 4,
          }}
        >
          <Trans
            i18nKey="pages.adminpannel.users.tableOfUsers.dialogUpdateUser.content"
            firstname={firstname}
            lastname={lastname}
          >
            You are about to edit {{ firstname }} {{ lastname }}'s informations.
            Please fill in the form below.
          </Trans>
        </DialogContentText>

        <TextField
          id="firstname"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.firstname.label"
          )}
          type="text"
          fullWidth
          variant="standard"
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.firstname.placeholder"
          )}
          value={firstname}
          error={firstnameError}
          helperText={
            firstnameError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.firstname.helpertext"
                )
              : null
          }
          onChange={handleChangeFirstname}
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 1,
          }}
        />

        <TextField
          id="lastname"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.lastname.label"
          )}
          type="text"
          fullWidth
          variant="standard"
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.lastname.placeholder"
          )}
          value={lastname}
          error={lastnameError}
          helperText={
            lastnameError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.lastname.helpertext"
                )
              : null
          }
          onChange={handleChangeLastName}
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 8,
          }}
        />

        <DateField
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.joinedAt.label"
          )}
          value={dayjs(joinAt)}
          onChange={(newDate) =>
            setJoinAt(
              dayjs(newDate).format(
                t("pages.adminpannel.users.dateFormats.long")
              )
            )
          }
          error={joinAtError}
          helperText={
            joinAtError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.textfield.joinedAt.helpertext"
                )
              : null
          }
          fullWidth
          variant="standard"
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 1,
          }}
        />

        <DialogUserSelectAgency
          user={user}
          selectedAgency={agency}
          setSelectedAgency={setAgency}
          agencyError={agencyError}
        />

        <DialogUserSelectPosition
          user={user}
          selectedPosition={position}
          setSelectedPosition={setPosition}
          positionError={positionError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("buttons.cancel")}</Button>
        <Button onClick={handleSubmit}>{t("buttons.update")}</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogUpdateUser.propTypes = {
  openDialogUpdateUser: PropTypes.bool.isRequired,
  setOpenDialogUpdateUser: PropTypes.func.isRequired,
  setUpdateList: PropTypes.func.isRequired,
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
};
