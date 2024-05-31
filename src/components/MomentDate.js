import moment from "moment";

export const formatDate = (dateStr) => {
  return moment(dateStr).format("DD/MM/YYYY");
};
