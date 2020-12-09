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
        if (
          (item.services.length > 0 && !item.services[0].actif) ||
          item.services.length == 0
        ) {
          data.push(item);
        }
      });

      let test = true;
      let serviceDatas = [];
      test &&
        data.map((item) => {
          setUserConnecte(item.user.lastName + " " + item.user.firstName);
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

  const priseServiceActive = (dateStart) => {
    return (
      new Date(dateStart).toISOString().slice(0, 19) >
      new Date(Date.now()).toISOString().slice(0, 19)
    );
  };

  /*
  const finService = (dateEnd) => {
    return (
      new Date(dateEnd).toISOString().slice(0, 19) ===
      new Date(Date.now()).toISOString().slice(0, 19)
    );
  }; */

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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Date de début de service</th>
              <th scope="col">Date de fin de service</th>
              <th scope="col"> Action prise de service</th>
            </tr>
          </thead>
          <tbody>
            {plannings.map((pl) => {
              const { id, dateStart, dateEnd, site } = pl;
              const data = service.find((element) => {
                console.log("data", element);
                return element.planningId === id;
              });

              return (
                <tr key={id}>
                  <td>{formatDate(dateStart)}</td>
                  <td>{formatDate(dateEnd)}</td>
                  <td>{site.name}</td>

                  {!priseServiceActive(dateStart) && (
                    <td>
                      <Link
                        to={"/planning/" + id + "/services"}
                        className="btn btn-sm btn-primary mr-1"
                        // hidden={planning.services.length > 0}
                      >
                        cliquer ici pour prendre votre service
                      </Link>
                    </td>
                  )}
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
