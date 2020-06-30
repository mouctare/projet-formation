import React, { useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination";


const UsersPage = props => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8000/api/agents")
        .then(response => response.data['hydra:member'])
        .then(data => setUsers(data))
        .catch(error => console.log(error.response));
    }, []);

    const handleDelete = id => {
     // Ceci est un mixe des deux approche pour la suppréssion
     const originalUsers = [...users];

     // 1. L'approche optimiste
     setUsers(users.filter(user => user.id !==id));

     // 2. l'approche pessimiste
     axios
     .delete("http://localhost:8000/api/agents/" + id)
     .then(response => console.log("ok"))
     .catch(error => {
       // Si ça na pas marché je veut remettre mon tableau original
       setUsers(originalUsers);
      console.log(error.response);
    });
     
     };

     const handlePageChange = (page) => {
      setCurrentPage(page);
     }

     const itemsPerPage = 10;
     const paginatedUsers = Pagination.getData(
       users,
       currentPage, 
       itemsPerPage

      );
 
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
          
      </tr>
      </thead>

      <tbody>
        {paginatedUsers.map(user => 
           <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <a href="#">{user.firstName} {user.lastName}</a>
              </td>
              <td>{user.email}</td>
              <td>{user.cardPro}</td>
              <td>{user.availabilities.length}</td>
              <td>{user.plannings.length}</td>
              <td>{user.reports.length}</td>
              <td>{user.services.length}</td>
             <td>
                 <button 
                 onClick={() => handleDelete(user.id)}
                 disabled={user.plannings.length > 0}
                 className="btn btn-sm btn-danger"
                 >
                   Supprimer
                   </button> 
              </td>
              </tr>)}
          </tbody>
    </table>

   <Pagination 
   currentPage={currentPage}  
   itemsPerPage={itemsPerPage} 
   length={users.length}
   onPageChanged={handlePageChange}
   /> 
   </>
 );
};
 
export default UsersPage;
