import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #545556;",
    width: "200px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const ProfileMenu = (props) => {
  const { onMenuClose, profileElement, onLogout } = props;

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={profileElement}
      keepMounted
      open={Boolean(profileElement)}
      onClose={onMenuClose}
    >
      <NavLink
        to="/profile"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
      </NavLink>

      <NavLink
        to="/my-settings"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Settings" />
        </StyledMenuItem>
      </NavLink>
      <Divider />
      <StyledMenuItem onClick={onLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default ProfileMenu;
