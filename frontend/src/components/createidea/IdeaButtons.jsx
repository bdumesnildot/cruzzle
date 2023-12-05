import {
  ArrowUturnLeftIcon,
  CloudArrowUpIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function IdeaButtons() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();
  const isNewIdea = location.pathname === "/ideas/new";

  return (
    <div className="flex justify-center my-8">
      <Button
        variant="outlined"
        color="error"
        startIcon={<ArrowUturnLeftIcon className="h-6 w-6" />}
        className="flex rounded-full mx-2 min-w-[122px]"
        onClick={() => navigate(-1)}
      >
        {t("buttons.cancel")}
      </Button>
      <Button
        variant="contained"
        color={isNewIdea ? "primary" : "warning"}
        startIcon={
          isNewIdea ? (
            <CloudArrowUpIcon className="h-6 w-6" />
          ) : (
            <ServerIcon className="h-6 w-6" />
          )
        }
        type="submit"
        className="flex rounded-full mx-2 min-w-[122px]"
        sx={{
          boxShadow: 1,
          "&:hover": { boxShadow: 2 },
          "&:active, &.Mui-focusVisible": { boxShadow: 4 },
        }}
      >
        {isNewIdea ? t("buttons.publish") : t("buttons.save")}
      </Button>
    </div>
  );
}

export default IdeaButtons;
