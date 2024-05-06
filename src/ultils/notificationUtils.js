import { notification } from "antd";

const showSuccessNotification = (message, description) => {
  notification.success({
    message: message,
    description: description,
    placement: "top",
  });
};

const showFailureNotification = (message, description) => {
  notification.error({
    message: message,
    description: description,
    placement: "top",
  });
};

export { showSuccessNotification, showFailureNotification };
