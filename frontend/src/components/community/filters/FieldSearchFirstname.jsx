import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { TextField, IconButton } from "@mui/material";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FilterCommunityContext } from "../../../contexts/FilterCommunityContext";

function FieldSearchFirstname() {
  const { t } = useTranslation();
  const {
    setFirstnameContains,
    setFirstnameContainsValue,
    firstnameeContainsValue,
  } = useContext(FilterCommunityContext);

  const handleChange = (event) => {
    setFirstnameContainsValue(event.target.value);
  };

  const handleSubmit = () => {
    setFirstnameContains(firstnameeContainsValue);
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClear = () => {
    setFirstnameContainsValue("");
    setFirstnameContains(null);
  };

  return (
    <TextField
      id="filter-text-search"
      className="mb-4"
      placeholder={t(
        "pages.users.community.pannel.fieldsearch.firstname.placeholder"
      )}
      value={firstnameeContainsValue}
      onChange={handleChange}
      onBlur={handleSubmit}
      onKeyDown={handleKeydown}
      InputProps={{
        sx: { height: 40, width: 270 },
        endAdornment: (
          <>
            <IconButton
              onClick={handleSubmit}
              sx={{
                visibility: firstnameeContainsValue ? "visible" : "hidden",
              }}
            >
              <CheckIcon className="w-4" />
            </IconButton>
            {firstnameeContainsValue && (
              <span className="text-gray-400">|</span>
            )}
            <IconButton
              onClick={handleClear}
              sx={{
                visibility: firstnameeContainsValue ? "visible" : "hidden",
              }}
            >
              <XMarkIcon className="w-4" />
            </IconButton>
          </>
        ),
      }}
    />
  );
}

export default FieldSearchFirstname;
