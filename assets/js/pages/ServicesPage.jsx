import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FormatDateAPI from "../services/FormatDateAPI";
import axios from "axios";
import ServicesAPI from "../services/ServicesAPI";



 const ServicesPage = (props) => {

    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [search, setSearch] = useState("");

    const itemsPerPage = 10;

    const fetchServices = async () => {
        try {
          const data = await ServicesAPI.findAll();
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

    const handleDelete = async id => {
      const originalServices = [...services];
      setServices(services.filter(service => service.id !== id));
      
      try {
        // 
        await  ServicesAPI.delete(id)
      } catch(error) {
        console.log(error.response)
        setServices(originalServices);
      }
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
         <h1>Agenda des prises de services </h1>
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
                      <td>
                      <button className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(service.id)}>Supprimer</button>
                      </td>
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
};


export default ServicesPage;
