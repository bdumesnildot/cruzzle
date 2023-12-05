/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import apiAdminAgencies from "../../../services/api.admin.agencies";

export default function DialogUserSelectAgency({
  selectedAgency,
  setSelectedAgency,
  agencyError,
}) {
  const { t } = useTranslation();
  const [agencyList, setAgencyList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiAdminAgencies()
      .then((res) => {
        if (res.status === 200) {
          setAgencyList(res.data);
        } else {
          navigate("/error", {
            state: {
              error: {
                status: res.status,
              },
            },
          });
        }
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            error: {
              status: 500,
            },
          },
        });
        console.error("Error getting agencies", error);
      });
  }, []);

  return (
    <Autocomplete
      value={selectedAgency}
      onChange={(event, newValue) => {
        setSelectedAgency(newValue);
      }}
      options={agencyList}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(agency) =>
        `${agency.name} - ${agency.city} (${agency.country})`
      }
      renderInput={(params) => (
        <TextField
          {...params}
          error={agencyError}
          helperText={
            agencyError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.select.agency.helpertext"
                )
              : null
          }
          variant="standard"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.select.agency.label"
          )}
          fullWidth
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.select.agency.placeholder"
          )}
          InputLabelProps={{ shrink: true }}
        />
      )}
      sx={{
        marginBottom: 1,
      }}
    />
  );
}

DialogUserSelectAgency.propTypes = {
  selectedAgency: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }),
  setSelectedAgency: PropTypes.func.isRequired,
  agencyError: PropTypes.bool.isRequired,
};

DialogUserSelectAgency.defaultProps = {
  selectedAgency: PropTypes.shape({
    id: 0,
    name: "",
    city: "",
    country: "",
  }),
};
