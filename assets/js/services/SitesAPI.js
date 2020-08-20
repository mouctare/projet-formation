import axios from "axios";


function findAll() {
    return axios
    .get("http://localhost:8000/api/sites")
    .then(response => response.data['hydra:member']);
}

function find(id) {  
    return axios
    .get("http://localhost:8000/api/sites/" + id)
    .then(response => response.data);
}

  


function update(id, site) {
  axios.put(
    "http://localhost:8000/api/sites/" + id,  site );
}

function deleteSite(id) {
  return  axios .delete("http://localhost:8000/api/sites/" + id)
    
}

function create(site){   
  return axios.post("http://localhost:8000/api/sites",  site );

}



export default {

    findAll,
    find,
    create,
    update,
    delete: deleteSite

 }