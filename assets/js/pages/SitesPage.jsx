import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import SitesAPI from "../services/SitesAPI";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import TableLoader from "../components/loaders/TableLoader";


 const SitesPage = props  => {

    const [sites, setSites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isRoleUser, setisRoleUser] = useState(false);
    const itemsPerPage = 10;

  const fetchSites = async () => {
      try {
          const data = await SitesAPI.findAll();
          setisRoleUser(window.localStorage.getItem("UserRole")? true: false);
          setSites(data);
          setLoading(false)
      } catch (error) {
        toast.error("Erreur lors du chargement des sites !")
      }
      
  };

    useEffect(() => {
        fetchSites()

    }, []);

    const handleDelete =  async id => {
        const originalSites = [...sites];
        
        setSites(sites.filter(site => site.id !== id));

        try {

           await SitesAPI.delete(id)
           toast.success("Le site  a bien été supprimé");
        } catch(error) {
          toast.error("Une erreur est survenue");
            setSites(originalSites);
            
        }

     };

    const handlePageChange = page => setCurrentPage(page);
        
    

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
      };
      

   
 let filteredSites
    if(search === ""){
       filteredSites = sites
   } else {
       filteredSites = sites.filter(
           s => 
           s.city.toLowerCase().includes(search.toLowerCase()) ||
           s.name.toLowerCase().startsWith((search.toLowerCase()) ||
           s.streetName.toLowerCase().includes(search.toLowerCase()) ||
           s.streetNumber.toLowerCase().includes(search.toLowerCase()))  
        
       );
      }

    const paginatedSites = Pagination.getData(
        filteredSites,
        currentPage, 
        itemsPerPage
 
       );

    return (
        <>
       <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des sites</h1>
        {!isRoleUser && (  
        <div className="col-lg-5">
        <div className="card">
        <div className="card-header"> 
        <Link className="btn btn-primary" to="/sites/new">
            Créer un site
        </Link>
        </div>
        </div>
         </div>
        )}
    </div>

        <div className="form-group">
           <input type="text" onChange={handleSearch} 
           value={search} className="form-control" placeholder="Rechercher ..."/>
         </div>

        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Numéro de rue</th>
                    <th>Nom de rue</th>
                    <th>Batiment</th>
                    <th>Ville</th>
                    <th>Cod postal</th>
                    <th>Plannings</th>
                    <th>Rapports</th>
                    <th></th>
                </tr>
            </thead>
            {!loading &&(
            <tbody>
               {paginatedSites.map(site => 
               <tr key={site.id}>
                    <td>{site.id}</td>
                    <td className="text-center">
                    <Link to={"/sites/" + site.id}>
                     {site.name}
                    </Link>
                    </td>
                    <td className="text-center">{site.streetNumber}</td>
                    <td className="text-center">{site.streetName}</td>
                    <td className="text-center">{site.buildingName}</td>
                    <td className="text-center">{site.city}</td>
                    <td className="text-center">{site.postCode}</td>
                    <td className="text-center">{site.plannings.length}</td>
                    <td className="text-center">{site.reports.length}</td>

                    {!isRoleUser && ( 
                    <td>
                        <Link to={"/sites/" + site.id} 
                            className="btn btn-sm btn-primary mr-1"
                             >
                             Editer
                         </Link>
                        <button 
                           onClick={() => handleDelete(site.id)}
                          disabled={site.reports.length > 0} 
                          className="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                     )}
                </tr>
                )}
            </tbody>
            )}
        </table>
        {loading && <TableLoader />}

        {itemsPerPage < filteredSites.length && (
          <Pagination 
                currentPage={currentPage}  
                itemsPerPage={itemsPerPage} 
                length={filteredSites.length}
                onPageChanged={handlePageChange}
           /> 

           )}
        </>
    );
};


export default SitesPage;
