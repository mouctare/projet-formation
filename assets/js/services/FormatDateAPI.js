import moment from "moment";

function  formatDate(str) {
    return  moment(str).format('DD/MM/YYYY/h:mm');
} 
 export default {
formatDate
};