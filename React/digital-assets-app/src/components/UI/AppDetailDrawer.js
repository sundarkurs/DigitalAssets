import Drawer from "@material-ui/core/Drawer";
import AppSection from "../UI/AppSection";
import PropTypes from "prop-types";

const AppDetailDrawer = (props) => {
  const { show, drawerClass, onClose } = props;

  return (
    <Drawer anchor={"right"} open={show} onClose={onClose}>
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
