import axios from "axios";

function findAll() {
    return axios
       .get("http://localhost:8000/api/agents")
       .then(response => response.data['hydra:member']);
}

function deleteUser(id) {
    return axios
          .delete("http://localhost:8000/api/agents/" + id);
    
}


export default {
    findAll,
    delete: deleteUser
};