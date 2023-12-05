import { useContext } from "react";
import { useTranslation } from "react-i18next";
import TeamBuilder from "./TeamBuilder";
import { IdeaFormContext } from "../../contexts/IdeaFormContext";
import { apiUsers } from "../../services/api.users";
import { noPictureAvatar } from "../../utils/nopicture";

function IdeaTeam() {
  const { t } = useTranslation();
  const { teamSelect, setTeamSelect } = useContext(IdeaFormContext);

  const userList = () => {
    const response = apiUsers().then((res) => {
      return res.map((user) => ({
        id: user.id,
        avatar_url: user.avatar_url ?? noPictureAvatar,
        firstname: user.firstname,
        lastname: user.lastname,
      }));
    });
    return response;
  };

  return (
    <div className="my-8" aria-label="Team">
      <h2 className="text-xl sm:text-2xl font-bold my-4">
        {t("pages.ideas.ideanew.team.title")}
      </h2>
      <div className="lg:mx-6 my-6">
        <TeamBuilder
          list={teamSelect}
          onChange={setTeamSelect}
          getOptions={userList}
        />
      </div>
    </div>
  );
}

export default IdeaTeam;
