import React , {useState} from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


 const AvailabilitiePage = ({history})  => {

    const [availabilitie, setAvailabilitie] = useState({

        startDate: "",
        dateEnd: "",
        detail: ""
 });

 const [errors, setErrors] = useState({

    startDate: "",
    dateEnd: "",
    detail: ""
});

const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setAvailabilitie({...availabilitie, [name]: value });
 };

 const handleSubmit =  async event => {
     event.preventDefault();
     const apiErros = {};
     if(!availabilitie.startDate) 
        apiErros.startDate = 
        "La date de débit des indisponibilités de l'agent est obligatiore";
      if(!availabilitie.dateEnd) 
         apiErros.dateEnd = 
        "La date de fin  des indisponibilités de l'agent est obligatiore";
      if(!availabilitie.detail) 
        apiErros.detail = 
       "Les indinsponilités de l'agent doivent avoir un motif avec un minumum de detail";
      
      setErrors(apiErros);
        
     if(Object.keys(apiErros).length===0){
         await axios.post("http://localhost:8000/api/disponibilites", availabilitie).then((data)=> {
        toast.success("Vos indisponibilités ont bine été envoyé")
         history.replace("/disponibilites");
       }).catch((data)=>console.log(data));
     
      };
         
      }  
       /*  }catch ({ response }) {

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

 */
    return ( 
        <>
          <h1>Envoie des indisponibilités</h1> 

          <form onSubmit={handleSubmit}>
          <Field 
            name="startDate" 
             placelholder="Date de débit" 
             label="Débit" 
             type="date" 
             value={availabilitie.dateStart}
             onChange={handleChange}
             error={errors.startDate}
             />
             <Field 
             name="dateEnd" 
             placelholder="Date de fin" 
             label="Date de fin"
             type="date"  
             value={availabilitie.dateEnd} 
             onChange={handleChange}
              error={errors.dateEnd} 
              />
             <Field 
             name="detail" 
             placelholder="Detail des indisponibilités" 
             label="Detail" 
             value={availabilitie.detail} 
             onChange={handleChange}
              error={errors.detail} 
              />
              <div className="form-group">
                 <button type="submit" className="btn btn-success">
                 Envoyer
                </button>
                <Link to="/disponibilites" className="btn btn-link">
                    Retour aux indisponibilités
                </Link>
            </div>
          </form>
        </>
    )
}


export default AvailabilitiePage;
