
import React,{ useState, useEffect} from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import SitesAPI from "../services/SitesAPI";
import ReportsAPI from "../services/ReportsAPI";
import { toast } from "react-toastify";
 

 const ReportPage = ({ history}) => {

    const [report, setReport] = useState({
        title: "COURANT",
        description: "" ,
        imageName: "",
        imageExtension: "",
        imageContent: "",     
        site: "" 
     });
    
    const [sites, setSites] = useState([]);
    const [errors, setErrors] = useState({
    title: "",
    description: "" ,
    imageName: ""  ,
    imageExtension: "",
    imageContent: "", 
    site: "" 
  });

  const fetchSites = async () => {
    try {
        setErrors({});
        const data =  await SitesAPI.findAll();
         setSites(data);
    } catch (error){
      toast.error("Erreur lors du chargement des sites");
    }
};

useEffect(() => {
  fetchSites();
}, [])

const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setReport({...report, [name]: value });
 };


 const handleSubmit =  async event => {
     event.preventDefault();

      const apiErros = {};
      if(!report.title) 
        apiErros.title = 
        "Le titre du rapport est obligatiore";
        if(!report.description) 
          apiErros.description = s
          "Le rapport doit avoir un minumum de description";
          if(!report.site) 
            apiErros.site = 
              "Le site  auquel est lié le rapport   est obligatiore";
              setErrors(apiErros);
       
        if(Object.keys(apiErros).length===0){          

          await ReportsAPI.create(report).then((data)=> {
         toast.success("Le rapport a bien été supprimé")
         history.replace("/rapports");
    }).catch((data)=>console.log(data));
      /*  const { violations } = response.data;

        if(violations) {
           
            violations.forEach(({propertyPath, message}) => {
                apiErros[propertyPath] = message;

                });

            setErrors(apiErros);
            toast.error("Des erreurs dans votre formulaire !");  */
          };
        
        }  

    return (
    <>
     <h1>Création d'un rapport</h1>
     <form onSubmit={handleSubmit}>

        <Select
        name="title" 
        placeholder="Titre du rapport"
        label="Titre" 
        onChange={handleChange} 
        value={report.title} 
        error={errors.title}
        > 
        <option value="COURANT">COURANT</option>
        <option value="INCIDENT">INCIDENT</option>
        
      </Select>
       <Field 
       name="description" 
       placeholder="Description du rapport" 
       label="Description" 
       onChange={handleChange} 
       value={report.description}  
       error={errors.description}
      />

       {/* <Field name="image"
        placeholder="Image" 
        label="Image" 
        type="file"
        onChange={handleChange} 
       value={report.image}  
       error={errors.image} />       */}

       <Select 
                name="site" 
               label="site" 
               value={report.site} 
               error={errors.site} 
               onChange={handleChange} 
                >
              {sites.map(site => (
               <option key={site.id} value={site.id}>
                   {site.name}
               </option>
                ))}
                
              </Select>

        <div className="form-group">
           <button type="submit" className="btn btn-success">
             Envoyer
          </button>
            <Link to="/rapports" className="btn btn-link">
             Retour aux rapports
         </Link>
         </div>
     </form>
    </>
    );
};


export default ReportPage
