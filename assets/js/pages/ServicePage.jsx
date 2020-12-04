import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import { formatDate } from "../services/FormatDateAPI";
import PlanningsAPI from "../services/PlanningsAPI";
import ServicesAPI from "../services/ServicesAPI";
import { Link } from "react-router-dom";

const ServicePage = ({ history }) => {
  const [service, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [plannings, setPlannings] = useState([]);
  const [userConnecte, setUserConnecte] = useState("");
  const [nbPlanning, setNbPlanning] = useState("");

  const fetchPlannings = async () => {
    try {
      const data1 = await PlanningsAPI.findAll();
      let data = [];
      data1.map((item) => {
        item.noteFinService = " box pour note fin de service";
        if (item.status != false) {
          data.push(item);
        }
      });
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
              noteFinService: "",
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
    } catch (error) {
      toast.error("Imposssible de charger les plannings");
    }
  };

  useEffect(() => {
    fetchPlannings();
  }, []);

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

  /**
   * Effectuer la prise de service éffective
   */
  const validateService = async (event, id, path) => {
    event.preventDefault();
    const target = {
      ...service.find((element) => {
        return id === element.planningId;
      }),
      actif: true,
      planning: path,
    };
    let planningUpdate = null;
    plannings.map((item) => {
      if ((item.id = id)) {
        planningUpdate = {
          status: true,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          user: item.user.id,
          site: item.site.id,
        };
      }
    });

    await ServicesAPI.create(target)
      .then((data) => console.log("Try..", data))
      .catch((data) => console.log("Catch..", data));
    //console.log("priseDeService planningUpdate MAJ ", planningUpdate);
    if (planningUpdate != null) {
      await PlanningsAPI.update(id, planningUpdate).catch((err) => {
        console.log("planning update error: ", err);
      });
      toast.success("La prise de service a bien été notié dans le planning");
    }
    history.replace("/services");
  };

  /*
action Fin de service
*/
  const validateFinService = async (event, id, path) => {
    event.preventDefault();
    const target = {
      ...service.find((element) => {
        return id === element.planningId;
      }),
      actif: true,
      planning: path,
    };
    let planningUpdate = null;
    plannings.map((item) => {
      if ((item.id = id)) {
        planningUpdate = {
          status: false,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          user: item.user.id,
          site: item.site.id,
        };
      }
    });
    try {
      //console.log("target.planningId..", target.planningId);
      await ServicesAPI.findPalanningService(target.planningId)
        .then((data) => {
          target.actif = false;
          ServicesAPI.update(data[0].id, target)
            .then((data) => console.log("Try..", data))
            .catch((err) => console.log("Catch..", err));
        })
        .catch((data) => console.log("Catch..", data));
      console.log("planningUpdate MAJ ", planningUpdate);
      // finaliser le service dans le planning : le status passe à False
      if (planningUpdate != null) {
        await PlanningsAPI.update(id, planningUpdate)
          .then(data)
          .catch((err) => {
            console.log("planning update error: ", err);
          });
        toast.success("La fin de service a bien été notié au chef");
      }
      history.replace("/services");
    } catch (error) {
      console.log(" service values from form priseServiceActive", service);
    }
  };

  return (
    <>
      {
        <div className="mb-5 d-flex justify-content-between align-items-center">
          <h3>
            Bonjour Mr. {userConnecte} {nbPlanning}
          </h3>
        </div>
      }
      <>
        <table className="table desc table-hover">
          <thead>
            <tr>
              <th scope="col">Date de début de service</th>
              <th scope="col">Date de fin de service</th>

              {plannings.map((pl) => {
                pl.status != true && pl.status != false && (
                  <th scope="col"> Note début service</th>
                );
              })}
              {plannings.map((pl) => {
                pl.status == true && <th scope="col"> Note Fin service </th>;
              })}
              <th scope="col"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {plannings.map((pl, index) => {
              const { id, dateStart, dateEnd } = pl;
              const data = service.find((element) => {
                return element.planningId === id;
              });
              return (
                <tr key={id}>
                  <td>{formatDate(dateStart)}</td>
                  <td>{formatDate(dateEnd)}</td>

                  {pl.status != true && pl.status != false && (
                    <td>
                      <Field
                        name="description"
                        placeholder="Description du rapport"
                        onChange={(event) => handleChange(event, id)}
                        value={service.description}
                      />
                    </td>
                  )}
                  {pl.status && (
                    <td>
                      <Field
                        name="noteFinService"
                        placeholder="noter remarques fin de service"
                        onChange={(event) => handleChange(event, id)}
                        value={service.noteFinService}
                      />
                    </td>
                  )}

                  <td>
                    {pl.status != true && pl.status != false && (
                      <button
                        className="btn btn-sm btn-primary mr-1 "
                        hidden={false}
                        onClick={(event) =>
                          validateService(event, id, pl["@id"])
                        }
                      >
                        Valider votre prise de service
                      </button>
                    )}
                    {pl.status && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={(event) =>
                          validateFinService(event, id, pl["@id"])
                        }
                      >
                        &nbsp; Valider votre fin de service&nbsp;&nbsp;
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
