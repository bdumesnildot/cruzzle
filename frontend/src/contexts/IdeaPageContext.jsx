import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const IdeaPageContext = createContext({});

function IdeaPageProvider({ children }) {
  const [idea, setIdea] = useState([]);

  const contextValue = useMemo(() => {
    return {
      idea,
      setIdea,
    };
  }, [idea, setIdea]);

  return (
    <IdeaPageContext.Provider value={contextValue}>
      {children}
    </IdeaPageContext.Provider>
  );
}

IdeaPageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaPageProvider;
