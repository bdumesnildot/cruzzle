import { createTheme } from "@mui/material";

const rootElement = document.getElementById("root");
const themeMui = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  palette: {
    primary: {
      main: "#9C27B0",
      contrastText: "#FCFAFF",
    },
    secondary: {
      main: "#AFE2B1",
    },
    success: {
      main: "#2E7D32",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ED6C02",
    },
    info: {
      main: "#2196F3",
    },
    white: {
      main: "#ffffff",
    },
    grey: {
      main: "#c4c4c4",
    },
  },
});

export default themeMui;
