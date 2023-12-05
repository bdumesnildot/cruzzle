import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Select, FormControl, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import TabPanel from "../../tabs/TabPanel";
import CommentBox from "../CommentBox";
import FilterSvg from "../../../assets/Filter.svg";
import { IdeaPageContext } from "../../../contexts/IdeaPageContext";
import CreateComment from "../CreateComment";

function TabComments({ tabValue, index }) {
  const { t } = useTranslation();
  const { idea } = useContext(IdeaPageContext);
  const { comment } = idea;
  const [selectValue, setSelectValue] = useState(0);
  const [allComments, setAllComments] = useState([]);

  const tbLength = [...comment].length;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sortedComments = [...comment];

    if (selectValue === 0) {
      sortedComments.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else {
      sortedComments.sort(
        (a, b) => b.comment_like.length - a.comment_like.length
      );
    }

    setAllComments(open ? sortedComments : sortedComments.slice(0, 3));
  }, [selectValue, open, idea]);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <div>
      <TabPanel value={tabValue} index={index} className="w-full">
        {idea.archived_at === null && <CreateComment tabValue={tabValue} />}
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-xl mb-2">{`${t(
            "pages.ideas.idea.tabsIdea.tabcomments.title"
          )} (${tbLength})`}</h3>
          {allComments.length > 0 && (
            <FormControl>
              <Select
                className="w-44 sm:w-52 rounded-full"
                size="small"
                value={selectValue}
                onChange={handleChange}
                renderValue={(value) => {
                  return (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <img src={FilterSvg} alt="" className="w-4 h-4 mx-2" />
                      {value === 0 ? "Most recent" : "Most liked"}
                    </Box>
                  );
                }}
              >
                <MenuItem value={0}>
                  {t("pages.ideas.idea.tabsIdea.tabcomments.mostrecent")}
                </MenuItem>
                <MenuItem value={1}>
                  {t("pages.ideas.idea.tabsIdea.tabcomments.mostliked")}
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
        <div className="flex flex-col">
          {allComments.length === 0 && (
            <div className="text-md mb-2">
              {t("pages.ideas.idea.tabsIdea.tabcomments.nocomments")}
            </div>
          )}
          {allComments.map((item) => (
            <CommentBox comment={item} key={item.id} tabComment />
          ))}
          {allComments.length > 0 && (
            <div className="w-full flex justify-end">
              <Button
                variant="text"
                sx={{ textTransform: "capitalize ", margin: 1 }}
                className="flex  text-secondary-600"
                onClick={() => setOpen(!open)}
              >
                {open
                  ? t("pages.ideas.idea.tabsIdea.tabcomments.seeless")
                  : t("pages.ideas.idea.tabsIdea.tabcomments.seemore")}
              </Button>
            </div>
          )}
        </div>
      </TabPanel>
    </div>
  );
}

TabComments.propTypes = {
  tabValue: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default TabComments;
