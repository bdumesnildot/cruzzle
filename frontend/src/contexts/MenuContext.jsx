import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const MenuContext = createContext({});

function MenuProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(true);

  const activateMenu = useMemo(
    () => ({ activeMenu, setActiveMenu }),
    [activeMenu, setActiveMenu]
  );

  return (
    <MenuContext.Provider value={activateMenu}>{children}</MenuContext.Provider>
  );
}

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuProvider;
