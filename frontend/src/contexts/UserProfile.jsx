import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const UserProfileContext = createContext(null);

function UserProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const value = useMemo(
    () => ({ user, setUser, isLoading, setIsLoading }),
    [user, setUser, isLoading, setIsLoading]
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

UserProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProfileProvider;
