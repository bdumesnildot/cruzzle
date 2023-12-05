import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export default function Modal({
  saveButton,
  isOpen,
  onClose,
  onSave,
  children,
}) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const globalOverlay = useRef();
  const closeButton = useRef();

  const handleClose = (event) => {
    if (
      event.target === globalOverlay.current ||
      event.target === closeButton.current
    ) {
      onClose();
    }
  };

  return (
    <div
      role="presentation"
      ref={globalOverlay}
      onClick={handleClose}
      className="black-overlay flex items-center justify-center w-full fixed inset-0 z-[1000] bg-black bg-opacity-50"
    >
      <div className="rounded-lg shadow-lg flex flex-col w-full m-2 max-h-[97%] overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar sm:mx-16 lg:w-fit lg:min-w-[450px] bg-white">
        <div className="flex flex-col gap-4 px-2 pt-8 pb-8 sm:px-8 sm:pt-8 sm:pb-10">
          {children}
        </div>
        <div className="flex gap-6 justify-center py-4 bg-white border-1 border-solid border-gray-100 drop-shadow-top sticky bottom-0 z-[100] sm:py-6">
          {saveButton && (
            <Button
              className="rounded-3xl"
              disableElevation
              variant="contained"
              sx={{ width: "125px" }}
              onClick={onSave}
            >
              {t("buttons.save")}
            </Button>
          )}
          <Button
            className="rounded-3xl"
            ref={closeButton}
            disableElevation
            color="primary"
            variant="outlined"
            sx={{ width: "125px" }}
            onClick={handleClose}
          >
            {t("buttons.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  saveButton: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  saveButton: true,
  onSave: () => {
    console.info("Save button clicked");
  },
};
