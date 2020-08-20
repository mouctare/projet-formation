import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import SitesAPI from "../services/SitesAPI";
import { toast } from 'react-toastify';
import FormContentLoader from '../components/loaders/FormContentLoader';


 const SitePage = ({ history, match }) => {

    const { id = "new"} = match.params;

    const [site, setSite] = useState({
        name: "",
        streetNumber: "",
        streetName: "",
        buildingName: "",
        city: "",
        postCode: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        streetNumber: "",
        streetName: "",
        buildingName: "",
        city: "",
        postCode: ""
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] =  useState(false);

    const fetchSite = async id => {
        try {
             const { name, streetNumber, streetName, buildingName, city, postCode}  =  await SitesAPI.find(id);
              setSite({ name, streetNumber, streetName, buildingName, city, postCode });
              setLoading(false);
         } catch(error) {
            toast.error("Impossible de charger le site demandé ");
         history.replace("/sites");
        
        }
      };

    useEffect(() => {
        if(id !== "new") {
          setLoading(true);
          setEditing(true);
          fetchSite(id);
        }
   
      }, [id]);
      

    const handleChange = ({currentTarget}) => {
        
        const {name, value} = currentTarget;
        setSite({...site, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
           if(editing) {
                   await SitesAPI.update(id, site)
                   toast.success("Le site a  bien été modifié ");
                  history.replace("/sites");
              } else {
                  await SitesAPI.create(site)
                  toast.success("Le site a bien été crée");
               history.replace("/sites");
              }              
            setErrors({});
        }catch ({ response }) {
            
            const { violations } = response.data;
            
           if(violations) {
               const apiErros = {};
               violations.forEach(({propertyPath, message}) => {
                   apiErros[propertyPath] = message;
                   });
               setErrors(apiErros);
           toast.error("Erreur dans votre formulaire")
        }
    }
  };


    return (
        <>
         {(!editing && <h1>Création d'un site</h1>) || ( 
         <h1>Modification du site</h1> 
         )}
         {loading && <FormContentLoader />}
         {!loading && ( 
          <form onSubmit={handleSubmit}>
              <Field 
              name="name" 
              label="Nom" 
              placeholder="Nom du site"
              value={site.name}
              onChange={handleChange}
              error={errors.name}

            />
              <Field 
              name="streetNumber" 
              label="Numéro" 
              placeholder="Numéro de la rue"
              type="Number"
              value={site.streetNumber} 
              onChange={handleChange}
              error={errors.streetNumber}

              />
              <Field 
              name="streetName" 
              label="Nom" 
              placeholder="Nom de la rue" 
              value={site.streetName} 
              onChange={handleChange}
              error={errors.streetName}

              />
              <Field 
              name="buildingName" 
              label="Nom" 
              placeholder="Nom de batiment du site" 
              value={site.buildingName}
              onChange={handleChange}
              error={errors.buildingName}
              />
              <Field 
              name="city" 
              label="Ville" 
              placeholder="Nom de la ville du  site" 
              value={site.city}
              onChange={handleChange}
              error={errors.city}
              />
              <Field
               name="postCode" 
               label="Code postal" 
               placeholder="Code postal de la ville du site" 
               type="Number" 
               value={site.postCode}
               onChange={handleChange}
               error={errors.postCode}
               />

              <div className="forme-group">
                  <button type="submit" className="btn btn-success">Enregistrer</button>
                  <Link to="/sites" className="btn btn-link">Retour aux sites</Link>
              </div>
          </form>
          )}
        </>
    )
}

export default SitePage
