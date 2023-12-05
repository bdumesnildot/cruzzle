/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TeamBuilderList from "./TeamBuilderList";

export default function TeamBuilder({ list, onChange, getOptions }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const optionsData = await getOptions(); // appel axios retournant un objet contenant id, firstname, lastname, imgUrl

      if (active) {
        setOptions([...optionsData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (event, value) => {
    onChange(value); // set la valeur de list
  };

  return (
    <div
      className="flex flex-col items-center w-full gap-4 lg:flex-row lg:justify-start lg:items-start lg:gap-8"
      aria-label="list-button"
    >
      <div className="w-full lg:w-1/2 lg:max-w-[400px]">
        <Autocomplete
          disableCloseOnSelect
          multiple
          sx={{ minWidth: 250 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) =>
            `${option.firstname} ${option.lastname}` ===
            `${value.firstname} ${value.lastname}`
          }
          getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
          options={options}
          value={list}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("pages.ideas.ideanew.team.label")}
              placeholder={t("pages.ideas.ideanew.team.placeholder")}
              value={list}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </div>
      <div className="w-full sm:w-1/2 lg:max-w-[400px]">
        <TeamBuilderList {...{ list, onChange }} />
      </div>
    </div>
  );
}

TeamBuilder.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  getOptions: PropTypes.func.isRequired,
};
