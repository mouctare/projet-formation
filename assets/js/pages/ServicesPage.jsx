import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FormatDateAPI from "../services/FormatDateAPI";
import axios from "axios";



 const ServicesPage = (props) => {

    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [search, setSearch] = useState("");

    const itemsPerPage = 10;

    const fetchServices = async () => {
        try {
            const data =  await axios
            .get("http://localhost:8000/api/services")
            .then(response => response.data['hydra:member']);
            setServices(data);

            } catch(error) {
            console.log(error.response)
        }
       }
    useEffect(() =>{
      fetchServices();
    }, []);

    const handlePageChange = page => setCurrentPage(page);
    
    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
      setSearch(currentTarget.value);
      setCurrentPage(1);
    };

      // Filtrage des agents en function de la recherche
      let filteredServices
      if(search === ""){
         filteredServices= services
     } else {
         filteredServices= services.filter(
         s => 
            s. user.firstName.toLowerCase().startsWith((search.toLowerCase()) ||
            s. user.lastName.toLowerCase().startsWith(search.toLowerCase())
     ) 
            
     );
                 
  }
 
        // Pagination des données
      const paginatedServices= Pagination.getData(
         filteredServices,
         currentPage, 
         itemsPerPage
  
        );


 return ( 
       <>
         <h1>Agendas des prises de services </h1>
         <div className="form-group">
           <input type="text" onChange={handleSearch} 
            value={search} className="form-control" placeholder="Rechercher ..."/>
         </div>
    
         <table className="table table-hover">
             <thead>
                 <tr>
                     <th>Agent</th>
                     <th>Débit de service</th>
                     <th>Types de service</th>
                     <th>Description</th>
                     <th>Latitude</th>
                     <th>Logitude</th>
                     <th></th>
                 </tr>
             </thead>
             <tbody>
                 {paginatedServices.map(service => ( 
                 <tr key={service.id}>
                     <td>
                      <a href="#">{service.user.firstName} {service.user.lastName}</a>
                    </td>
                     <td>{FormatDateAPI.formatDate(service.dateStart)}</td>
                     <td>{service.typeService}</td>
                     <td>{service.description}</td>
                     <td>{service.lat}</td>
                     <td>{service.lng}</td>
                      <th>
                         <button className="btn btn-sm btn-danger">Supprimer</button>
                     </th>
                 </tr>
                  ))}
             </tbody>
         </table>
         {itemsPerPage < filteredServices.length && (
        <Pagination 
         currentPage={currentPage}  
         itemsPerPage={itemsPerPage} 
         length={filteredServices.length}
         onPageChanged={handlePageChange}

       
         /> 

         )}
     </>
    );
}


export default ServicesPage;
