import { useSnackbar } from "notistack";

const useShowMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showApiError = (error) => {
    var data = error.response.data;
    if (!data.Succeeded && data.Errors.length > 0) {
      data.Errors.forEach((item) => {
        enqueueSnackbar(item, {
          variant: "error",
        });
      });
    } else {
      enqueueSnackbar(data.message, {
        variant: "error",
      });
    }
  };

  const showSuccess = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
    });
  };

  const showError = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  return { showSuccess, showError, showApiError };
};

export default useShowMessage;
