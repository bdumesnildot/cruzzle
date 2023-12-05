/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import apiAdminPositions from "../../../services/api.admin.positions";

export default function DialogUserSelectPosition({
  selectedPosition,
  setSelectedPosition,
  positionError,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [positionList, setPositionList] = useState([]);

  useEffect(() => {
    apiAdminPositions()
      .then((res) => {
        if (res.status === 200) {
          setPositionList(res.data);
        } else {
          navigate("/error", {
            state: {
              error: {
                status: res.status,
              },
            },
          });
          console.error("Cannot get positions");
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
        console.error("Error getting positions", error);
      });
  }, []);

  return (
    <Autocomplete
      value={selectedPosition}
      onChange={(event, newValue) => {
        setSelectedPosition(newValue);
      }}
      options={positionList}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(position) => position.name}
      renderInput={(params) => (
        <TextField
          {...params}
          error={positionError}
          helperText={
            positionError
              ? t(
                  "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.select.position.helpertext"
                )
              : null
          }
          variant="standard"
          label={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.select.position.label"
          )}
          fullWidth
          placeholder={t(
            "pages.adminpannel.users.tableOfUsers.dialogUpdateUser.select.position.placeholder"
          )}
          InputLabelProps={{ shrink: true }}
        />
      )}
      sx={{
        marginBottom: 8,
      }}
    />
  );
}

DialogUserSelectPosition.propTypes = {
  selectedPosition: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  setSelectedPosition: PropTypes.func.isRequired,
  positionError: PropTypes.bool.isRequired,
};

DialogUserSelectPosition.defaultProps = {
  selectedPosition: PropTypes.shape({
    id: 0,
    name: "",
  }),
};
