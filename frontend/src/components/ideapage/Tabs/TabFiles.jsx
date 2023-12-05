import PropTypes from "prop-types";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "../../tabs/TabPanel";
import FilesDownload from "../FilesDownload";
import { IdeaPageContext } from "../../../contexts/IdeaPageContext";
import nodata from "../../../assets/idea/nodata.svg";

function TabFiles({ tabValue, index }) {
  const { t } = useTranslation();
  const { idea } = useContext(IdeaPageContext);

  return (
    <div>
      <TabPanel value={tabValue} index={index} className="w-full">
        {idea.attachment.length === 0 && (
          <div className="flex flex-col">
            <h3 className="text-xl mb-2">
              {t("pages.ideas.idea.tabsIdea.tabfiles.nofiles")}
            </h3>
            <img src={nodata} alt="no data" className="w-40 h-40" />
          </div>
        )}
        {idea.attachment && idea.attachment.length > 0 && <FilesDownload />}
      </TabPanel>
    </div>
  );
}

TabFiles.propTypes = {
  tabValue: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default TabFiles;
