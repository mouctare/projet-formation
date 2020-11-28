import axios from "axios";

function findAll() {
  return axios
    .get("http://localhost:8000/api/services")
    .then((response) => response.data["hydra:member"]);
}
function find(id) {
  return axios
    .get("http://localhost:8000/api/services/" + id)
    .then((response) => response.data);
}

function deleteServices(id) {
  return axios
    .delete("http://localhost:8000/api/services/" + id)
    .then((response) => console.log(response));
}

function create(service) {
  return axios.post("http://localhost:8000/api/services", service);
}

export default {
  findAll,
  find,
  create,
  delete: deleteServices,
};
