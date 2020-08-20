
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import ServicesAPI from "../services/ServicesAPI";
import { toast } from "react-toastify";

 const ServicePage = ({history}) => {

    const [service, setServices] = useState({

        startDate: "",
       typeService: "PRISE DE SERVICE",
        description: "",
        lat: "",
        lng: ""
        
 });

 const [errors, setErrors] = useState({

    startDate: "",
   typeService: "",
    description: "",
    lat: "",
    lng: ""
});

const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setServices({...service, [name]: value });
 };

 
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErros = {};
        if(!service.startDate) 
           apiErros.startDate = 
           "La date de débit de service  est obligatiore";
         if(!service.typeService)
            apiErros.typeService = 
           "Le type service de service  est obligatiore";
         if(!service.description) 
           apiErros.description = 
          "Le type se service   doit avoir  un minumum de detail";
         
        setErrors(apiErros);
          
       try {
          await ServicesAPI.create(service).then((data)=> console.log("Try..",data)).catch((data)=> console.log("Catch..",data));
          
         toast.success("La prise de service a bien été prise en compte")
         history.replace("/services");
         }catch ({ response }) {
         const { violations } = response.data;
         if(violations) {
           violations.forEach(({propertyPath, message}) => {
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
         <form  onSubmit={handleSubmit}> 

        <Field 
        name="startDate" 
       placeholder="Date de débit de service" 
       label="Débit" 
       type="date" 
       onChange={handleChange} 
       value={service.startDate}  
       error={errors.startDate}
      />
        <Select 
       name="typeService" 
       placeholder="Type de service" 
       label=" Service" 
       onChange={handleChange} 
       value={service.typeService}  
       error={errors.typeService}
      >
    
        <option value="PRISE DE SERVICE">PRISE DE SERVICE</option>
        <option value="FIN DE SERVICE">FIN DE SERVICE</option>
        
        </Select>
        <Field 
       name="description" 
       placeholder="Description du service" 
       label="Description" 
       onChange={handleChange} 
       value={service.description}  
       error={errors.description}
      />
      <Field 
       name="lat" 
       placeholder="Latitude du site" 
       label="Latitude" 
       onChange={handleChange} 
       value={service.lat}  
       error={errors.lat}
      />
       <Field 
       name="lng" 
       placeholder="Longitude du site" 
       label="Longitude" 
       onChange={handleChange} 
       value={service.lng}  
       error={errors.lng}
      />
      <div className="form-group">
        <button className="submit btn btn-success">
          Envoyer
      </button>
      <Link to="/services" 
      className="btn btn-link">
          Retour aux services
      </Link>
      </div>
     </form> 
     </>
    )
}



export default ServicePage
