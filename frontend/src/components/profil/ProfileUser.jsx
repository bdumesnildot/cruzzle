import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../contexts/UserProfile";
import TopSectionProfil from "./TopSectionProfil";
import ProfilesTabs from "./ProfilesTabs";
import { apiUserById } from "../../services/api.users";

function ProfileUser() {
  const { setUser, isLoading, setIsLoading } = useContext(UserProfileContext);
  const { id } = useParams();

  useEffect(() => {
    const userProfilLoad = async () => {
      try {
        setIsLoading(true);
        const update = await apiUserById(id);
        if (update) {
          setUser(update.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    userProfilLoad();
  }, [id]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <TopSectionProfil />
      <ProfilesTabs />
    </>
  );
}
export default ProfileUser;
