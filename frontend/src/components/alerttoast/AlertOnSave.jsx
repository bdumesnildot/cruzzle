import { Alert, Snackbar, AlertTitle } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function AlertOnSave() {
  const {
    open,
    setOpen,
    severity,
    setSeverity,
    message,
    title,
    setTitle,
    onCloseAction,
    variant,
    setVariant,
    anchor,
    setAnchor,
  } = useContext(AlertToastContext);
  const [defaultAnchor, setDefaultAnchor] = useState(null);
  const [defaultTitle, setDefaultTitle] = useState(null);
  const [defaultVariant, setDefaultVariant] = useState(null);
  const [defaultSeverity, setDefaultSeverity] = useState(null);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onCloseAction();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setAnchor(null);
      setTitle("");
      setVariant(null);
      setSeverity("success");
    } else {
      setDefaultAnchor(anchor);
      setDefaultTitle(title);
      setDefaultVariant(variant);
      setDefaultSeverity(severity);
    }
  }, [open]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={
        defaultAnchor || { vertical: "bottom", horizontal: "right" }
      }
    >
      <Alert
        severity={defaultSeverity || "success"}
        variant={defaultVariant || "filled"}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {title && <AlertTitle>{defaultTitle}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertOnSave;
