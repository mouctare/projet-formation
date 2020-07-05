import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FormatDateAPI from "../services/FormatDateAPI";
import PlanningsAPI from "../services/PlanningsAPI";

const PlanningsPage = (props) => {

    const [plannings, setPlannings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    
    const itemsPerPage = 10;
  
    
    const fetchPlannings = async () => {
      try {
        const data =   await PlanningsAPI.findAll();
        setPlannings(data);
      } catch(error) {
        console.log(error.response);
      }
    };
    
    useEffect(() => {
      fetchPlannings();
      
    }, []);
    
    
    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);
    
    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
      setSearch(currentTarget.value);
      setCurrentPage(1);
    };
    
    const handleDelete = async id => {
      const originalPlannings = [...plannings];
      setPlannings(plannings.filter(planning => planning.id !== id));
      
      try {
        // 
        await  PlanningsAPI.delete(id);
      } catch(error) {
        console.log(error.response)
        setPlannings(originalPlannings);
      }
    };
    
    // Filtrage des agents en function de la recherche
     let filteredPlannings
     if(search === ""){
        filteredPlannings = plannings
    } else {
        filteredPlannings = plannings.filter(
            p => 
           p.user.firstName.toLowerCase().startsWith((search.toLowerCase()) ||
           p.user.lastName.toLowerCase().startsWith(search.toLowerCase()) ||
           p.dateStart.toLowerCase().includes(search.toLowerCase()) ||
          p.dateEnd.toLowerCase().includes(search.toLowerCase()))  ||
          p.site.name.toLowerCase().includes(search.toLowerCase())

        );
       }

       // Pagination des données
     const paginatedPlannings = Pagination.getData(
        filteredPlannings,
        currentPage, 
        itemsPerPage
 
       );

       
      return (
        <>
          <h1>Liste des plannings</h1>  

          <div className="form-group">
           <input type="text" onChange={handleSearch} 
           value={search} className="form-control" placeholder="Rechercher ..."/>
         </div>

          <table className="table table-hover">
              <thead>
                  <tr>
                    <th>Agent</th>
                      <th>Date de débit</th>
                      <th>Date de fin</th>
                      <th>Site</th>
                </tr>
              </thead>
              <tbody>
                  {paginatedPlannings.map(planning => (                   
                  <tr key={planning.id}>
                       <td>
                         <a href="#">{planning.user.firstName} {planning.user.lastName}</a>
                         </td>
                       <td>{FormatDateAPI.formatDate(planning.dateStart)}</td>
                      <td>{FormatDateAPI.formatDate(planning.dateEnd)}</td>
                      <td>
                        <a href="#">{planning.site?.name} {planning.site?.city}</a>
                      
                      </td>
                      
                      
                         <td>
                          <button className="btn btn-sm btn-primary mr-1">Editer</button>
                          <button className="btn btn-sm btn-danger" 
                          onClick={() => handleDelete(planning.id)}>Supprimer</button>
                      </td>
                     </tr>
                     ))}
                 </tbody>
          </table>

          {itemsPerPage < filteredPlannings.length && (
          <Pagination 
                currentPage={currentPage}  
                itemsPerPage={itemsPerPage} 
                length={filteredPlannings.length}
                onPageChanged={handlePageChange}
           /> 

           )}
        </>
    );
};

export default PlanningsPage;