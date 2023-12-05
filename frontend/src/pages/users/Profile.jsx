import ProfileUser from "../../components/profil/ProfileUser";
import UserProfileProvider from "../../contexts/UserProfile";

function Profile() {
  return (
    <div className="w-full">
      <UserProfileProvider>
        <ProfileUser />
      </UserProfileProvider>
    </div>
  );
}
export default Profile;
