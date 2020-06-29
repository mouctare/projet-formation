import React, { useEffect, useState} from "react";
import axios from "axios";


const UsersPage = props => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/agents")
        .then(response => response.data['hydra:member'])
        .then(data => setUsers(data))
        .catch(error => console.log(error.response));
        

    }, []);
    return (
    <>
        <h1> Liste des agents</h1>


    <table className="table table-hover">
      <thead>
      <tr>
          <th>Id</th>
          <th>Agent</th>
          <th>Email</th>
          <th>Numéro carte pro</th>
          <th>Plannigs</th>
          <th>Disponibilités</th>
          <th>Rapports</th>
          <th>Services</th>
          <th></th>
      </tr>
      </thead>

      <tbody>
        {users.map(user => 
           <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <a href="#">{user.firstName} {user.lastName}</a>
              </td>
              <td>{user.email}</td>
              <td>
                 <span className="badge badge-primary">{user.cardPro}</span> 
               </td>
              <td>{user.availabilities.length}</td>
              <td>{user.plannings.length}</td>
              <td>{user.reports.length}</td>
              <td>{user.services.length}</td>
             <td>
                 <button className="btn btn-sm btn-danger">Supprimer</button> 
              </td>
              
          </tr>)}
         
      </tbody>
    </table>
    </>
    );
};
 
export default UsersPage;
