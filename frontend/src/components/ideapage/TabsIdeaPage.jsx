import { Tab, Tabs, Box } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import AllyProps from "../tabs/AllyProps";
import TabGeneral from "./Tabs/TabGeneral";
import TabFiles from "./Tabs/TabFiles";
import TabComments from "./Tabs/TabComments";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";

function TabsIdeaPage() {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const { idea } = useContext(IdeaPageContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.tabStateValue) {
      setTabValue(parseInt(location.state.tabStateValue, 10));
    }
  }, []);

  const tabsContent = [
    t("pages.ideas.idea.tabsIdea.content.general"),

    `${t("pages.ideas.idea.tabsIdea.content.files")} (${
      idea.attachment.length
    })`,
    `${t("pages.ideas.idea.tabsIdea.content.comments")} (${
      idea.comment.length
    })`,
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="w-full md:my-8 lg:mx-6" aria-label="Tabs">
      <Box className="my-4 lg:w-3/4">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabsContent &&
              tabsContent.map((tab, index) => (
                <Tab
                  label={tab}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...AllyProps(index)}
                  key={`${tab}`}
                />
              ))}
          </Tabs>
        </Box>
        {/* Insert CONTENT HERE */}
        <TabGeneral tabValue={tabValue} setTabValue={setTabValue} index={0} />
        <TabFiles tabValue={tabValue} index={1} />
        <TabComments tabValue={tabValue} index={2} />
      </Box>
    </div>
  );
}
export default TabsIdeaPage;
