import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import ReportsAPI from "../services/ReportsAPI";


const TITLE_CLASSES = {
    INCIDENT : "danger",
    COURANT : "info"
}
const ReportsPage = props => {


const [reports, setReports] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [search, setSearch] = useState("");

const itemsPerPage = 10;

const fetchReports = async () => {
    
    try {
        const data = await  ReportsAPI.findAll();
       setReports(data)
        console.log(data);
   } catch(error) {
       console.log(error.response);
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
     } catch(error) {
        console.log(error.response);
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
        <h1>Agenda des rapports</h1>
        
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
                 <td><img src={report?.image} 
                    style={{ width: 20, height: 20 }}
                  />
                  </td>
                  <td>{report.site?.name}</td>
                 <td>
                    <button className="btn btn-sm btn-danger"
                     onClick={() => hadleDelete(report.id)}
                     >
                         Supprimer
                    </button> 
                 </td>
                 </tr>
                 ))}
             </tbody>
            </table>
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
