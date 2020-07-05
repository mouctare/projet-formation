import axios from "axios";


function findAll() {
    return axios
       .get("http://localhost:8000/api/plannings")
       .then(response => response.data['hydra:member']);
}

function deletePlanning(id) {
    return axios
          .delete("http://localhost:8000/api/plannings/" + id);
    
}


export default {
    findAll,
    delete: deletePlanning
};