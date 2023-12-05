import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, IconButton } from "@mui/material";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

function FilterbarTextSearch() {
  const { t } = useTranslation();
  const { setTitleContains } = useContext(FilterContext);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setTitleContains(value);
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClear = () => {
    setValue("");
    setTitleContains(null);
  };

  return (
    <TextField
      id="filter-text-search"
      placeholder={t(
        "pages.ideas.ideaspage.filterpannel.fieldtext.textsearch.placeholder"
      )}
      value={value}
      onChange={handleChange}
      onBlur={handleSubmit}
      onKeyDown={handleKeydown}
      InputProps={{
        sx: { height: 40, width: 270 },
        endAdornment: (
          <>
            <IconButton
              onClick={handleSubmit}
              sx={{ visibility: value ? "visible" : "hidden" }}
            >
              <CheckIcon className="w-4" />
            </IconButton>
            {value && <span className="text-gray-400">|</span>}
            <IconButton
              onClick={handleClear}
              sx={{ visibility: value ? "visible" : "hidden" }}
            >
              <XMarkIcon className="w-4" />
            </IconButton>
          </>
        ),
      }}
    />
  );
}

export default FilterbarTextSearch;
