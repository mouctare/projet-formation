import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import UsersAPI from "../services/UsersAPI";


const UsersPage = props => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
       UsersAPI.findAll()
        .then(data => setUsers(data))
        .catch(error => console.log(error.response));
    }, []);

    const handleDelete = id => {
     // Ceci est un mixe des deux approche pour la suppréssion
     const originalUsers = [...users];

     // 1. L'approche optimiste
     setUsers(users.filter(user => user.id !==id));

     // 2. l'approche pessimiste
     try {
     await UsersAPI.delete(id)
   } catch(error) {
     setUsers(originalUsers);
    console.log(error.response);
  }

 // UsersAPI.delete(id)   
  //   .then(response => console.log("ok"))
   //  .catch(error => {
       // Si ça na pas marché je veut remettre mon tableau original
    });
     
     };

     const handlePageChange = (page) => {
      setCurrentPage(page);
     };

     const handleSearch = event => {
       const value = event.currentTarget.value;
       setSearch(value);
       setCurrentPage(1);
     };

     const itemsPerPage = 10;


     let filteredUsers
     if(search === ""){
        filteredUsers = users
    } else {
        filteredUsers = users.filter(
            u => 
           u.firstName.toLowerCase().includes((search.toLowerCase()) ||
           u.lastName.toLowerCase().includes(search.toLowerCase()) ||
           u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.cardPro.toLowerCase().includes(search.toLowerCase()) 
          ));
       }

     const paginatedUsers = Pagination.getData(
       filteredUsers,
       currentPage, 
       itemsPerPage

      );
 
    return (
    <>
        <h1> Liste des agents</h1>
         
         <div className="form-group">
           <input type="text" onChange={handleSearch} 
           value={search} className="form-control" placeholder="Rechercher ..."/>
         </div>

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

   {itemsPerPage < filteredUsers.length && (
   <Pagination 
      currentPage={currentPage}  
      itemsPerPage={itemsPerPage} 
      length={filteredUsers.length}
      onPageChanged={handlePageChange}
   /> 
   )}
   </>
 );
};
 
export default UsersPage;
