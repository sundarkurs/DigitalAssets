import { Fragment, useState, useContext } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import AuthContext from "../../../store/AuthContext/auth-context";
import { useHistory } from "react-router-dom";
import ProfileMenu from "../Menu/ProfileMenu";

const ProfileIcon = () => {
  const history = useHistory();
  const [profileElement, setProfileElement] = useState(null);
  const authCtx = useContext(AuthContext);

  const menuOpenHandler = (event) => {
    setProfileElement(event.currentTarget);
  };

  const onMenuCloseHandler = () => {
    setProfileElement(null);
  };

  const onLogoutHandler = () => {
    authCtx.onLogout();
    history.push("/login");
  };

  return (
    <Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={menuOpenHandler}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <ProfileMenu
        onMenuClose={onMenuCloseHandler}
        onLogout={onLogoutHandler}
        profileElement={profileElement}
      ></ProfileMenu>
    </Fragment>
  );
};

export default ProfileIcon;
