import { useNavigate } from "react-router-dom";
import fullLogo from "../../assets/logo/fullLogo.svg";
import AvatarProfile from "../avatar/AvatarProfile";
import SideLinks from "./SideLinks";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="h-screen flex flex-col px-0 overflow-x-hidden overflow-y-auto bg-white z-50 sm:h-full sm:w-60 lg:w-64 sm:border-solid sm:border-t-[0px] sm:border-b-[0px] sm:border-l-[0px] sm:border-r-[1px] sm:border-gray-300">
      <div className="bg-primary-900 bg-opacity-5 h-full w-full flex flex-col sticky">
        <div className="flex-col items-center hidden sm:flex">
          <button
            className="border-none bg-transparent"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            <img
              className="mx-2 h-14 mt-2 cursor-pointer"
              src={fullLogo}
              alt="logo"
            />
          </button>
        </div>
        <div className="w-full flex flex-col items-center">
          <AvatarProfile />
        </div>
        <div className="w-full mt-12 grow flex flex-col overflow-auto ">
          <div className="w-full h-full">
            <SideLinks />
          </div>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
