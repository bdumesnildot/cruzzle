/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { TextField, Button, Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/24/outline";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

import formatBytes from "../../utils/formatBytes";

import CustomChip from "../styledComponents/CustomChip";
import UploadButton from "../styledComponents/UploadButton";

import addPicture from "../../assets/idea/addpicture.svg";
import { apiCategories } from "../../services/api.categories";

function IdeaHeader() {
  const { t } = useTranslation();
  const [categoriesApi, setCategoriesApi] = useState([]);

  const {
    control,
    primaryImg,
    setPrimaryImg,
    setErrorFiles,
    valueCategories,
    setValueCategories,
  } = useContext(IdeaFormContext);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchCategories = await apiCategories();
        if (fetchCategories) {
          const mappedCategories = fetchCategories.map((category) => ({
            id: category.id,
            label: category.label,
            color: category.color,
          }));
          setCategoriesApi(mappedCategories);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  const handleChangePrimaryPicture = (event) => {
    const { files } = event.target;
    const file = files[0];

    const maxSizeInKB = 4096; // Maximum size file in Kb
    const fileSizeInKB = file.size / 1024; // Convert to Kb

    const newErrorFiles = [];

    if (fileSizeInKB > maxSizeInKB) {
      const maxSize = formatBytes(maxSizeInKB * 1024);
      const fileName = file.name;
      newErrorFiles.push({
        id: 1,
        message: (
          <Trans
            i18nKey="pages.ideas.ideanew.header.fileserror"
            values={{ fileName, maxSize }}
          >
            The file <strong>{{ fileName }}</strong> exceeds the maximum allowed
            size of {{ maxSize }}!
          </Trans>
        ),
      });
    }

    if (newErrorFiles.length > 0) {
      setErrorFiles(newErrorFiles);
    } else {
      setPrimaryImg([file]);
    }
  };

  function getImageSource(img) {
    if (typeof img === "string") {
      return img;
    }
    return URL.createObjectURL(img[0]);
  }

  const handleCategoryChange = (event, selectedOptions) => {
    setValueCategories(selectedOptions);
  };

  return (
    <div className="sm:my-8" aria-label="Header">
      <h2 className="text-xl sm:text-2xl font-bold my-4">
        {t("pages.ideas.ideanew.header.title")}
      </h2>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            required
            id="title"
            label={t("pages.ideas.ideanew.textfield.title.label")}
            placeholder={t("pages.ideas.ideanew.textfield.title.placeholder")}
            className="w-full lg:w-[720px] my-2"
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 255 }}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <div className="flex my-6">
        <img
          src={primaryImg ? getImageSource(primaryImg) : addPicture}
          alt="standard"
          className="w-[192px] h-[149px] lg:w-[212px] lg:h-[174px]"
        />
        <div className="w-1/2 lg:w-auto mx-2 flex flex-col justify-center items-center lg:mx-6">
          <Controller
            name="primaryImg"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <UploadButton
                id="uploadPrimaryImage"
                accept=".jpeg, .jpg, .png"
                onChange={(event) => {
                  const { files } = event.target;
                  const file = files[0];
                  onChange(file);
                  handleChangePrimaryPicture(event);
                }}
                value={value}
              >
                {t("buttons.add")}
              </UploadButton>
            )}
          />

          <Button
            variant="outlined"
            color="error"
            startIcon={<TrashIcon className="h-6 w-6" />}
            className="w-[130px] rounded-full mx-2 my-2 sm:w-[174px]"
            onClick={() => {
              setPrimaryImg(null);
            }}
          >
            {t("buttons.delete")}
          </Button>
        </div>
      </div>
      <Controller
        name="context"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            id="context"
            label={t("pages.ideas.ideanew.textfield.context.label")}
            required
            multiline
            rows={4}
            defaultValue={value}
            onChange={onChange}
            inputProps={{ maxLength: 255 }}
            placeholder={t("pages.ideas.ideanew.textfield.context.placeholder")}
            className="w-full lg:w-[720px] my-4"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      {categoriesApi && (
        <Autocomplete
          multiple
          id="categories"
          value={valueCategories}
          options={categoriesApi}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          className="w-full lg:w-[720px] my-4"
          disablePortal
          onChange={(event, selectedOptions) => {
            handleCategoryChange(event, selectedOptions);
          }}
          filterOptions={(options) =>
            options.filter(
              (option) =>
                valueCategories.length < 3 ||
                valueCategories.some((category) => category.id === option.id)
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              id="titleIdea"
              required={valueCategories.length === 0}
              label={t("pages.ideas.ideanew.textfield.categories.label")}
              placeholder={t(
                "pages.ideas.ideanew.textfield.categories.placeholder"
              )}
              InputLabelProps={{ shrink: true }}
            />
          )}
          renderTags={(tag, getTagProps) =>
            tag.map((option, index) => (
              <CustomChip
                label={option.label}
                colorchoice={option.color}
                {...getTagProps({ index })}
              />
            ))
          }
        />
      )}
    </div>
  );
}
export default IdeaHeader;
