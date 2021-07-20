import Drawer from "@material-ui/core/Drawer";
import AppSection from "../UI/AppSection";
import PropTypes from "prop-types";

const AppDetailDrawer = (props) => {
  const { show, drawerClass, onClose } = props;

  const onCloseHandler = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onClose();
  };

  return (
    <Drawer anchor={"right"} open={show} onClose={onCloseHandler}>
      <div className={drawerClass} role="presentation">
        <AppSection>{props.children}</AppSection>
      </div>
    </Drawer>
  );
};

export default AppDetailDrawer;

AppDetailDrawer.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  drawerClass: PropTypes.string,
};
