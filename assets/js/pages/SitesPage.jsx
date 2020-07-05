import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import SitesAPI from "../services/SitesAPI";

 const SitesPage = props  => {

    const [sites, setSites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("");
    
    const itemsPerPage = 10;

  const fetchSites = async () => {
      try {
          const data = await SitesAPI.findAll();
          setSites(data);
      } catch (error) {
          console.log(error.response);
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

        } catch(error) {
            setSites(originalSites);
            console.log(error.response);
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

        <h1>Liste des sites</h1>

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

            <tbody>
               {paginatedSites.map(site => 
               <tr key={site.id}>
                    <td>{site.id}</td>
                    <td className="text-center">{site.name}</td>
                    <td className="text-center">{site.streetNumber}</td>
                    <td className="text-center">{site.streetName}</td>
                    <td className="text-center">{site.buildingName}</td>
                    <td className="text-center">{site.city}</td>
                    <td className="text-center">{site.postCode}</td>
                    <td className="text-center">{site.plannings.length}</td>
                    <td className="text-center">{site.reports.length}</td>
                    <td>
                        <button 
                           onClick={() => handleDelete(site.id)}
                          disabled={site.reports.length > 0} 
                          className="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                    <td></td>
                </tr>
                )}
            </tbody>
        </table>

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
