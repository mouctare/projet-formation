import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import { formatDate } from "../services/FormatDateAPI";
import PlanningsAPI from "../services/PlanningsAPI";
import ServicesAPI from "../services/ServicesAPI";

const ServicePage = ({ history, match }) => {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [planning, setPlanning] = useState([]);
  const [userConnecte, setUserConnecte] = useState("");
  const [sericeStarted, setSserviceStarteds] = useState(false);
  const [idService, setIdServices] = useState(null);
  const [service, setServices] = useState({});

  const fetchPlannings = async () => {
    try {
      const data = await PlanningsAPI.find(id);

      setUserConnecte(data.user.lastName + " " + data.user.firstName);
      data.siteId = data.site.id;
      setPlanning(data);
      setLoading(false);
    } catch (error) {
      toast.error("Imposssible de charger les plannings");
    }
  };

  useEffect(() => {
    fetchPlannings();
    fetchPlanningInServices();
  }, []);

  const fetchPlanningInServices = async () => {
    try {
      const data = await ServicesAPI.findPalanningService(id);

      if (data.length > 0) {
        setSserviceStarteds(true);
        console.log("dta du service  encours", data[0]);
        setIdServices(data[0].id);
      }
      setLoading(false);
    } catch (error) {
      toast.error(
        "Le planning  dans service n'apas pu étre chargé n'a pas pu étre chargé"
      );
    }
  };

  /**
   * Pour afficher le bouton de prise de service
   */

  /*  const priseService = (dateStart) => {
    return true;
    return (
      new Date(dateStart).toISOString().slice(0, 19) >
      new Date(Date.now()).toISOString().slice(0, 19)
    );
  };

  const finService = (dateEnd) => {
    return (
      new Date(dateEnd).toISOString().slice(0, 19) ===
      new Date(Date.now()).toISOString().slice(0, 19)
    );
  }; */

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setServices({ ...service, [name]: value });
  };

  /**
   * Effectuer la prise de service éffective
   */
  const validateService = async (event, id, idSite) => {
    event.preventDefault();
    service.actif = true;
    service.planningId = id;
    service.siteId = idSite;
    console.log(" service obj inserted ==> ", service);
    await ServicesAPI.create(service)
      .then((data) => console.log("Try..", data))
      .catch((err) => console.log("Catch..", err));
    toast.success("La prise de service a bien été prise en compte");
    history.replace("/plannings");
  };

  /*
action Fin de service
*/
  const validateFinService = async (event, id, idSite) => {
    event.preventDefault();
    service.actif = false;
    service.planningId = id;
    service.siteId = idSite;

    console.log(" fin de service vlider  &   ==> ", service);
    console.log(" fin de service vlider  &  idService ==> ", idService);
    if (idService != null) {
      await ServicesAPI.update(idService, service);
      console.log("service update", service);
    }
    toast.success("La fin prise de service a bien été prise en compte");
    history.replace("/plannings");
  };
  /*   service.actif = false;
    service.planningId = id;
    service.siteId = idSite;
    if (idService != null) {
      ServicesAPI.update(idService, service);
    }
    toast.success("La fin prise de service a bien été prise en compte");
    history.replace("/plannings");
  };
 */
  return (
    <>
      {
        <div className="mb-5 d-flex justify-content-between align-items-center">
          <h3>Bonjour Mr. {userConnecte}</h3>
        </div>
      }
      <>
        <table className="table desc table-hover">
          <thead>
            <tr>
              {!sericeStarted && <th scope="col"> Note début service</th>}
              {sericeStarted && <th scope="col"> Note Fin service </th>}
              <th scope="col"> Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {!sericeStarted && (
                <td>
                  <Field
                    name="description"
                    placeholder="Description du rapport"
                    onChange={handleChange}
                    value={service.description}
                  />
                </td>
              )}
              {sericeStarted && (
                <td>
                  <Field
                    name="noteFinService"
                    placeholder="Notes fin de service"
                    onChange={handleChange}
                    value={service.noteFinService}
                  />
                </td>
              )}

              <td>
                {!sericeStarted && (
                  <button
                    className="btn btn-sm btn-primary mr-1 "
                    hidden={false}
                    onClick={(event) =>
                      validateService(event, planning.id, planning.siteId)
                    }
                  >
                    Valider votre prise de service
                  </button>
                )}

                {sericeStarted && (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={(event) =>
                      validateFinService(event, planning.id, planning.siteId)
                    }
                  >
                    &nbsp; Valider votre fin de service&nbsp;&nbsp;
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </>
  );
};

export default ServicePage;
