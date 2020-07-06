import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FormatDateAPI from "../services/FormatDateAPI";
import UsersAPI from "../services/UsersAPI";


const UsersPage = props => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Permet d'aller récupérer les agents
    const fetchUsers = async () => {
      try {
        const data = await UsersAPI.findAll()
        setUsers(data);
      } catch(error) {
        console.log(error.response)
      }
    };
   // Au chargement du composant, on va chercher les agents
    useEffect(() => {
      fetchUsers(); 
     }, []);

    // Gestion de la suppréssion d'un agent
    const handleDelete =  async id => {
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
};
  // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);
     
   // Gestion de la recherche
   const handleSearch = ({currentTarget}) => {
       setSearch(currentTarget.value);
       setCurrentPage(1);
     };

     const itemsPerPage = 10;

    // Filtrage des agents en function de la recherche
     let filteredUsers
     if(search === ""){
        filteredUsers = users
    } else {
        filteredUsers = users.filter(
            u => 
           u.firstName.toLowerCase().includes((search.toLowerCase()) ||
           u.lastName.toLowerCase().includes(search.toLowerCase()) ||
           u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.cardPro.toLowerCase().includes(search.toLowerCase()))
        );
       }
      // Pagination des données
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
          <th>Date delivration carte pro</th>
          <th>Date d'expiration carte pro</th>
          <th>Plannings</th>
          <th>Idisponibilités</th>
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
              <td>{FormatDateAPI.formatDate(user.dateCreatedCarPro)}</td> 
              <td>{FormatDateAPI.formatDate(user.expiryDateCardPro)}</td> 
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
