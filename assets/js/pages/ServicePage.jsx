import React, { useState, useEffect } from "react";
import ServicesAPI from "../services/ServicesAPI";
import PlanningsAPI from "../services/PlanningsAPI";
import { toast } from "react-toastify";
import { Form, FormLabel } from "react-bootstrap";
import { formatDate } from "../services/FormatDateAPI";

const ServicePage = ({ history }) => {
  const [service, setServices] = useState({
    startDate: "",
    typeService: "PRISE DE SERVICE",
    description: "",
    lat: "",
    lng: "",
  });

  const [loading, setLoading] = useState(true);
  const [plannings, setPlannings] = useState([]);

  const [errors, setErrors] = useState({
    startDate: "",
    typeService: "",
    description: "",
    lat: "",
    lng: "",
  });

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
    const apiErros = {};
    if (!service.startDate)
      apiErros.startDate = "La date de débit de service  est obligatiore";
    if (!service.typeService)
      apiErros.typeService = "Le type service de service  est obligatiore";
    if (!service.description)
      apiErros.description =
        "Le type se service   doit avoir  un minumum de detail";

    setErrors(apiErros);

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
  return (
    <>
      <h1>Effectuer un service</h1>
      <form onSubmit={handleSubmit}>
        {plannings.map((pl) => {
          return (
            <>
              {/*   // quand ya plusieurs div mettrer un retur */}
              <label> {formatDate(pl.dateStart)} </label>;
              <label> {pl.id} </label>;
              {priseService(pl.dateStart) && (
                <div className="form-group">
                  <button className="submit btn btn-success">
                    valider votre prise de service
                  </button>
                </div>
              )}
            </>
          );
        })}
      </form>
      <Form.Label htmlFor="inlineFormInputName" srOnly>
        Name
      </Form.Label>
    </>
  );
};

export default ServicePage;
