import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation, Trans } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { apiAdminUpdateUserById } from "../../../services/api.admin.users";

import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function DialogResetPassword({
  openDialogPassword,
  setOpenDialogPassword,
  user,
  setUpdateList,
}) {
  const { t } = useTranslation();

  const { setMessage, setOpen, setSeverity } = useContext(AlertToastContext);
  // Fields values
  const { firstname, lastname } = user;
  const [email, setEmail] = useState(user.mail);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Fiels values validation
  const [emailError, setEmailError] = useState(false);
  const [emailErroressage, setEmailErrorMessage] = useState("Incorrect entry");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  // Handle values change
  const handleChangeMail = (event) => {
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

  const handleClose = () => {
    setEmail(user.mail);
    setEmailError(false);
    setPassword("");
    setPasswordError(false);
    setEmailErrorMessage(
      t(
        "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.password.helpertext"
      )
    );
    setPasswordConfirmation("");
    setPasswordConfirmationError(false);
    setOpenDialogPassword(false);
  };

  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordConfirmed =
      password === passwordConfirmation && passwordConfirmation.length >= 4;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setPasswordConfirmationError(!isPasswordConfirmed);

    if (isEmailValid && isPasswordValid && isPasswordConfirmed) {
      const updatedLogin = { password };
      if (email !== user.mail) {
        updatedLogin.mail = email;
      }

      apiAdminUpdateUserById(user.id, updatedLogin)
        .then((res) => {
          if (res.status === 200) {
            setUpdateList(true);
            setMessage(
              t(
                "pages.adminpannel.users.tableOfUsers.dialogResetPassword.alert.success.message"
              )
            );
            setOpen(true);
            handleClose();
          } else {
            setSeverity("error");
            setMessage(
              t(
                "pages.adminpannel.users.tableOfUsers.dialogResetPassword.alert.error.user"
              )
            );
            setOpen(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setEmailError(true);
            setEmailErrorMessage(
              t(
                "pages.adminpannel.users.tableOfUsers.dialogResetPassword.alert.error.message"
              )
            );
          } else {
            setSeverity("error");
            setMessage(
              t(
                "pages.adminpannel.users.tableOfUsers.dialogResetPassword.alert.error.update"
              )
            );
            setOpen(true);
            console.error("error updating user", err);
          }
        });
    }
  };

  return (
    <div>
      <Dialog open={openDialogPassword} onClose={handleClose}>
        <DialogTitle>
          <Trans
            i18nKey="pages.adminpannel.users.tableOfUsers.dialogResetPassword.title"
            firstname={firstname}
            lastname={lastname}
          >
            Update credentials for {{ firstname }} {{ lastname }}
          </Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 3,
            }}
          >
            {t(
              "pages.adminpannel.users.tableOfUsers.dialogResetPassword.content"
            )}
          </DialogContentText>

          <TextField
            id="name"
            label={t(
              "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.email.label"
            )}
            type="email"
            fullWidth
            variant="standard"
            placeholder={t(
              "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.email.placeholder"
            )}
            value={email}
            error={emailError}
            helperText={emailError ? emailErroressage : null}
            onChange={handleChangeMail}
            InputLabelProps={{ shrink: true }}
            sx={{
              marginBottom: 4,
            }}
          />

          <TextField
            id="password-input"
            label={t(
              "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.password.label"
            )}
            fullWidth
            variant="standard"
            placeholder={t(
              "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.password.placeholder"
            )}
            error={passwordError}
            helperText={
              passwordError
                ? t(
                    "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.password.helpertext"
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
              "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.passwordConfirm.placeholder"
            )}
            error={passwordConfirmationError}
            helperText={
              passwordConfirmationError
                ? t(
                    "pages.adminpannel.users.tableOfUsers.dialogResetPassword.textfield.passwordConfirm.helpertext"
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
          <Button onClick={handleSubmit}>{t("buttons.update")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogResetPassword.propTypes = {
  openDialogPassword: PropTypes.bool.isRequired,
  setOpenDialogPassword: PropTypes.func.isRequired,
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
