import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const IdeasContext = createContext({});

function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState();

  const contextValue = useMemo(() => {
    return {
      ideas,
      setIdeas,
    };
  }, [ideas, setIdeas]);

  return (
    <IdeasContext.Provider value={contextValue}>
      {children}
    </IdeasContext.Provider>
  );
}

IdeasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeasProvider;
