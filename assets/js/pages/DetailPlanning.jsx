import React, { useEffect, useState } from "react";
import PlanningsAPI from "../services/PlanningsAPI";
import { toast } from "react-toastify";

const DetailPlanning = () => {
  const [plannings, setPlannings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlanning = async (id) => {
    try {
      await findPlanningServices(id);
      setPlannings(data);
      console.log("***" data);
      // setLoading(false);
    } catch (error) {
      toast.error("Les details du  planning n'ont  pas pu étre chargé");
      // history.replace("/plannings");
    }
  };

  useEffect(() => {
    //setEditing(true);
    fetchPlanning(id);
  }, [id]);
  return <div></div>;
};

export default DetailPlanning;
