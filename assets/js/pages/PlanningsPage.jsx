import React, { useEffect, useState } from "react";
import { formatDate } from "../services/FormatDateAPI";
import Pagination from "../components/Pagination";
import PlanningsAPI from "../services/PlanningsAPI";
import ServicesPage from "../pages/ServicesPage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const PlanningsPage = (props) => {
  const [plannings, setPlannings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRoleUser, setisRoleUser] = useState(false);

  const itemsPerPage = 10;

  const fetchPlannings = async () => {
    try {
      const data = await PlanningsAPI.findAll();
      const roles = JSON.parse(window.localStorage.getItem("UserRole"));
      setisRoleUser(roles?.user);
      setPlannings(data);
      setLoading(false);
    } catch (error) {
      toast.error("Une erreur est survenue veuillez réessayer");
    }
  };

  useEffect(() => {
    fetchPlannings();
  }, []);

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const originalPlannings = [...plannings];
    setPlannings(plannings.filter((planning) => planning.id !== id));

    try {
      await PlanningsAPI.delete(id);
      toast.success("Le planning a bien été supprimé");
    } catch (error) {
      toast.error("La suppression du planning a échoué");
      setPlannings(originalPlannings);
    }
  };

  let filteredPlannings;
  if (search === "") {
    filteredPlannings = plannings;
  } else {
    filteredPlannings = plannings.filter(
      (p) =>
        p.user.firstName
          .toLowerCase()
          .startsWith(
            search.toLowerCase() ||
              p.user.lastName.toLowerCase().startsWith(search.toLowerCase()) ||
              p.dateStart.toLowerCase().includes(search.toLowerCase()) ||
              p.dateEnd.toLowerCase().includes(search.toLowerCase())
          ) || p.site?.name.toLowerCase().includes(search.toLowerCase())
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
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des plannings</h1>
        {!isRoleUser && (
          <div className="col-lg-5">
            <div className="card">
              <div className="card-header">
                <Link className="btn btn-primary" to="/plannings/new">
                  Créer un planning
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="Rechercher ..."
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Site</th>
          </tr>
        </thead>

        {!loading && (
          <tbody>
            {paginatedPlannings.map((planning) => (
              <tr key={planning.id}>
                <td>
                  <Link to={"/plannings/" + planning.id}>
                    {planning.user.firstName} {planning.user.lastName}
                  </Link>
                </td>
                <td data-label="Date.Start">
                  {formatDate(planning.dateStart)}
                </td>
                <td data-label="Date">{formatDate(planning.dateEnd)}</td>
                <td data-label="Nom">
                  {" "}
                  {planning.site?.name} {planning.site?.city}
                </td>
                {!isRoleUser && (
                  <td>
                    {/*  <Link
                      to={"/services/" + service.id}
                      className="btn btn-sm btn-primary mr-1"
                    >
                      Detail service
                    </Link> */}
                    <Link
                      to={"/plannings/" + planning.id}
                      className="btn btn-sm btn-primary mr-2"
                      hidden={planning.services.length > 0}
                    >
                      Editer
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(planning.id)}
                      // hidden={planning.services.length > 0}
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
