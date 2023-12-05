import { TextField } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaCloud() {
  const { t } = useTranslation();
  const { control } = useContext(IdeaFormContext);

  return (
    <div className="my-8" aria-label="Cloud share">
      <h2 className="text-xl sm:text-2xl font-bold my-4">
        {t("pages.ideas.ideanew.cloud.title")}
      </h2>
      <Controller
        name="cloudshare"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            id="cloudshare"
            label={t("pages.ideas.ideanew.cloud.textfield.label")}
            placeholder="Dropbox, Google drive..."
            className="w-full lg:w-[720px] my-2"
            InputLabelProps={{ shrink: true }}
            defaultValue={value}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}
export default IdeaCloud;
