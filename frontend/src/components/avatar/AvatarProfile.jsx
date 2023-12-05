import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Paper } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import AvatarDoghnut from "./AvatarDoghnut";
import { getUserLevelObject } from "../../utils/gamification";
import { noPictureAvatar } from "../../utils/nopicture";

function AvatarProfile() {
  const navigate = useNavigate();
  const { user, userGamification, setUserGamification } =
    useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserGamification(getUserLevelObject(user));
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center mt-6 -mx-2">
      <Paper
        elevation={4}
        className="rounded-full w-36 h-36 flex items-center justify-center relative sm:h-44 sm:w-44 lg:h-48 lg:w-48"
      >
        <Avatar
          alt="profil-picture"
          src={user.avatar_url ?? noPictureAvatar}
          className="w-28 h-28 z-10 shadow shadow-black border-solid border-black border sm:w-36 sm:h-36 lg:w-40 lg:h-40 cursor-pointer"
          onClick={() => navigate(`/users/${user.id}`)}
        />
        <AvatarDoghnut />
        <Paper
          elevation={4}
          className="rounded-full absolute bottom-[-16px] w-14 h-14 bg-primary-900 z-20"
        >
          <Avatar alt="score" className="bg-transparent h-full w-full">
            {userGamification.currentLevel}
          </Avatar>
        </Paper>
      </Paper>

      <h4 className="mx-2 mt-8 font-medium text-xl">
        {`${user.firstname} ${user.lastname}`}
      </h4>
    </div>
  );
}
export default AvatarProfile;
