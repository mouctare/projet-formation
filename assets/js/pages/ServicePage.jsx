import React, { useState, useEffect } from "react";
import ServicesAPI from "../services/ServicesAPI";
import PlanningsAPI from "../services/PlanningsAPI";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import { Form, FormLabel } from "react-bootstrap";
import { formatDate } from "../services/FormatDateAPI";

const ServicePage = ({ history }) => {
  const [service, setServices] = useState({
    description: "",
    actif: false,
    planningId: "",
  });

  const [loading, setLoading] = useState(true);
  const [plannings, setPlannings] = useState([]);

  const fetchPlannings = async () => {
    try {
      const data = await PlanningsAPI.findAll();
      setPlannings(data);
      setLoading(false);
      //console.log("data mapping plannings servicePage ", data);
    } catch (error) {
      toast.error("Imposssible de charger les plannings");
    }
  };

  useEffect(() => {
    fetchPlannings();
  }, []);

  const priseService = (dateStart) => {
    return true;
    return (
      new Date(dateStart).toISOString().slice(0, 19) >
      new Date(Date.now()).toISOString().slice(0, 19)
    );
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setServices({ ...service, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    service.actif = true;
    console.log(" service values from form", service);
    try {
      await ServicesAPI.create(service)
        .then((data) => console.log("Try..", data))
        .catch((data) => console.log("Catch..", data));

      toast.success("La prise de service a bien été prise en compte");
      history.replace("/services");
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        violations.forEach(({ propertyPath, message }) => {
          apiErros[propertyPath] = message;
        });
        setErrors(apiErros);
        toast.error("Des erreurs dans votre formulaire !");
      }
    }
  };

  let isVisible = false;

  const priseServiceActive = (id) => {
    isVisible = true;
    console.log(" isVisible  = + = id ", isVisible + " " + id);
    service.actif = true;
    service.planningId = id;
    console.log(" service values from form priseServiceActive", service);
    try {
      ServicesAPI.create(service)
        .then((data) => console.log("Try..", data))
        .catch((data) => console.log("Catch..", data));
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        violations.forEach(({ propertyPath, message }) => {
          apiErros[propertyPath] = message;
        });
        setErrors(apiErros);
        toast.error("Des erreurs dans votre formulaire !");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Date de début de service</th>
              <th scope="col">Date de fin de service</th>
              <th scope="col"> Action prise de service</th>
              <th scope="col"> Description</th>
            </tr>
          </thead>
          <tbody>
            {plannings.map((pl) => {
              const { id, dateStart, dateEnd } = pl;

              return (
                <tr key={id}>
                  <td>{formatDate(dateStart)}</td>
                  <td>{formatDate(dateEnd)}</td>

                  <td>
                    <Field
                      className="service"
                      name="description"
                      placeholder="Description du rapport"
                      onChange={handleChange}
                      value={service.description}
                    />
                    {/*  <div class="drink-form__input">
                      <input
                        type="text"
                        name="service"
                        onChange={handleChange}
                        class="input-services"
                        placeholder="Description du rapport"
                        value={service.description}
                      />
                    </div> */}
                  </td>
                  <td>
                    {priseService(pl.dateStart) && (
                      <button
                        className="btn btn-sm btn-primary mr-1 "
                        hidden={isVisible}
                        onClick={priseServiceActive(pl.id)}
                      >
                        effectuer votre prise de service
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </>
  );
};

export default ServicePage;
