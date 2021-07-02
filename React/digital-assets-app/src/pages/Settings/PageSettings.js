import { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import AppContext from "../../store/AppContext/app-context";

const PageSettings = (props) => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    appCtx.onTitleChange(props.title);
  }, []);

  return <Fragment>{props.children}</Fragment>;
};

export default PageSettings;

PageSettings.propTypes = {
  title: PropTypes.string,
};
