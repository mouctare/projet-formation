import axios from "axios";

async function findAll() {
  const data = await axios

    .get("http://localhost:8000/api/plannings")
    .then((response) => response.data["hydra:member"]);
  console.log(data);
  return data;
}

function deletePlanning(id) {
  return axios.delete("http://localhost:8000/api/plannings/" + id);
}

function find(id) {
  return axios
    .get("http://localhost:8000/api/plannings/" + id)
    .then((response) => response.data);
}

function findPlanningServices(id) {
  return axios
    .get(`http://localhost:8000/api/plannings/${id}/services`)
    .then((response) => response.data);
}

function update(id, planning) {
  return axios.put("http://localhost:8000/api/plannings/" + id, {
    ...planning,
    user: `/api/agents/${planning.user}`,
    site: `/api/sites/${planning.site}`,
  });
}

function create(planning) {
  return axios.post("http://localhost:8000/api/plannings", {
    ...planning,
    user: `/api/agents/${planning.user}`,
    site: `/api/sites/${planning.site}`,
  });
}

export default {
  findAll,
  find,
  findPlanningServices,
  create,
  update,
  delete: deletePlanning,
};
