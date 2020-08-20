import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FormatDateAPI from "../services/FormatDateAPI";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";


 const AvailaBilityPage = (props)  =>{

    const [availabilities, setAvalabilities] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    
    const itemsPerPage = 10;
    const formatDate = (str) => moment(str).format("YYYY-MM-DDTHH:mm");
    
    const fetchAvailabilities = async () => {
        try {
            const  data = await  axios
            .get("http://localhost:8000/api/disponibilites")
            .then(response => response.data['hydra:member']);
            setAvalabilities(data);
            setLoading(false)
        } catch(error){
          toast.error("Imposssible de charger les indisponibilités");
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
    <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des indisponibilités</h1>
          <div className="col-lg-5">
          <div className="card">
          <div className="card-header"> 
        <Link className="btn btn-primary" to="/disponibilites/new">
            Envoyer des indisponibilités
      </Link>
      </div>
      </div>
      </div>
    </div>
     
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
                <th className="tex-center">Details</th>
                
            </tr>
        </thead> 

         {!loading &&(   
         <tbody>
             {paginatedAvailabilities.map(availabilitie => (
             <tr key={availabilitie.id}>
                <td>
                    <a href="#">{availabilitie.user.firstName} {availabilitie.user.lastName}</a>
                 </td>
                <td className="tex-center">{formatDate(availabilitie.startDate)}</td>
                <td className="tex-center">{formatDate(availabilitie.dateEnd)}</td>
                <td className="tex-center">{availabilitie.detail}</td>
                <td>
                    <button className="btn btn-sm btn-primary mr-1">Editer</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(availabilitie)}>Supprimer</button>
            </td>
             </tr>
             ))}
         </tbody>
          )}
        </table>
        {loading && <TableLoader />}
    
    {itemsPerPage < filteredAvailabilities.length && (
    <Pagination 
         currentPage={currentPage}  
         itemsPerPage={itemsPerPage} 
         length={filteredAvailabilities.length}
         onPageChanged={handlePageChange}/> 

        )}
    </>
  );
};

export default AvailaBilityPage;
