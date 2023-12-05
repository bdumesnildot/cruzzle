import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { apiUsersUpdatePasword } from "../../services/api.users";
import Axios from "../../config/axios.config";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function DialogPassword({ open, onClose }) {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const { handleSubmit, control, reset } = useForm();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  const { setOpen, setSeverity, setMessage, setTitle } =
    useContext(AlertToastContext);

  const navigate = useNavigate();

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const handleClose = () => {
    setPasswordError(false);
    setPasswordConfirmationError(false);
    reset();
    onClose();
  };

  const successUpdatePassword = () => {
    localStorage.removeItem("token");
    delete Axios.defaults.headers.common.Authorization;
    navigate("/login");
  };

  // Handle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPasswordConfirmation = () =>
    setShowPasswordConfirmation((show) => !show);

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    const isPasswordValid = password.length >= 4;
    const isPasswordConfirmed =
      password === confirmPassword && confirmPassword.length >= 4;

    setPasswordError(!isPasswordValid);
    setPasswordConfirmationError(!isPasswordConfirmed);

    if (isPasswordValid && isPasswordConfirmed) {
      const userData = {
        id: user.id,
        password,
      };

      try {
        const response = await apiUsersUpdatePasword(userData);
        if (response.status === 200) {
          setMessage(t("pages.settings.dialogPassword.alert.success.message"));
          setTitle(t("pages.settings.dialogPassword.alert.success.title"));
          successUpdatePassword();
        } else {
          setMessage(t("pages.settings.dialogPassword.alert.error.message"));
          setSeverity("error");
          setTitle(t("pages.settings.dialogPassword.alert.error.title"));
          handleClose();
        }
        setOpen(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{t("pages.settings.dialogPassword.title")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 4,
            }}
          >
            {t("pages.settings.dialogPassword.content")}
          </DialogContentText>

          <Controller
            name="username"
            control={control}
            defaultValue={user.mail}
            render={({ field: { value } }) => (
              <div style={{ display: "none" }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  placeholder="Enter your username"
                  value={value}
                  disabled
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    marginBottom: 4,
                  }}
                  autoComplete="your email"
                />
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                id="password-input"
                fullWidth
                label={t(
                  "pages.settings.dialogPassword.textfield.password.label"
                )}
                variant="outlined"
                placeholder={t(
                  "pages.settings.dialogPassword.textfield.password.placeholder"
                )}
                error={passwordError}
                helperText={passwordError ? "Incorrect entry." : null}
                value={value}
                onChange={onChange}
                onFocus={() => setShowPasswordConfirmation(false)}
                onBlur={() => setShowPassword(false)}
                type={showPassword ? "text" : "password"}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: 4,
                }}
                autoComplete="new-password"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                id="password-confirmation-input"
                fullWidth
                label={t(
                  "pages.settings.dialogPassword.textfield.passwordConfirm.label"
                )}
                variant="outlined"
                placeholder={t(
                  "pages.settings.dialogPassword.textfield.passwordConfirm.placeholder"
                )}
                error={passwordConfirmationError}
                helperText={
                  passwordConfirmationError
                    ? "The passwords entered do not match."
                    : null
                }
                value={value}
                onChange={onChange}
                onFocus={() => setShowPassword(false)}
                onBlur={() => setShowPasswordConfirmation(false)}
                type={showPasswordConfirmation ? "text" : "password"}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirmation}
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
                autoComplete="new-password"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            autoFocus
          >
            {t("buttons.cancel")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              boxShadow: 1,
              "&:hover": { boxShadow: 2 },
              "&:active, &.Mui-focusVisible": { boxShadow: 4 },
            }}
          >
            {t("buttons.confirm")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

DialogPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogPassword;
