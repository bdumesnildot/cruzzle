import { createContext, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";

export const AlertToastContext = createContext({});

function AlertToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState(null);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(null);
  const [direction, setDirection] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const onCloseActionRef = useRef(() => {});

  const contextValue = useMemo(() => {
    return {
      open,
      setOpen,
      severity,
      setSeverity,
      title,
      setTitle,
      message,
      setMessage,
      variant,
      setVariant,
      anchor,
      setAnchor,
      direction,
      setDirection,
      onCloseAction: onCloseActionRef.current, // Obtenez la valeur actuelle de onCloseAction
      setOnCloseAction: (onCloseAction) => {
        onCloseActionRef.current = onCloseAction; // Mettez à jour la valeur de onCloseAction
      },
    };
  }, [
    open,
    setOpen,
    severity,
    setSeverity,
    title,
    setTitle,
    message,
    setMessage,
    variant,
    setVariant,
    anchor,
    setAnchor,
    direction,
    setDirection,
  ]);

  return (
    <AlertToastContext.Provider value={contextValue}>
      {children}
    </AlertToastContext.Provider>
  );
}

AlertToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertToastProvider;
