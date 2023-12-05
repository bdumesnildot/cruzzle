import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterBtnPanelanceSearch() {
  const { t } = useTranslation();
  const { filterPanelIsOpen, setFilterPanelIsOpen } = useContext(FilterContext);

  const handleClick = () => {
    setFilterPanelIsOpen(!filterPanelIsOpen);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      className="h-10 font-normal text-base normal-case rounded-full min-w-[160px]"
      onClick={handleClick}
    >
      <FunnelIcon className="w-4 mr-2" />
      {t("pages.ideas.ideaspage.morefilters")}
    </Button>
  );
}
