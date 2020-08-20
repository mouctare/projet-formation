import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FormatDateAPI from "../services/FormatDateAPI";
import ServicesAPI from "../services/ServicesAPI";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";



 const ServicesPage = (props) => {

    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;

    const fetchServices = async () => {
        try {
          const data = await ServicesAPI.findAll();
            setServices(data);
            setLoading(false); 
            } catch(error) {
              toast.error("Imposssible de charger l'agenda des services");
        }
       }
    useEffect(() =>{
      fetchServices();
    }, []);

    const formatDate = (str) => moment(str).format("dddd, MMMM Do YYYY, h:mm:ss a");

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
        toast.success("Le service a bien été supprimé")
      } catch(error) {
        toast.error("Echec lors de la suppression du  service ")
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

      <div className="mb-3 d-flex justify-content-between align-items-center">
           <h1>Agenda des prises de services </h1>
           <div className="col-lg-5">
            <div className="card">
            <div className="card-header"> 
           <Link to="/services/new" className="btn btn-primary">
             Effectuer un service
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
                     <th>Débit de service</th>
                     <th>Types de service</th>
                     <th>Description</th>
                     <th>Latitude</th>
                     <th>Logitude</th>
                     <th></th>
                 </tr>
             </thead>

             {!loading &&  (
             <tbody>
                 {paginatedServices.map(service => ( 
                 <tr key={service.id}>
                     <td>
                      <a href="#">{service.user?.firstName} {service.user?.lastName}</a>
                    </td>
                     <td>{formatDate(service.dateStart)}</td>
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
            )}
         </table>
         {loading && <TableLoader />} 
         
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
