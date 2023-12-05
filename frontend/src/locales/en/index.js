import buttons from "./buttons.json";
import alts from "./alts.json";
import datagrid from "./datagrid.json";
import datepicker from "./datepicker.json";
import menu from "./menu.json";
import notifications from "./notifications.json";
import components from "./components.json";
import settingsPage from "./pages/settings.json";
import ideasPages from "./pages/ideas/index";
import adminpannel from "./pages/admin/index";
import error from "./pages/error.json";
import users from "./pages/users/index";
import login from "./pages/login.json";
import home from "./pages/home/index";

const translationEN = {
  pages: {
    settings: settingsPage,
    ideas: ideasPages,
    adminpannel,
    login,
    users,
    error,
    home,
  },
  notifications,
  components,
  menu,
  buttons,
  alts,
  datagrid,
  datepicker,
};

export default translationEN;
