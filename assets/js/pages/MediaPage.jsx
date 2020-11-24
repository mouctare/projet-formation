/* import React, {Fragment, useState} from 'react';
import axios from "axios";
import { Component } from 'react';


class  MediaPage extends Component {
constructor(props){
    super(props);
    this.state = {
        image: ''
    }
}
  onChange = e => {
 
   
    let files = e.target.files;
    let reader =  new FileReader();
    reader.readAsDataURL(files[0]);
    
    reader.onload=(e) =>{
        const url = "http://localhost:8000/api/media";
        const formData = {file: e.target.result}
        return(url, formData)
        .then(response =>console.log("result", response))
    }
   
}
render() {
    return (
        <Fragment>
          <form onSubmit={this.onFormSubmit}>
        <div className="custom-file mb-4">
        <input type="file" name="file" onChange={(e) => this.onChange(e)}/>
        <label className="custom-file-label" htmlFor="customFile" >
            Choisire une image</label>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"  />
        </form>  
       </Fragment>
    );
}
};

export default MediaPage; */