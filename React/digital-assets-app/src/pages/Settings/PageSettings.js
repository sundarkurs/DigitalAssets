import { Fragment, useContext, useEffect } from "react";
import PageLayout from "../../components/Layout/PageLayout";
import PropTypes from "prop-types";
import AppContext from "../../store/AppContext/app-context";

const PageSettings = (props) => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    appCtx.onTitleChange(props.title);
  }, []);

  let rendering = <PageLayout>{props.children}</PageLayout>;
  if (props.title === "Dashboard") {
    rendering = <Fragment>{props.children}</Fragment>;
  }

  return rendering;
};

export default PageSettings;

PageSettings.propTypes = {
  title: PropTypes.string,
};
