import { useTranslation } from "react-i18next";
import {
  Button,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import EditProfil1 from "../../assets/EditProfil1.svg";
import EditProfil2 from "../../assets/EditProfil2.svg";
import { apiUpdateUser, apiUserById } from "../../services/api.users";
import { UserProfileContext } from "../../contexts/UserProfile";

export default function ModalEditProfil({ open, close }) {
  const { t, i18n } = useTranslation();
  const { handleSubmit, control } = useForm();
  const { user, setUser } = useContext(UserProfileContext);
  const {
    firstname,
    lastname,
    biography,
    birthdate,
    mail,
    phone,
    agency: { city, country },
    link,
  } = user;
  const [sharePhone, setSharePhone] = useState(user.share_phone);
  const [displayBirthday, setDisplayBirthday] = useState(user.share_birthdate);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (birthdate) {
      setSelectedDate(birthdate);
    }
  }, []);

  const onSubmit = async (data) => {
    const {
      link: linkUpdate,
      phone: phoneUpdate,

      biography: biographyUpdate,
    } = data;

    const updatedData = {
      biography: biographyUpdate || null,
      link: linkUpdate || null,
      birthdate: dayjs(selectedDate) || null,
      phone: phoneUpdate || null,
      share_phone: sharePhone,
      share_birthdate: displayBirthday,
    };

    const response = await apiUpdateUser(user.id, updatedData);
    if (response) {
      try {
        const result = await apiUserById(user.id);
        if (result) {
          setUser(result.data);
        } else {
          console.error("Failed to fetch user data");
        }
        close();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <Modal isOpen={open} onClose={close} onSave={handleSubmit(onSubmit)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-black font-medium">
          {t("pages.users.profile.edit.title")}
        </h4>
        <Divider orientation="horizontal" />
        <div className="flex flex-col items-start justify-between border-none rounded-t">
          <div className="flex flex-col sm:gap-8 w-full sm:flex-row ">
            <div className="flex flex-col mb-5 sm:w-96 ">
              <h2 className="text-secondary-600 mb-8 ">
                {t("pages.users.profile.edit.section.information.title")}
              </h2>
              <div className="pl-4 flex flex-col gap-3">
                <TextField
                  disabled
                  defaultValue={firstname}
                  label={t(
                    "pages.users.profile.edit.section.information.textfield.firstname.label"
                  )}
                  variant="outlined"
                  className="mb-4 bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue={lastname}
                  label={t(
                    "pages.users.profile.edit.section.information.textfield.lastname.label"
                  )}
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue={mail}
                  label={t(
                    "pages.users.profile.edit.section.information.textfield.email.label"
                  )}
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={phone || ""}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      placeholder={t(
                        "pages.users.profile.edit.section.information.textfield.phone.placeholder"
                      )}
                      InputLabelProps={{ shrink: true }}
                      label={t(
                        "pages.users.profile.edit.section.information.textfield.phone.label"
                      )}
                      variant="outlined"
                      onChange={onChange}
                      inputProps={{ maxLength: 15 }}
                    />
                  )}
                />
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={sharePhone}
                      onChange={(e) => setSharePhone(e.target.checked)}
                    />
                  }
                  label={t(
                    "pages.users.profile.edit.section.information.textfield.phone.switch"
                  )}
                  className="mb-4 ml-2"
                />
                <h4 className="text-secondary-600">
                  {t(
                    "pages.users.profile.edit.section.information.textfield.birthday.title"
                  )}
                </h4>
                <Controller
                  name="birthdate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={dayjs(selectedDate)}
                      defaultValue={dayjs(selectedDate)}
                      label={t(
                        "pages.users.profile.edit.section.information.textfield.birthday.label"
                      )}
                      format={t("pages.users.profile.dateFormats.short")}
                      clearable
                      disableFuture
                      InputLabelProps={{ shrink: true }}
                      onChange={(date) => {
                        setSelectedDate(
                          dayjs(date)
                            .locale(i18n.language)
                            .format(t("pages.users.profile.dateFormats.short"))
                        );
                        field.onChange(date);
                      }}
                    />
                  )}
                />
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={displayBirthday}
                      onChange={(e) => setDisplayBirthday(e.target.checked)}
                    />
                  }
                  label={t(
                    "pages.users.profile.edit.section.information.textfield.birthday.switch"
                  )}
                  className="mb-4 ml-2"
                />
              </div>
            </div>
            <div className=" bg-black bg-opacity-5 sm:w-2/4 sm:h-1/5 w-64 rounded-3xl sm:mt-28 relative">
              <img
                className="absolute top-[-18px] sm:right-[-50px] w-52 right-[-60px]"
                alt={t("alts.contactAdmin")}
                src={EditProfil1}
              />
              <div className="flex flex-col w-72 gap-8 p-4">
                <p className="text-secondary-600 font-bold w-9/12 text-base">
                  {t(
                    "pages.users.profile.edit.section.information.contactadmin"
                  )}
                </p>
                <Button variant="outlined" className="rounded-3xl w-32 h-auto">
                  <span className="font-bold items-center justify-center">
                    {t("buttons.contact")}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:gap-8 w-full sm:flex-row ">
            <div className="flex flex-col mb-5 sm:w-96">
              <h2 className="text-secondary-600 mb-4 ">
                {t("pages.users.profile.edit.section.general.title")}
              </h2>
              <div className="pl-4 flex flex-col gap-3">
                <Controller
                  name="biography"
                  control={control}
                  defaultValue={biography || ""}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      placeholder={t(
                        "pages.users.profile.edit.section.general.textfield.biography.placeholder"
                      )}
                      label={t(
                        "pages.users.profile.edit.section.general.textfield.biography.label"
                      )}
                      variant="outlined"
                      className="mb-4"
                      multiline
                      InputLabelProps={{ shrink: true }}
                      rows={8}
                      inputProps={{ maxLength: 255 }}
                    />
                  )}
                />
                <TextField
                  disabled
                  defaultValue={city}
                  label={t(
                    "pages.users.profile.edit.section.general.textfield.city.label"
                  )}
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <TextField
                  disabled
                  defaultValue={country}
                  label={t(
                    "pages.users.profile.edit.section.general.textfield.country.label"
                  )}
                  variant="outlined"
                  className="mb-4  bg-black bg-opacity-5"
                />
                <Controller
                  name="link"
                  control={control}
                  defaultValue={link || ""}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      placeholder={t(
                        "pages.users.profile.edit.section.general.textfield.link.placeholder"
                      )}
                      InputLabelProps={{ shrink: true }}
                      label={t(
                        "pages.users.profile.edit.section.general.textfield.link.label"
                      )}
                      variant="outlined"
                      className="mb-4"
                    />
                  )}
                />
              </div>
            </div>
            <div className="bg-black bg-opacity-5 sm:w-2/4 sm:h-1/5 w-64 rounded-3xl sm:mt-28 relative">
              <img
                className="absolute top-[-33px] sm:right-[-30px] w-48 right-[-70px]"
                alt={t("alts.contactAdmin")}
                src={EditProfil2}
              />
              <div className="flex flex-col w-72 gap-10 p-4 justify-center">
                <p className="text-secondary-600 font-bold w-8/12 text-base">
                  {t("pages.users.profile.edit.section.general.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
ModalEditProfil.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
