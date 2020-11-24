import moment from "moment";

export const formatDate = (str) => {
  let date_ob = new Date(str);
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current Hour
  let heure = ("0" + date_ob.getUTCHours()).slice(-2);
  // current Minues
  let mn = ("0" + date_ob.getMinutes()).slice(-2);
  // prints date in YYYY-MM-DD format
  return date + "-" + month + "-" + year + " " + heure + "h:" + mn;
};
