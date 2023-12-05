/* eslint-disable radix */
import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import AvatarEditor from "react-avatar-editor";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { Button, Slider, Skeleton, useMediaQuery } from "@mui/material";
import UploadButton from "../styledComponents/UploadButton";

import getNameFileToFirebaseLink from "../../utils/getNameFileToFirebaseLink";
import { UserProfileContext } from "../../contexts/UserProfile";
import { UserContext } from "../../contexts/UserContext";

import { sm } from "../../utils/mediaQueries";

import {
  apiUserImageByQuery,
  apiUserPostImage,
} from "../../services/api.users";

import Modal from "../modal/Modal";

function ModalEditImage({
  isOpen,
  setIsOpen,
  src,
  radius,
  onClose,
  height,
  width,
  fieldName,
  blobImg,
  setBlobImg,
  setAlertMessage,
  setAlertSeverity,
  handleAlert,
}) {
  const { t } = useTranslation();
  const [slideScaleValue, setSlideScaleValue] = useState(10);
  const [slideRotateValue, setSlideRotateValue] = useState(0);

  const { id } = useParams();
  const { setUser: setCurrentUser } = useContext(UserContext);
  const { user, setUser } = useContext(UserProfileContext);

  const [inputAvatarEditor, setInputAvatarEditor] = useState();
  const [image, setImage] = useState();

  const cropRef = useRef(null);

  const smallQuery = useMediaQuery(sm.query);
  const heightRes = () => {
    let heightCalc = null;
    if (fieldName === "avatar") {
      heightCalc = parseInt(height);
    } else if (fieldName === "banner" && !smallQuery) {
      heightCalc = parseInt(height - 200);
    } else if (fieldName === "banner" && smallQuery) {
      heightCalc = parseInt(height);
    }
    return heightCalc;
  };

  const fetchImage = async () => {
    try {
      const filename = fieldName;
      const property = src;
      const getExtensionNameHR = await getNameFileToFirebaseLink(
        property
      ).split(".")[1];
      if (getExtensionNameHR) {
        const url = `/users/${id}/${filename}_img.${getExtensionNameHR}`;
        const response = await apiUserImageByQuery(`url=${url}`, "image");
        if (response.data) {
          const blob = new Blob([response.data], {
            type: `image/${getExtensionNameHR}`,
          });
          const createdImg = URL.createObjectURL(blob);
          setBlobImg(createdImg);
          setInputAvatarEditor(createdImg);
          setImage(createdImg);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onClose();
    setBlobImg(null);
  };

  useEffect(() => {
    if (isOpen && !blobImg) {
      fetchImage();
    } else {
      setInputAvatarEditor(blobImg);
    }
  }, [isOpen]);

  const { handleSubmit, control } = useForm();

  const handleImgChange = (e) => {
    e.preventDefault();
    setInputAvatarEditor(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const onSubmit = async () => {
    const dataUrl = cropRef.current
      .getImageScaledToCanvas()
      .toDataURL(image.type);
    const result = await fetch(dataUrl);
    const blob = await result.blob();

    const formData = new FormData();
    formData.append(fieldName, blob);
    formData.append(`${fieldName}_img`, image);

    setSlideScaleValue(10);
    setSlideRotateValue(0);

    try {
      const postImage = await apiUserPostImage(formData, `image/${id}`);
      if (postImage) {
        setBlobImg(null);
        if (fieldName === "avatar") {
          setAlertMessage(t("pages.users.profile.edit.picture.alert.avatar"));
        } else {
          setAlertMessage(t("pages.users.profile.edit.picture.alert.banner"));
        }
        setAlertSeverity("success");
        handleAlert(true);
        const updatedUser = {
          ...user,
          [`${fieldName}_url`]: postImage.data[`${fieldName}_url`],
        };
        setUser(updatedUser);
        setCurrentUser(updatedUser);
        setIsOpen(false);
      } else {
        handleAlert(true);
        setAlertMessage(t("pages.users.profile.edit.picture.alert.error"));
        setAlertSeverity("warning");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal saveButton={false} isOpen={isOpen} onClose={() => handleClose()}>
      <div className="flex flex-col items-center justify-center w-full">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!inputAvatarEditor && (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={fieldName === "avatar" ? 160 : "100%"}
              height={fieldName === "avatar" ? 160 : 200}
              style={{
                marginRight: 16,
                marginLeft: 16,
              }}
            />
          )}
          {inputAvatarEditor && (
            <AvatarEditor
              className="object-contain"
              ref={cropRef}
              image={inputAvatarEditor}
              width={parseInt(width)}
              height={parseInt(height)}
              border={50}
              borderRadius={parseInt(radius)}
              color={[0o0, 0o0, 0o0, 0.3]}
              backgroundColor="#ffffff"
              scale={slideScaleValue / 10}
              rotate={slideRotateValue}
              style={{
                width: "100%",
                height: heightRes(),
              }}
              crossOrigin="anonymous"
            />
          )}
          <div className="flex justify-center items-center gap-6 w-full px-2  pt-8 sm:w-[70%]">
            <AspectRatioIcon fontSize="medium" color="grey" />
            <Slider
              min={10}
              max={50}
              sx={{
                margin: "0 auto",
                width: "100%",
                color: "primary",
              }}
              size="medium"
              defaultValue={slideScaleValue}
              value={slideScaleValue}
              onChange={(e) => setSlideScaleValue(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center gap-6 w-full px-2 pb-4 sm:w-[70%]">
            <RotateRightIcon fontSize="medium" color="grey" />
            <Slider
              className="pt-6"
              min={0}
              max={360}
              sx={{
                margin: "0 auto",
                width: "100%",
                color: "primary",
              }}
              size="medium"
              defaultValue={slideRotateValue}
              value={slideRotateValue}
              onChange={(e) => setSlideRotateValue(e.target.value)}
            />
          </div>

          <div className="flex w-full justify-center">
            <Controller
              name="image"
              control={control}
              defaultValue={inputAvatarEditor}
              render={({ field: { value } }) => (
                <UploadButton
                  id="image"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleImgChange}
                  value={value}
                >
                  {t("buttons.upload")}
                </UploadButton>
              )}
            />
            {inputAvatarEditor && (
              <Button
                disabled={!inputAvatarEditor}
                type="submit"
                className="w-[110px] rounded-full mx-2 my-2 sm:w-[174px]"
                variant="contained"
                color="primary"
              >
                {t("buttons.save")}
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}

ModalEditImage.propTypes = {
  setAlertMessage: PropTypes.func.isRequired,
  setAlertSeverity: PropTypes.func.isRequired,
  handleAlert: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  blobImg: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  setBlobImg: PropTypes.func.isRequired,
  src: PropTypes.string,
  radius: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};

ModalEditImage.defaultProps = {
  blobImg: null,
  src: null,
};

export default ModalEditImage;
