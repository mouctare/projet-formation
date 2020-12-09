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
function findPalanningService(id) {
  return axios
    .get("http://localhost:8000/api/plannings/" + id + "/services/")
    .then((response) => response.data["hydra:member"]);
}

function deleteServices(id) {
  return axios
    .delete("http://localhost:8000/api/services/" + id)
    .then((response) => console.log(response));
}
function update(id, service) {
  return axios.put("http://localhost:8000/api/services/" + id, {
    ...service,
    planning: `/api/plannings/${service.planningId}`,
    site: `/api/sites/${service.siteId}`,
  });
}

function create(service) {
  return axios.post("http://localhost:8000/api/services", {
    ...service,
    planning: `/api/plannings/${service.planningId}`,
    site: `/api/sites/${service.siteId}`,
  });
}

export default {
  findAll,
  findPalanningService,
  find,
  create,
  update,
  delete: deleteServices,
};
