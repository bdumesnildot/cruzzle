import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userGamification, setUserGamification] = useState({
    currentLevel: 0,
    currentScore: 0,
    currentLevelMinMaxScore: {
      min: 0,
      max: 0,
    },
  });

  const value = useMemo(
    () => ({ user, setUser, userGamification, setUserGamification }),
    [user, setUser, userGamification, setUserGamification]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
