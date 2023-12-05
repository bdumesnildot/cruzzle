import { createContext, useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import PropTypes from "prop-types";

export const LanguageContext = createContext({});

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const langues = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={langues}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
        {children}
      </LocalizationProvider>
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LanguageProvider;
