import Drawer from "@material-ui/core/Drawer";
import AppSection from "./AppSection";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import useRightPanelStyles from "../Styles/right-panel-styles";
import CloseIcon from "@material-ui/icons/Close";

const AppRightDrawer = (props) => {
  const { show, drawerClass, onClose } = props;
  const rpStyles = useRightPanelStyles();

  const onCloseHandler = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onClose();
  };
  console.log(show);

  return (
    <Drawer anchor={"right"} open={show} onClose={onCloseHandler}>
      <div className={drawerClass} role="presentation">
        <AppSection>
          <Box display="flex" className={rpStyles.toolbar}>
            <Typography variant="h6">{props.title}</Typography>
            <CloseIcon
              className={rpStyles.closeIcon}
              onClick={onCloseHandler}
            />
          </Box>
          <Divider className={rpStyles.divider}></Divider>
          {props.children}
        </AppSection>
      </div>
    </Drawer>
  );
};

export default AppRightDrawer;

AppRightDrawer.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  drawerClass: PropTypes.string,
};
