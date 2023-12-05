import { useContext } from "react";
import { Divider, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { ThumbUpRounded } from "@mui/icons-material";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";

function LikesView() {
  const { idea } = useContext(IdeaPageContext);

  return (
    <div className="flex my-2">
      <Paper elevation={1} className="py-2 px-2 rounded-xl flex items-center">
        <div className="min-w-[88px] flex items-center justify-center">
          <div className="mx-2 text-lg font-bold text-secondary-600">
            {idea.views}
          </div>
          <Visibility className="mx-1 text-secondary-600" />
        </div>
        <Divider orientation="vertical" />
        <div className="min-w-[88px] flex items-center justify-center">
          <div className="mx-2 text-lg font-bold text-secondary-600">
            {idea.idea_like.length}
          </div>
          <ThumbUpRounded className="mx-1 text-secondary-600" />
        </div>
      </Paper>
    </div>
  );
}
export default LikesView;
