import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppNavItem from "../../UI/AppNavItem";

const ProfileMenu = (props) => {
  const { onMenuClose, profileElement, onLogout } = props;

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="customized-menu"
      anchorEl={profileElement}
      keepMounted
      open={Boolean(profileElement)}
      onClose={onMenuClose}
    >
      <AppNavItem
        to="/profile"
        text="Profile"
        icon={<PersonIcon fontSize="small" />}
      ></AppNavItem>

      <AppNavItem
        to="/my-settings"
        text="My Settings"
        icon={<SettingsIcon fontSize="small" />}
      ></AppNavItem>

      <Divider />

      <AppNavItem
        onClick={onLogout}
        to=""
        text="Logout"
        icon={<ExitToAppIcon fontSize="small" />}
      ></AppNavItem>
    </Menu>
  );
};

export default ProfileMenu;
