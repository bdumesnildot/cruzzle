import { createContext, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";

export const ScrollContext = createContext();

function ScrollProvider({ children }) {
  const [width, setWidth] = useState(0);
  const divRef = useRef();

  const contextValue = useMemo(() => {
    return {
      width,
      setWidth,
      divRef,
    };
  }, [width, setWidth, divRef]);

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
}

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollProvider;
