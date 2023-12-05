import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { TextField, IconButton } from "@mui/material";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FilterCommunityContext } from "../../../contexts/FilterCommunityContext";

function FieldSearchLastname() {
  const { t } = useTranslation();
  const {
    setLastnameContains,
    setLastnameContainsValue,
    lastnameContainsValue,
  } = useContext(FilterCommunityContext);

  const handleChange = (event) => {
    setLastnameContainsValue(event.target.value);
  };

  const handleSubmit = () => {
    setLastnameContains(lastnameContainsValue);
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClear = () => {
    setLastnameContainsValue("");
    setLastnameContains(null);
  };

  return (
    <TextField
      id="filter-text-search"
      placeholder={t(
        "pages.users.community.pannel.fieldsearch.lastname.placeholder"
      )}
      className="mb-4"
      value={lastnameContainsValue}
      onChange={handleChange}
      onBlur={handleSubmit}
      onKeyDown={handleKeydown}
      InputProps={{
        sx: { height: 40, width: 270 },
        endAdornment: (
          <>
            <IconButton
              onClick={handleSubmit}
              sx={{ visibility: lastnameContainsValue ? "visible" : "hidden" }}
            >
              <CheckIcon className="w-4" />
            </IconButton>
            {lastnameContainsValue && <span className="text-gray-400">|</span>}
            <IconButton
              onClick={handleClear}
              sx={{ visibility: lastnameContainsValue ? "visible" : "hidden" }}
            >
              <XMarkIcon className="w-4" />
            </IconButton>
          </>
        ),
      }}
    />
  );
}

export default FieldSearchLastname;
