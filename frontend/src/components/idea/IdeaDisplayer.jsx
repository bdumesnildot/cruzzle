import React from "react";
import IdeaCard from "./IdeaCard";
import { IdeasPropTypes } from "../propTypes/ideaPropTypes";

function IdeaDisplayer({ ideas, isMini = true }) {
  return (
    <div className="flex flex-col gap-7 px-6 py-6 overflow-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
      {ideas !== undefined
        ? ideas.map((idea) => (
            <IdeaCard key={idea.id} isMini={isMini} idea={idea} />
          ))
        : ""}
    </div>
  );
}
export default IdeaDisplayer;

IdeaDisplayer.propTypes = IdeasPropTypes;

IdeaDisplayer.defaultProps = {
  isMini: true,
};
