import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FormatDateAPI from "../services/FormatDateAPI";
import axios from "axios";


 const AvailaBilityPage = (props)  =>{

    const [availabilities, setAvalabilities] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [search, setSearch] = useState("");
    
    const itemsPerPage = 10;
  

    const fetchAvailabilities = async () => {
        try {
            const  data = await  axios
            .get("http://localhost:8000/api/disponibilites")
            .then(response => response.data['hydra:member']);
            setAvalabilities(data);
            console.log(data)
        } catch(error){
            console.log(error.response)
        }
     };
 
   useEffect(() => {
        fetchAvailabilities();
     }, []);

     const handlePageChange = page => setCurrentPage(page);
    
     // Gestion de la recherche
     const handleSearch = ({currentTarget}) => {
       setSearch(currentTarget.value);
       setCurrentPage(1);
     };
     
     const handleDelete = async id => {
       const originalAvailabilities= [...availabilities];
       setAvalabilities(availabilities.filter(availabilitie => availabilitie.id !== id));
       
       try {
         // 
         await  axios .delete("http://localhost:8000/api/disponibilites/" + id);
         } catch(error) {
         console.log(error.response)
         setAvalabilities(originalAvailabilities);
       }
     };
     
     // Filtrage des agents en function de la recherche
      let filteredAvailabilities
      if(search === ""){
         filteredAvailabilities= availabilities
     } else {
         filteredAvailabilities= availabilities.filter(
         a => 
            a. user.firstName.toLowerCase().startsWith((search.toLowerCase()) ||
            a. user.lastName.toLowerCase().startsWith(search.toLowerCase())
     ) 
            
     );
                 
  }
 
        // Pagination des données
      const paginatedAvailabilities= Pagination.getData(
         filteredAvailabilities,
         currentPage, 
         itemsPerPage
  
        );


    return (
    <>
       <h1>Liste des indisponibilités</h1>

       <div className="form-group">
           <input type="text" onChange={handleSearch} 
            value={search} className="form-control" placeholder="Rechercher ..."/>
         </div>
    
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Agent</th>
                <th className="tex-center">Date de débit</th>
                <th className="tex-center">Date de Fin</th>
                <th></th>
            </tr>
        </thead>    
         <tbody>
             {paginatedAvailabilities.map(availabilitie => (
             <tr key={availabilitie.id}>
                <td>
                    <a href="#">{availabilitie.user.firstName} {availabilitie.user.lastName}</a>
                 </td>
                <td className="tex-center">{FormatDateAPI.formatDate(availabilitie.startDate)}</td>
                <td className="tex-center">{FormatDateAPI.formatDate(availabilitie.dateEnd)}</td>
                <td>
                    <button className="btn btn-sm btn-primary mr-1">Editer</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(availabilitie)}>Supprimer</button>
            </td>
             </tr>
             ))}
         </tbody>
    </table>
    {itemsPerPage < filteredAvailabilities.length && (
    <Pagination 
         currentPage={currentPage}  
         itemsPerPage={itemsPerPage} 
         length={filteredAvailabilities.length}
         onPageChanged={handlePageChange}

       
         /> 

         )}
      </>
  );
};

export default AvailaBilityPage;
