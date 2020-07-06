import axios from "axios";


function findAll() {
    return axios
    .get("http://localhost:8000/api/rapports")
    .then(response => response.data['hydra:member']);
}

function deleteReport(id) {
  return  axios
    .delete("http://localhost:8000/api/rapports/" + id)
    .then(response => console.log(response));
}


export default {

    findAll,
    delete: deleteReport

 }