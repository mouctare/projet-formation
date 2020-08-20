import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ReportsAPI from "../services/ReportsAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";


const TITLE_CLASSES = {
    COURANT : "info",
    INCIDENT : "danger",
    
}
const ReportsPage = () => {
    
    
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isRoleUser, setisRoleUser] = useState(false);
    const [loading, setLoading] = useState(true);


const itemsPerPage = 10;

const fetchReports = async () => {
    
    try {
        const data = await  ReportsAPI.findAll();
       setReports(data)
       setisRoleUser(window.localStorage.getItem("UserRole")? true: false);
       setLoading(false); 
   } catch(error) {
     toast.error("Erreur lors du chargement des rapports !")
   }
     
};

useEffect(() => {
    fetchReports();

}, []);

 // Gestion du changement de page
 const handlePageChange = page => setCurrentPage(page);
    
 // Gestion de la recherche
 const handleSearch = ({currentTarget}) => {
   setSearch(currentTarget.value);
   setCurrentPage(1);
 };

 const hadleDelete = async id => {
     const originalReports = [...reports];
     setReports(reports.filter(report => report.id !== id));

     try {
        await ReportsAPI.delete(id)
        toast.success("Le rapport a bien été supprimé")
     } catch(error) {
        toast.error("Une erreur est survenue");
        setReports(originalReports);
    }
 };
  // Filtrage des agents en function de la recherche
  let filteredReports
  if(search === ""){
     filteredReports = reports
 } else {
     filteredReports = reports.filter(
         r => 
        r.user.firstName.toLowerCase().startsWith((search.toLowerCase()) ||
        r.user.lastName.toLowerCase().startsWith(search.toLowerCase()) ||
        r.title.toLowerCase().startsWith(search.toLowerCase()) ||
       r.site.name.toLowerCase().includes(search.toLowerCase())

     ));
    }

   // Pagination des données
   const paginatedReports = Pagination.getData(
    filteredReports,
    currentPage, 
    itemsPerPage

   );

   return (
     <>
     <div className="mb-3 d-flex justify-content-between algn-items-center">
        <h1>Agenda des rapports</h1>
        <div className="col-lg-5">
        <div className="card">
        <div className="card-header">
        <Link className="btn btn-primary" to="/rapports/new">Créer un rapport</Link>
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
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Images</th>
                    <th>site</th>
                </tr>
            </thead>

            {!loading &&  (
            <tbody>
                {paginatedReports.map(report => ( 
                    
                <tr key={report.id}>
                 <td>
                  <a href="#">{report.user.firstName} {report.user.lastName}</a>
                 </td>
                 <td className="text-center">
                     <span className={"badge badge-" + TITLE_CLASSES[report.title]}>{report.title}</span>
                     </td>
                  <td>{report.description}</td>




                 <td>{report?.imageName} 
                 <div className="container">
                  <i class="fas fa-file-upload"  />  
                   <i class="fas fa-file-download" />
                  </div>
                   </td>



                  
                 <td>{report.site?.name}</td>

                  {!isRoleUser && ( 
                 <td>
                    <button className="btn btn-sm btn-danger"
                     onClick={() => hadleDelete(report.id)}
                     >
                         Supprimer
                    </button> 
                 </td>
                   )}
                 </tr>
                 ))}
             </tbody>
            )}
            </table>
            
            {loading && <TableLoader />} 
      
            {itemsPerPage < filteredReports.length && (
            <Pagination 
                currentPage={currentPage}  
                itemsPerPage={itemsPerPage} 
                length={filteredReports.length}
                onPageChanged={handlePageChange}
           /> 
        )}
    </> 
    );
   };

export default  ReportsPage;
