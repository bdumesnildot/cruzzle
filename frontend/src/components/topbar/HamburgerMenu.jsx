import { useContext } from "react";
import { MenuContext } from "../../contexts/MenuContext";
import "hamburgers/dist/hamburgers.css";

function HambugerMenu() {
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const handleClick = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <button
      className={`hamburger hamburger--spin p-0 right-1 ${
        activeMenu && "is-active"
      } relative top-[4px] text-blue-500`}
      type="button"
      onClick={() => handleClick()}
    >
      <span className="hamburger-box w-[30px] h-[20px]">
        <span className="hamburger-inner h-[3px] w-[34px] bg-gray-600 after:content-[''] after:h-[3px] after:w-[34px] after:bg-gray-600 before:content-[''] before:w-[34px] before:h-[3px] before:bg-gray-600" />
      </span>
    </button>
  );
}

export default HambugerMenu;
