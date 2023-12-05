import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DialogUserSelectAgency from "./DialogUserSelectAgency";
import DialogUserSelectPosition from "./DialogUserSelectPosition";
import { apiAdminCreateUser } from "../../../services/api.admin.users";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function DialogCreateUser({
  openDialogAddUser,
  setOpenDialogAddUser,
  setUpdateList,
}) {
  const { t } = useTranslation();
  const { setOpen, setMessage } = useContext(AlertToastContext);
  // Fields values
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [joinAt, setJoinAt] = useState("");
  const [agency, setAgency] = useState(null);
  const [position, setPosition] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Fiels values validation
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [joinAtError, setJoinAtError] = useState(false);
  const [agencyError, setAgencyError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErroressage, setEmailErrorMessage] = useState("Incorrect entry");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  // Handle values change
  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastname(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((show) => !show);

  const handleMouseDownPasswordConfirmation = (event) => {
    event.preventDefault();
  };

  // Handle form closing
  const handleClose = () => {
    setFirstname("");
    setFirstnameError(false);
    setLastname("");
    setLastnameError(false);
    setJoinAt("");
    setJoinAtError(false);
    setAgency(null);
    setAgencyError(false);
    setPosition(null);
    setPositionError(false);
    setEmail("");
    setEmailError(false);
    setEmailErrorMessage("Incorrect entry");
    setPassword("");
    setPasswordError(false);
    setPasswordConfirmation("");
    setPasswordConfirmationError(false);
    setOpenDialogAddUser(false);
  };

  const handleSubmit = async () => {
    const isFirstnameValid = firstname.length >= 2;
    const isLastnameValid = lastname.length >= 2;
    const isJoinAtValid = dayjs(joinAt).isValid();
    const isAgencyValid = typeof agency.id === "number";
    const isPositionValid = typeof position.id === "number";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordConfirmed =
      password === passwordConfirmation && passwordConfirmation.length >= 4;

    setFirstnameError(!isFirstnameValid);
    setLastnameError(!isLastnameValid);
    setJoinAtError(!isJoinAtValid);
    setAgencyError(!isAgencyValid);
    setPositionError(!isPositionValid);
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setPasswordConfirmationError(!isPasswordConfirmed);

    if (
      isFirstnameValid &&
      isLastnameValid &&
      isJoinAtValid &&
      isAgencyValid &&
      isPositionValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmed
    ) {
      const newUser = {
        mail: email,
        password,
        role_id: 0,
        firstname,
        lastname,
        agency_id: agency.id,
        joined_at: joinAt,
        position_id: position.id,
        is_active: true,
      };

      apiAdminCreateUser(newUser)
        .then((res) => {
          if (res.status === 201) {
            setUpdateList(true);
            setMessage(
              t(
                "pages.adminpannel.users.tableOfUsers.dialogCreateUser.alert.success.message"
              )
            );
            setOpen(true);
            handleClose();
          } else {
            console.error("Cannot create new user");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setEmailError(true);
            setEmailErrorMessage(
              t(
                "pages.adminpannel.users.tableOfUsers.dialogCreateUser.alert.error.message"
              )
            );
          } else {
            console.error("error creating new user", err);
          }
        });
    }
  };

  return (
    <Dialog
      open={openDialogAddUser}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {t("pages.adminpannel.users.tableOfUsers.dialogCreateUser.title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            marginBottom: 4,
          }}
        >
          {t("pages.adminpannel.users.tableOfUsers.dialogCreateUser.content")}
        </DialogContentText>

        <TextField
          id="firstname"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.firstname.label"
          )}
          type="text"
          fullWidth
          variant="standard"
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.firstname.placeholder"
          )}
          value={firstname}
          error={firstnameError}
          helperText={
            firstnameError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.firstname.helpertext"
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
          id="lasttname"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.lastname.label"
          )}
          type="text"
          fullWidth
          variant="standard"
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.lastname.placeholder"
          )}
          value={lastname}
          error={lastnameError}
          helperText={
            lastnameError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.lastname.helpertext"
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
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.joinedAt.label"
          )}
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
                  "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.joinedAt.helpertext"
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
          selectedAgency={agency}
          setSelectedAgency={setAgency}
          agencyError={agencyError}
        />

        <DialogUserSelectPosition
          selectedPosition={position}
          setSelectedPosition={setPosition}
          positionError={positionError}
        />

        <TextField
          id="email"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.email.label"
          )}
          type="email"
          fullWidth
          variant="standard"
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.email.placeholder"
          )}
          value={email}
          error={emailError}
          helperText={emailError ? emailErroressage : null}
          onChange={handleChangeEmail}
          InputLabelProps={{ shrink: true }}
          sx={{
            marginBottom: 2,
          }}
        />

        <TextField
          id="password-input"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.password.label"
          )}
          fullWidth
          variant="standard"
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.password.placeholder"
          )}
          error={passwordError}
          helperText={
            passwordError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.password.helpertext"
                )
              : null
          }
          value={password}
          onChange={handleChangePassword}
          type={showPassword ? "text" : "password"}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            marginBottom: 2,
          }}
        />

        <TextField
          id="password-confirmation-input"
          fullWidth
          variant="standard"
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.passwordConfirm.placeholder"
          )}
          error={passwordConfirmationError}
          helperText={
            passwordConfirmationError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogCreateUser.textfield.passwordConfirm.helpertext"
                )
              : null
          }
          value={passwordConfirmation}
          onChange={handleChangePasswordConfirmation}
          type={showPasswordConfirmation ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirmation}
                  onMouseDown={handleMouseDownPasswordConfirmation}
                >
                  {showPasswordConfirmation ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            marginBottom: 1,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t("buttons.cancel")}</Button>
        <Button onClick={handleSubmit}>{t("buttons.adduser")}</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogCreateUser.propTypes = {
  openDialogAddUser: PropTypes.bool.isRequired,
  setOpenDialogAddUser: PropTypes.func.isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
