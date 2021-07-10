import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useContext } from "react";
import AppContext from "../../store/AppContext/app-context";

const AppThemeSwitch = () => {
  const appCtx = useContext(AppContext);

  const changeHandler = () => {
    appCtx.onToggleTheme();
  };
  return (
    <FormControlLabel
      control={
        <Switch
          checked={appCtx.isDarkTheme}
          aria-label="Dark"
          onChange={changeHandler}
        />
      }
      label="Dark"
    />
  );
};

export default AppThemeSwitch;
