import axios from "axios";


function findAll() {
    return axios
    .get("http://localhost:8000/api/sites")
    .then(response => response.data['hydra:member']);
}

function deleteSite(id) {
  return  axios
    .delete("http://localhost:8000/api/sites/" + id)
    .then(response => console.log(response));
}


export default {

    findAll,
    delete: deleteSite

 }