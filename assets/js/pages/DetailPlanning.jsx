import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import { formatDate } from "../services/FormatDateAPI";
import PlanningsAPI from "../services/PlanningsAPI";
import ServicesAPI from "../services/ServicesAPI";
import { Link } from "react-router-dom";

const ServicePage = ({ history, match }) => {
  const { id } = match.params;
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [userConnecte, setUserConnecte] = useState("");
  const [nbPlanning, setNbPlanning] = useState("");

  const fetchServices = async (id) => {
    console.log("id: " + id);
    try {
      const data = await ServicesAPI.findPlanningService(id);
      setServices(data);
      console.log("detail planning");
      // setLoading(false);
    } catch (error) {
      toast.error("Les services n'ont  pas pu étre chargés");
      // history.replace("/plannings");
    }

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

    setLoading(false);
  };

  useEffect(() => {
    fetchServices(id);
  }, [id]);

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

  let isVisible = false;

  /**
   * Effectuer la prise de service éffective
   */

  const validateService = async (event, id, path) => {
    event.preventDefault();
    isVisible = true;
    //console.log(" isVisible  = + = id ", isVisible + " " + id);
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
      // console.log("target", target);

      toast.success("La prise de service a bien été prise en compte");
      history.replace("/services");
    } catch (error) {
      console.log(" service values from form priseServiceActive", service);
    }
  };

  return (
    <>
      {
        <div className="mb-5 d-flex justify-content-between align-items-center"></div>
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
            {services.map((service) => {
              return (
                <tr key={id}>
                  <td>{formatDate(service.actif)}</td>
                  <td>{formatDate(service.description)}</td>
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
