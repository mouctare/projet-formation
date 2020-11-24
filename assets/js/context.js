/* import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "http://localhost:8000/api/plannings";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [pla, setPla] = useState([]);

  const fetchPlannings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/plannings");
      const data = await react.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPlannings();
  }, []);
  return (
    <AppContext.Provider
      value={{
        pla,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
 */
