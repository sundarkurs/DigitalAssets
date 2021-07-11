import Switch from "@material-ui/core/Switch";
import { useContext } from "react";
import AppContext from "../../store/AppContext/app-context";

const AppThemeSwitch = () => {
  const appCtx = useContext(AppContext);

  const changeHandler = () => {
    appCtx.onToggleTheme();
  };
  return (
    <Switch
      checked={appCtx.isDarkTheme}
      aria-label="Dark"
      onChange={changeHandler}
    />
  );
};

export default AppThemeSwitch;
