import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";

function DialogArchive({ open, setOpen, handleAgree }) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t("pages.ideas.idea.dialogArchive.title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Trans i18nKey="pages.ideas.idea.dialogArchive.content">
            Are you sure you want to archive this idea? This action is{" "}
            <strong>irreversible</strong> and will permanently remove the idea
            from the active list.
            <br />
            <br />
            Please note that archived ideas cannot be restored.
          </Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpen(false)}
          autoFocus
        >
          {t("buttons.cancel")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleAgree}
          sx={{
            boxShadow: 1,
            "&:hover": { boxShadow: 2 },
            "&:active, &.Mui-focusVisible": { boxShadow: 4 },
          }}
        >
          {t("buttons.agree")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogArchive.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleAgree: PropTypes.func.isRequired,
};

export default DialogArchive;
