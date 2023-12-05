import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { SliderPicker } from "react-color";
import CustomChip from "../../styledComponents/CustomChip";
import { apiAdminCreateCategory } from "../../../services/api.admin.categories";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function DialogCreateCategory({
  openDialog,
  setOpenDialog,
  setUpdateList,
}) {
  const { t } = useTranslation();
  const { setOpen, setMessage } = useContext(AlertToastContext);
  const [label, setLabel] = useState("");
  const [labelError, setLabelError] = useState(false);
  const [color, setColor] = useState("rgba(64, 191, 191, 1)");

  const handleChangeLabel = (event) => {
    setLabel(event.target.value);
  };

  const handleChangeColor = (colort) => {
    const { r, g, b, a } = colort.rgb;
    const rgbaValue = `rgba(${r}, ${g}, ${b}, ${a})`;
    setColor(rgbaValue);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const isLabelValid = label.length >= 2 && label.length <= 25;
    setLabelError(!isLabelValid);

    if (isLabelValid) {
      apiAdminCreateCategory({ label, color })
        .then((res) => {
          if (res.status === 201) {
            setUpdateList(true);
            setMessage(
              t("pages.adminpannel.categories.alert.success.createcategory")
            );
            setOpen(true);
            handleClose();
          } else {
            console.error("Cannot create category");
          }
        })
        .catch((err) => {
          console.error("error creating category", err);
        });
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {t("pages.adminpannel.categories.dialogCreateCategory.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 3,
            }}
          >
            {t("pages.adminpannel.categories.dialogCreateCategory.content")}
          </DialogContentText>

          <Box
            maxWidth
            sx={{
              pr: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              marginBottom: 4,
            }}
          >
            <TextField
              id="label"
              label={t(
                "pages.adminpannel.categories.dialogCreateCategory.textfield.label.label"
              )}
              type="text"
              variant="standard"
              placeholder={t(
                "pages.adminpannel.categories.dialogCreateCategory.textfield.label.placeholder"
              )}
              value={label}
              error={labelError}
              helperText={
                labelError
                  ? t(
                      "pages.adminpannel.categories.dialogCreateCategory.textfield.label.helpertext"
                    )
                  : null
              }
              onChange={handleChangeLabel}
              InputLabelProps={{ shrink: true }}
              sx={{
                width: "60%",
                margin: 0,
                padding: 0,
              }}
            />
            {label && <CustomChip colorchoice={color} label={label} />}
          </Box>
          <Box
            sx={{
              marginBottom: 4,
            }}
          >
            <SliderPicker color={color} onChangeComplete={handleChangeColor} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("buttons.cancel")}</Button>
          <Button onClick={handleSubmit}>{t("buttons.save")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogCreateCategory.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
