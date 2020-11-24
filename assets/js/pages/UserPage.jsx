import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import UsersAPI from "../services/UsersAPI";
import moment from "moment";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const UserPage = ({ match, history }) => {
  const { id = "new" } = match.params;

  const [user, setUser] = useState({
    email: "",
    roles: ["ROLE_USER"],
    password: "",
    firstName: "",
    lastName: "",
    cardPro: "",
    dateCreatedCarPro: "",
    expiryDateCardPro: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    cardPro: "",
    dateCreatedCarPro: "",
    expiryDateCardPro: "",
  });
  const [loading, setLoading] = useState(false);

  const formatDate = (str) => moment(str).format("YYYY-MM-DDTHH:mm");
  const [editing, setEditing] = useState(false);

  const fetchUser = async (id) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        roles,
        cardPro,
        dateCreatedCarPro,
        expiryDateCardPro,
      } = await UsersAPI.find(id);
      setUser({
        email,
        password,
        firstName,
        lastName,
        roles,
        cardPro,
        dateCreatedCarPro,
        expiryDateCardPro,
      });
      setLoading(false);
    } catch (error) {
      toast.error("Impossible de charger l'agent demandé agents");
      history.replace("/agents");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      setEditing(true);
      fetchUser(id);
    }
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErros = {};
    if (!user.email)
      apiErros.email = "L'adresse email de l'agent est obligatiore";
    if (!user.lastName) apiErros.lastName = "Le nom de l'agent est obligatoire";
    if (!user.password)
      apiErros.password = "Le mot de passe de l'agent est obligatiore";
    if (!user.firstName)
      apiErros.firstName = "Le prénom de l'agent est obligatoire";
    if (!user.cardPro || user.cardPro)
      apiErros.cardPro =
        "Le numéro de la carte professionnelle  de l'agent est obligatoire et elle doit avoir 25 caractères";

    if (!user.dateCreatedCarPro)
      apiErros.dateCreatedCarPro =
        "La date de création de la carte professionnelle  de l'agent est obligatoire";

    if (!user.expiryDateCardPro)
      apiErros.expiryDateCardPro =
        "La date de création de la carte professionnelle  de l'agent est obligatoire";

    setErrors(apiErros);

    if (editing) {
      if (Object.keys(apiErros).length === 0) {
        await UsersAPI.update(id, user)
          .then((data) => {
            //setErrors({});
            toast.success("Les informations de l'agent ont bien été modifié ");
            history.replace("/agents");
          })
          .catch((data) => {});
      }
    } else {
      if (Object.keys(apiErros).length === 0) {
        await UsersAPI.create(user)
          .then((data) => {
            toast.success("L'agent a bien été crée");
            history.replace("/agents");
          })
          .catch((data) => {});
      }
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'un agent</h1>) || (
        <h1> Modification d'un agent</h1>
      )}
      {loading && <FormContentLoader />}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <Field
            name="lastName"
            label="Nom de famille"
            placeholder="Nom de famille de l'agent"
            value={user.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <Field
            name="firstName"
            label="Prénom"
            placeholder="Prénom de l'agent"
            value={user.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Field
            name="email"
            label="Email"
            placeholder=" Adresse email de l'agent"
            type="email"
            value={user.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            name="password"
            label="Password"
            placeholder=" Mot de passe  l'agent"
            type="password"
            value={user.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Field
            name="cardPro"
            label="Carte professionnelle"
            placeholder="Numéro de carte professionnel de l'agent"
            value={user.cardPro}
            onChange={handleChange}
            error={errors.cardPro}
            required
          />

          <Field
            name="dateCreatedCarPro"
            label="Date"
            placeholder="Date de création de la carte professionnelle de l'agent"
            type="datetime-local"
            value={formatDate(user.dateCreatedCarPro)}
            onChange={handleChange}
            error={errors.dateCreatedCarPro}
          />
          <Field
            name="expiryDateCardPro"
            label="Expiration"
            placeholder="Date d'éxpiration de la carte professionnelle de l'agent"
            type="datetime-local"
            value={formatDate(user.expiryDateCardPro)}
            onChange={handleChange}
            error={errors.expiryDateCardPro}
          />
          <div className="form-group">
            <button className="submit btn btn-success">Enregistrer</button>
            <Link to="/agents" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default UserPage;
