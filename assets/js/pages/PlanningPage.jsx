import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import PlanningsAPI from "../services/PlanningsAPI";
import SitesAPI from "../services/SitesAPI";
import UsersAPI from "../services/UsersAPI";
import moment from "moment";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const PlanningPage = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [planning, setPlanning] = useState({
    dateStart: "",
    dateEnd: "",
    user: "",
    site: "",
  });

  const [users, setUsers] = useState([]);
  const [sites, setSites] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    dateStart: "",
    dateEnd: "",
    user: "",
    site: "",
  });

  const formatDate = (str) => moment(str).format("YYYY-MM-DDTHH:mm");

  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await UsersAPI.findAll();
      setUsers(data);
      setLoading(false);
      //  if(!planning.user) setPlanning({...planning, user: data[0].id })
    } catch (error) {
      toast.error("Echec lors du chargement des agents");
      history.replace("/plannings");
    }
  };

  const fetchPlanning = async (id) => {
    try {
      const { dateStart, dateEnd, user, site } = await PlanningsAPI.find(id);
      setPlanning({ dateStart, dateEnd, user: user.id, site: site.id });
      setLoading(false);
    } catch (error) {
      toast.error("Le planning n'a pas pu étre chargé");
      history.replace("/plannings");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchPlanning(id);
    }
  }, [id]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchSites = async () => {
    try {
      const data = await SitesAPI.findAll();
      setSites(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des sites");
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setPlanning({ ...planning, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErros = {};
    if (!planning.dateStart)
      apiErros.dateStart =
        "La date de débit du planning  de l'agent est obligatiore";

    if (!planning.dateEnd)
      apiErros.dateEnd =
        "La date de fin du planning  de l'agent est obligatiore";

    if (!planning.user)
      apiErros.user = "L'agent à qui appartient  planning  est obligatiore";

    if (!planning.site)
      apiErros.site = "Le site lié au planning  de l'agent est obligatiore";

    setErrors(apiErros);
    if (editing) {
      if (Object.keys(apiErros).length === 0) {
        await PlanningsAPI.update(id, planning)
          .then((data) => {
            setErrors({});
            toast.success("Le planning a bien été modifié");
            history.replace("/plannings");
          })
          .catch((data) => console.log(data));
      }
    } else {
      if (Object.keys(apiErros).length === 0) {
        await PlanningsAPI.create(planning)
          .then((data) => {
            toast.success("Le planning a bien été crée");
            history.replace("/plannings");
          })
          .catch((data) => console.log(data));
      }
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'un planning</h1>) || (
        <h1> Modification d'un planning</h1>
      )}
      {loading && <FormContentLoader />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Field
            name="dateStart"
            placelholder="Date de débit"
            label="Veuillez choisir une date  de débit et une heure pour le planning "
            type="datetime-local"
            value={formatDate(planning.dateStart)}
            onChange={handleChange}
            error={errors.dateStart}
          />

          <Field
            name="dateEnd"
            placelholder="Date de fin"
            label="Veuillez choisir une date et une heure de fin  pour le planning "
            type="datetime-local"
            value={formatDate(planning.dateEnd)}
            onChange={handleChange}
            error={errors.dateEnd}
          />

          <Select
            name="user"
            label="agent"
            value={planning.user}
            error={errors.user}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </Select>
          <Select
            name="site"
            label="site"
            value={planning.site}
            error={errors.site}
            onChange={handleChange}
          >
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </Select>

          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/plannings" className="btn btn-link">
              Retour aux plannings
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default PlanningPage;
