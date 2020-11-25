import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import Pagination from "../components/Pagination";
import { formatDate } from "../services/FormatDateAPI";
import ServicesAPI from "../services/ServicesAPI";
import UsersAPI from "../services/UsersAPI";
import ServicePage from "./ServicePage";
import PlanningsAPI from "../services/PlanningsAPI";
import SitesAPI from "../services/SitesAPI";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  //const [isRoleUser, setisRoleUser] = useState(false);
  const [isRoleUser, setisRoleUser] = useState(false);
  const [plannings, setPlannings] = useState([]);

  const itemsPerPage = 10;

  const fetchPlannings = async () => {
    try {
      const data = await PlanningsAPI.findAll();
      // console.log("  tableau de planning  ==  ", data);
      setisRoleUser(window.localStorage.getItem("UserRole") ? true : false);
      setPlannings(data);
      setLoading(false);
    } catch (error) {
      toast.error("Imposssible de charger les plannings");
    }
  };

  const getServiceInfo = async (service) => {
    try {
      UsersAPI.find(service.planning.user).then((user) => {
        service.firstName = user.firstName;
        service.lastName = user.lastName;
        return user.firstName + " " + user.lastName;
        //  setServices(data);
        //  setLoading(false);
      });
    } catch (error) {
      toast.error("Imposssible de charger l'agenda des services");
    }
  };

  const fetchServices = () => {
    try {
      ServicesAPI.findAll().then((data) => {
        let role = window.localStorage.getItem("UserRole") ? true : false;
        console.log("Role ", role);
        setisRoleUser(role);
        console.log("data from fetchservices", data);
        data.map((item) => {
          if (item.actif == true) {
            item.actif = "En Cours";
          } else {
            item.actif = "Terminée";
          }
          data.actif = item.actif;
          item.dateEnd = item.planning.dateEnd;
          item.dateStart = item.planning.dateStart;
          getServiceInfo(item, data);
        });

        setServices(data);
        setLoading(false);
        // console.log(" liste des service avant UserInfo ******** ", data);
        // data.planning.user = await UsersAPI.find(25);
        // console.log(" liste des service Apres userInfo ******** ", data);

        console.log(" Nouvelle list ", data);
      });
    } catch (error) {
      toast.error("Imposssible de charger l'agenda des services");
    }
  };
  /*  const fetchSites =  () => {
    try {
      const data = await SitesAPI.findAll();
      
     
    } catch (error) {
      toast.error("Erreur lors du chargement des sites !");
    }
  }; */

  useEffect(() => {
    fetchServices();
    fetchPlannings();
    console.log("etat de plannings servicePage", plannings);
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const originalServices = [...services];
    setServices(services.filter((service) => service.id !== id));
    try {
      await ServicesAPI.delete(id);
      toast.success("Le service a bien été supprimé");
    } catch (error) {
      toast.error("Echec lors de la suppression du  service ");
      setServices(originalServices);
    }
  };
  // Filtrage des agents en function de la recherche
  let filteredServices;
  if (search === "") {
    filteredServices = services;
  } else {
    filteredServices = services.filter((s) =>
      s.user.firstName
        .toLowerCase()
        .startsWith(
          search.toLowerCase() ||
            s.user.lastName.toLowerCase().startsWith(search.toLowerCase())
        )
    );
  }

  // Pagination des données
  const paginatedServices = Pagination.getData(
    filteredServices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      {!isRoleUser && (
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h3>Liste des services En cours ou terminés </h3>
          {/*  <div className="col-lg-5">
            <div className="card">
              <div className="card-header">
                <Link to="/services/new" className="btn btn-primary">
                  Effectuer un service
                </Link>
              </div>
            </div>
          </div>
          */}
        </div>
      )}
      {!isRoleUser && (
        <div className="form-group">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="form-control"
            placeholder="Rechercher ..."
          />
        </div>
      )}
      <div className="card my -3">
        {isRoleUser && (
          <h1 className="card-header"> voici votre planning ! </h1>
        )}
      </div>

      {!isRoleUser && (
        <table className="tab table-hover">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Début service</th>
              <th>Fin service</th>
              <th>Description</th>
              <th>Etat service</th>
              {/*   <th>Latitude</th>
              <th>Logitude</th> */}
              <th></th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {paginatedServices.map((service) => (
                <tr key={service.id}>
                  <td>
                    {service.firstName} {service.lastName}
                  </td>

                  <td>{formatDate(service.dateStart)}</td>
                  <td>{service.description}</td>
                  <td>{service.dateEnd}</td>
                  <td>{service.actif}</td>
                  {/*  <td>{service.lat}</td>
                  <td>{service.lng}</td> */}
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(service.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}

      {isRoleUser && (
        <div>
          <ServicePage />
        </div>
      )}

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
