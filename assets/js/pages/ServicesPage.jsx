import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import Pagination from "../components/Pagination";
import { formatDate } from "../services/FormatDateAPI";
import ServicesAPI from "../services/ServicesAPI";
import ServicePage from "./ServicePage";

const STATUS_CLASSES = {
  ENCOURS: "success",
  TERMINE: "primary",
  ABSCEND: "danger",
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRoleUser, setisRoleUser] = useState(false);
  const [plannings, setPlannings] = useState([]);

  const itemsPerPage = 10;

  const fetchServices = async () => {
    try {
      await ServicesAPI.findAll().then((data) => {
        const roles = JSON.parse(window.localStorage.getItem("UserRole"));
        setisRoleUser(roles?.user);
        console.log("data from service", data);
        let colorCell = "fontServStart";
        data.map((item) => {
          if (item.actif == true) {
            item.actif = "cours";
            colorCell = "fontServStart";
          } else {
            item.actif = "terminé";
            colorCell = "fontServEnd";
          }

          item.fontCellActif = colorCell;
          item.dateEnd = item.planning.dateEnd;
          item.dateStart = item.planning.dateStart;
        });
        setServices(data);
        setLoading(false);
        console.log(" Nouvelle list   obj = data", data);
      });
    } catch (error) {
      toast.error("Un erreur est survenue veuillez réessayer");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const originalServices = [...services];
    try {
      await ServicesAPI.delete(id);
      setServices(services.filter((service) => service.id !== id));
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

      {!isRoleUser && (
        <table className="tab table-hover">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Début service</th>
              <th>Fin service</th>
              <th>Description</th>
              <th>Etat service</th>
              <th>crétion service</th>
              <th>date actuelle</th>
              <th>Retard / Heures sup </th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {paginatedServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.user?.firstName + service.user?.lastName}</td>
                  <td>{formatDate(service.dateStart)}</td>
                  <td>{formatDate(service.dateEnd)}</td>
                  <td>{service.description}</td>
                  <td className={service.fontCellActif}>{service.actif}</td>
                  <td>{formatDate(service.createdAt)}</td>
                  <td>{formatDate(service.dateFin)}</td>
                  <td>{service.retard}</td>
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
