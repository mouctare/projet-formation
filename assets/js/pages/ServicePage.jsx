import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import { formatDate } from "../services/FormatDateAPI";
import PlanningsAPI from "../services/PlanningsAPI";
import ServicesAPI from "../services/ServicesAPI";

const ServicePage = ({ history }) => {
  const [service, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [plannings, setPlannings] = useState([]);
  const [userConnecte, setUserConnecte] = useState("");
  const [nbPlanning, setNbPlanning] = useState("");

  const fetchPlannings = async () => {
    try {
      const data = await PlanningsAPI.findAll();
      let test = true;
      let serviceDatas = [];
      test &&
        data.map((item) => {
          setUserConnecte(item.user.lastName + " " + item.user.firstName);
          test = false;
          serviceDatas = [
            ...serviceDatas,
            {
              description: "",
              actif: false,
              planningId: item.id,
            },
          ];
        });

      let message = "";
      if (data.length > 1) {
        message = " voici votre liste de plannings";
      }
      if (data.length == 1) {
        message = " voici votre planning";
      }
      if (data.length == 0) {
        message = " vous n'avez aucun planning pour l'instant";
      }
      setNbPlanning(message);
      setPlannings(data);
      setServices(serviceDatas);

      setLoading(false);
      userConnecte = console.log("data mapping plannings servicePage ", data);
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

  const handleChange = ({ currentTarget }, id) => {
    const { name, value } = currentTarget;
    const target = service.find((element) => {
      return id === element.planningId;
    });
    const results = service.filter((element) => {
      return id != element.planningId;
    });
    setServices([
      ...results,
      {
        ...target,
        [name]: value,
      },
    ]);
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
    } catch (error) {}
  };

  let isVisible = false;

  const validateService = async (event, id, path) => {
    event.preventDefault();
    isVisible = true;
    console.log(" isVisible  = + = id ", isVisible + " " + id);
    const target = {
      ...service.find((element) => {
        return id === element.planningId;
      }),
      actif: true,
      planning: path,
    };

    try {
      await ServicesAPI.create(target)
        .then((data) => console.log("Try..", data))
        .catch((data) => console.log("Catch..", data));
      console.log("target", target);

      toast.success("La prise de service a bien été prise en compte");
      history.replace("/services");
    } catch (error) {}

    console.log(" service values from form priseServiceActive", service);
    try {
      // ServicesAPI.create(service)
      //   .then((data) => console.log("Try..", data))
      //   .catch((data) => console.log("Catch..", data));
    } catch (error) {
      toast.error("Des erreurs dans votre formulaire !");
    }
  };

  return (
    <>
      {
        <div className="card my -3">
          <h3 className="card-header">
            Bonjour Mr. {userConnecte} {nbPlanning}
          </h3>
        </div>
      }
      <>
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
            {plannings.map((pl, index) => {
              const { id, dateStart, dateEnd } = pl;
              console.log("id plannin", id);
              const data = service.find((element) => {
                return element.planningId === id;
              });
              return (
                <tr key={id}>
                  <td>{formatDate(dateStart)}</td>
                  <td>{formatDate(dateEnd)}</td>

                  <td>
                    <Field
                      className="service"
                      name="description"
                      placeholder="Description du rapport"
                      onChange={(event) => handleChange(event, id)}
                      value={service.description}
                    />
                    {/*   <div className="drink-form__input">
                      <input
                        type="text"
                        name="service"
                        onChange={handleChange}
                        className="input-services"
                        placeholder="Description du rapport"
                        value={service.description}
                      />
                    </div> */}
                  </td>
                  <td>
                    {priseService(pl.dateStart) && (
                      <button
                        className="btn btn-sm btn-primary mr-1 "
                        hidden={false}
                        onClick={(event) =>
                          validateService(event, pl.id, pl["@id"])
                        }
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
      </>
    </>
  );
};

export default ServicePage;
