import { useContext } from "react";
import { Avatar, Paper } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { noPictureAvatar } from "../../utils/nopicture";

function AvatarNavbar() {
  const { user } = useContext(UserContext);
  const { avatar_url: imgUrl } = user;

  return (
    <Paper
      elevation={4}
      className="rounded-full w-8 h-8 flex items-center justify-center relative"
    >
      <Avatar
        alt="profil-picture"
        src={imgUrl ?? noPictureAvatar}
        className="w-7 h-7 z-10"
      />
    </Paper>
  );
}
export default AvatarNavbar;
