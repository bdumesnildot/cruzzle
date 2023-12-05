import { useTranslation } from "react-i18next";
import { Alert, AlertTitle, Tab, Tabs, Box, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Controller } from "react-hook-form";

import TabPanel from "../tabs/TabPanel";
import AllyProps from "../tabs/AllyProps";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaTabs() {
  const { t } = useTranslation();
  const { control } = useContext(IdeaFormContext);
  const [tabValue, setTabValue] = useState(0);

  const tabsContent = [
    {
      title: t("pages.ideas.ideanew.tabs.goal.info"),
      label: t("pages.ideas.ideanew.tabs.goal.label"),
      name: "goal",
      content: (
        <ul>
          <li>{t("pages.ideas.ideanew.tabs.goal.content1")}</li>
          <li>{t("pages.ideas.ideanew.tabs.goal.content2")}</li>
        </ul>
      ),
    },
    {
      title: t("pages.ideas.ideanew.tabs.profits.info"),
      label: t("pages.ideas.ideanew.tabs.profits.label"),
      name: "profits",
      content: (
        <ul>
          <li>{t("pages.ideas.ideanew.tabs.profits.content1")}</li>
          <li>{t("pages.ideas.ideanew.tabs.profits.content2")}</li>
        </ul>
      ),
    },
    {
      title: t("pages.ideas.ideanew.tabs.risks.info"),
      label: t("pages.ideas.ideanew.tabs.risks.label"),
      name: "risks",
      content: (
        <ul>
          <li>{t("pages.ideas.ideanew.tabs.risks.content1")}</li>
          <li>{t("pages.ideas.ideanew.tabs.risks.content2")}</li>
        </ul>
      ),
    },
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="my-8" aria-label="Context">
      <h2 className="text-xl sm:text-2xl font-bold my-4">Content</h2>
      <Box className="my-4 w-full">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabsContent.map((tab, index) => (
              <Tab
                label={tab.label}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...AllyProps(index)}
                key={`${tab.label}Tab`}
              />
            ))}
          </Tabs>
        </Box>
        {tabsContent.map((tab, index) => (
          <TabPanel
            value={tabValue}
            index={index}
            className="w-full"
            key={tab.label}
          >
            <Alert severity="info" className="my-4">
              <AlertTitle>{tab.title}</AlertTitle>
              {tab.content}
            </Alert>
            <Controller
              name={tab.name.toLowerCase()}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  id={`${tab.label.toLowerCase()}Field`}
                  label={tab.label}
                  defaultValue={value}
                  onChange={onChange}
                  multiline
                  rows={6}
                  placeholder={t(
                    "pages.ideas.ideanew.tabs.textfield.placeholder"
                  )}
                  className="w-full my-4"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
export default IdeaTabs;
