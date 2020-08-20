import axios from "axios";

function findAll() {
    return axios
       .get("http://localhost:8000/api/agents")
       .then(response => response.data['hydra:member']);
}

function find(id) {
    return axios
    .get("http://localhost:8000/api/agents/" + id)
    .then(response => response.data);
}

function deleteUser(id) {
    return axios
          .delete("http://localhost:8000/api/agents/" + id);
    
}

function update(id,user) {
  return  axios.put(
        "http://localhost:8000/api/agents/" + id, user);        
}

function create(user) {
    return axios.post("http://localhost:8000/api/agents", user);
}


export default {
    findAll,
    find,
    create,
    update,
    delete: deleteUser

};