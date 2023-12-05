import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { SliderPicker } from "react-color";
import { Box } from "@mui/material";
import CustomChip from "../../styledComponents/CustomChip";
import { apiAdminUpdateCategoryById } from "../../../services/api.admin.categories";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function DialogUpdateColor({
  openDialog,
  setOpenDialog,
  category,
  setUpdateList,
}) {
  const { t } = useTranslation();
  const { setOpen, setMessage } = useContext(AlertToastContext);
  const [label, setLabel] = useState(category.label);
  const [labelError, setLabelError] = useState(false);
  const [color, setColor] = useState(category.color);

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
      apiAdminUpdateCategoryById(category.id, { label, color })
        .then((res) => {
          if (res.status === 200) {
            setUpdateList(true);
            setMessage(
              t("pages.adminpannel.categories.alert.success.updatecategory")
            );
            setOpen(true);
            handleClose();
          } else {
            console.error("Cannot update category");
          }
        })
        .catch((err) => {
          console.error("error updating category", err);
        });
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {t("pages.adminpannel.categories.dialogUpdateCategory.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 3,
            }}
          >
            {t("pages.adminpannel.categories.dialogUpdateCategory.content")}
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
                "pages.adminpannel.categories.dialogUpdateCategory.textfield.label.label"
              )}
              type="text"
              variant="standard"
              placeholder={t(
                "pages.adminpannel.categories.dialogUpdateCategory.textfield.label.placeholder"
              )}
              value={label}
              error={labelError}
              helperText={
                labelError
                  ? t(
                      "pages.adminpannel.categories.dialogUpdateCategory.textfield.label.helpertext"
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

DialogUpdateColor.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
