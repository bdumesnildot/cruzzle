import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
import {
  MapPinIcon,
  LinkIcon,
  PencilSquareIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { Button, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

import { sm } from "../../utils/mediaQueries";

import ModalEditImage from "./ModalEditImage";
import ModifierButton from "./ModifierButton";
import AvatarUserProfile from "../avatar/AvatarUserProfile";
import ModalEditProfil from "./ModalEditProfil";
import { UserProfileContext } from "../../contexts/UserProfile";
import { UserContext } from "../../contexts/UserContext";
import { noPictureBanner } from "../../utils/nopicture";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function TopSectionProfil() {
  const { t } = useTranslation();
  const { user } = useContext(UserProfileContext);
  const { user: currentUser } = useContext(UserContext);
  const { id } = useParams();
  const smallQuery = useMediaQuery(sm.query);

  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBanner, setIsOpenBanner] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [blobAvatar, setBloblobAvatar] = useState(null);
  const [blobBanner, setBloblobBanner] = useState(null);

  const { setMessage, setOpen, setSeverity, open } =
    useContext(AlertToastContext);

  const isCurrentUserProfile =
    parseInt(id, 10) === parseInt(currentUser.id, 10);

  const handleAlert = () => {
    setOpen(!open);
  };

  const {
    firstname,
    lastname,
    avatar_url: avatarUrl,
    banner_url: bannerUrl,
    agency: { name: agencyName },
    position: { name: positionName },
    link,
  } = user;

  const toggleModal = (state, setter) => {
    setter(!state);
  };

  return (
    <div className="flex flex-col flex-start">
      <div className="relative mb-16">
        <div className="absolute ml-6 bottom-[-48px]">
          <div className="relative ">
            <AvatarUserProfile />
            {isCurrentUserProfile && (
              <div className="absolute z-[30] left-16 bottom-[-4px]">
                <ModifierButton
                  onClick={() => toggleModal(isOpenAvatar, setIsOpenAvatar)}
                />
              </div>
            )}
          </div>
        </div>
        {isCurrentUserProfile && (
          <div className="absolute z-[30] right-7 bottom-[+20px] md:bottom-[+20px] md:right-5">
            <ModifierButton
              onClick={() => toggleModal(isOpenBanner, setIsOpenBanner)}
            />
          </div>
        )}
        {isCurrentUserProfile && smallQuery && (
          <Button
            variant="outlined"
            className="absolute rounded-3xl w-32 h-11 right-5 bottom-[-50px]"
            onClick={() => toggleModal(openEdit, setOpenEdit)}
          >
            <span className="flex gap-2 text-primary-900">
              <PencilSquareIcon className="h-6 w-6" />
              <span className="font-bold">{t("buttons.modify")}</span>
            </span>
          </Button>
        )}
        <div
          className="w-full h-56 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${bannerUrl ?? noPictureBanner})`,
          }}
        />
      </div>
      <div className="flex w-full justify-between items-center mb-4 md:mb-1">
        <h2 className="ml-5 font-regular text-2xl text-black">
          {firstname} {lastname}
        </h2>
        {isCurrentUserProfile && !smallQuery && (
          <Button
            variant="outlined"
            className="rounded-3xl w-32 h-11 mr-7"
            onClick={() => toggleModal(openEdit, setOpenEdit)}
          >
            <span className="flex gap-2 text-primary-900">
              <PencilSquareIcon className="h-6 w-6" />
              <span className="font-bold">{t("buttons.modify")}</span>
            </span>
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 ml-5 lg:flex-row lg:gap-12">
        <div className="flex gap-1 justify-start items-center">
          <BriefcaseIcon className="h-6 w-6 text-secondary-600" />
          <p className="font-medium text-secondary-600">{positionName}</p>
        </div>
        <div className="flex justify-start items-center">
          <MapPinIcon className="h-6 w-6 text-secondary-600" />
          <p className="ml-1 font-medium text-secondary-600">{agencyName}</p>
        </div>
        {link && (
          <div className="flex justify-start items-center">
            <LinkIcon className="h-6 w-6 text-secondary-600" />
            <p className="ml-1 font-medium">
              <a
                href={link}
                className="text-bg-primary-900"
                target="_blank"
                rel="noreferrer"
              >
                {link}
              </a>
            </p>
          </div>
        )}
      </div>
      {isOpenAvatar && (
        <ModalEditImage
          handleAlert={handleAlert}
          setAlertSeverity={setSeverity}
          setAlertMessage={setMessage}
          isOpen={isOpenAvatar}
          setIsOpen={setIsOpenAvatar}
          src={avatarUrl}
          onClose={() => toggleModal(isOpenAvatar, setIsOpenAvatar)}
          blobImg={blobAvatar}
          setBlobImg={setBloblobAvatar}
          fieldName="avatar"
          width="160"
          height="160"
          radius="150"
        />
      )}
      {isOpenBanner && (
        <ModalEditImage
          handleAlert={handleAlert}
          setAlertSeverity={setSeverity}
          setAlertMessage={setMessage}
          isOpen={isOpenBanner}
          setIsOpen={setIsOpenBanner}
          src={bannerUrl}
          onClose={() => toggleModal(isOpenBanner, setIsOpenBanner)}
          blobImg={blobBanner}
          setBlobImg={setBloblobBanner}
          fieldName="banner"
          width="1136"
          height="356"
          radius="0"
        />
      )}
      {openEdit && (
        <ModalEditProfil
          open={openEdit}
          close={() => toggleModal(openEdit, setOpenEdit)}
        />
      )}
    </div>
  );
}

export default TopSectionProfil;
