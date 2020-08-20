import axios from "axios";


function findAll() {
    return axios
    .get("http://localhost:8000/api/rapports")
    .then(response => response.data['hydra:member']);
}
function create(report) {
  return  axios.post("http://localhost:8000/api/rapports", {
    ...report, site: `/api/sites/${report.site}`
});

}
function deleteReport(id) {
  return  axios
    .delete("http://localhost:8000/api/rapports/" + id)
    .then(response => console.log(response));
}


export default {

    findAll,
    create,
    delete: deleteReport

 }