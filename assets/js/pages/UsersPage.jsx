import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import Pagination from "../components/Pagination";
import UsersAPI from "../services/UsersAPI";

const UsersPage = (props) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRoleUser, setisRoleUser] = useState(false);
  const itemsPerPage = 10;

  // Permet d'aller récupérer les agents
  const fetchUsers = async () => {
    try {
      const data = await UsersAPI.findAll();
      const roles = JSON.parse(window.localStorage.getItem("UserRole"));
      setisRoleUser(roles?.user);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des agents !");
    }
  };
  // Au chargement du composant, on va chercher les agents
  useEffect(() => {
    fetchUsers();
  }, []);

  // Gestion de la suppréssion d'un agent
  const handleDelete = async (id) => {
    // Ceci est un mixe des deux approche pour la suppréssion
    const originalUsers = [...users];
    // 1. L'approche optimiste
    setUsers(users.filter((user) => user.id !== id));
    // 2. l'approche pessimiste
    try {
      await UsersAPI.delete(id);
      toast.success("L'agent a bien été supprimé");
    } catch (error) {
      toast.error("Une erreur est survenue");
      setUsers(originalUsers);
    }
  };

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  // Filtrage des agents en function de la recherche
  let filteredUsers;
  if (search === "") {
    filteredUsers = users;
  } else {
    filteredUsers = users.filter((u) =>
      u.firstName
        .toLowerCase()
        .includes(
          search.toLowerCase() ||
            u.lastName.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.cardPro.toLowerCase().includes(search.toLowerCase())
        )
    );
  }
  // Pagination des données
  const paginatedUsers = Pagination.getData(
    filteredUsers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1> Liste des agents</h1>
        {!isRoleUser && (
          <div className="col-lg-5">
            <div className="card">
              <div className="card-header">
                <Link to="/agents/new" className="btn btn-primary">
                  Créer un agent
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

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Agent</th>
            <th>Email</th>
            <th>Numéro carte pro</th>
            <th>Date delivration</th>
            <th>Date d'expiration</th>
            <th>Plannings</th>
          </tr>
        </thead>

        {!loading && (
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link to={"/agents/" + user.id}>
                    {user.firstName} {user.lastName}
                  </Link>
                </td>
                <td className="text-center">{user.email}</td>
                <td className="text-center"> {user.cardPro}</td>
                <td className="text-center">
                  {user.dateCreatedCarPro
                    .replace("T", " ")
                    .toString("DD/MM/YYYY HH:MM")
                    .slice(0, 16)}
                </td>
                <td className="text-center">
                  {user.expiryDateCardPro
                    .replace("T", " ")
                    .toString("DD/MM/YYYY HH:MM")
                    .slice(0, 16)}
                </td>
                <td className="text-center">{user.availabilities.length}</td>

                {!isRoleUser && (
                  <td>
                    <Link
                      to={"/agents/" + user.id}
                      className="btn btn-sm btn-primary mr-2"
                    >
                      &nbsp;&nbsp;&nbsp;Editer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={user.plannings.length > 0}
                      className="btn btn-sm btn-danger"
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

      {itemsPerPage < filteredUsers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredUsers.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  );
};

export default UsersPage;
