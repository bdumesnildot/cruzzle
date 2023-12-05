import { useContext } from "react";
import { Avatar, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserProfileContext } from "../../contexts/UserProfile";
import { noPictureAvatar } from "../../utils/nopicture";

function AvatarUserProfile() {
  const { user } = useContext(UserProfileContext);
  const { t } = useTranslation();

  return (
    <div>
      <Paper
        elevation={4}
        className="rounded-full w-28 h-28 flex items-center justify-center relative sm:h-24 sm:w-24 lg:h-28 lg:w-28"
      >
        <Avatar
          alt={t("alts.avatar")}
          src={user.avatar_url ?? noPictureAvatar}
          className="w-24 h-24 z-10 shadow shadow-black border-solid border-black border sm:w-20 sm:h-20 lg:w-24 lg:h-24"
        />
      </Paper>
    </div>
  );
}

export default AvatarUserProfile;
