import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

export default function DialogConfirm(props) {
  const { t } = useTranslation();
  const { dialConfirmIsOpen, setDialConfirmIsOpen, setIsConfirmed, title } =
    props;

  const handleConfirm = () => {
    setIsConfirmed(true);
    setDialConfirmIsOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmed(false);
    setDialConfirmIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={dialConfirmIsOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("pages.adminpannel.ideas.dialogConfirm.content")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t("buttons.cancel")}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {t("buttons.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogConfirm.propTypes = {
  dialConfirmIsOpen: PropTypes.bool.isRequired,
  setDialConfirmIsOpen: PropTypes.func.isRequired,
  setIsConfirmed: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
