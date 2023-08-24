
type ErrorMessage = {
    [key: string]: string;
  };
  
 const  validator=(value:any)=>{
    const values = value.detail.value;
    const name = value.detail.event.target.name;
    
    const message:ErrorMessage = {
      email:"Datos requeridos",
      firstname:"Datos requeridos",
      lastname:"Datos requeridos",
      phone:"Datos requeridos",
      address:"Datos requeridos"
    }

    if(!values){
      const errorMessage = message[name];
      return{ [name]: errorMessage }
    }

    else {
      return{ [name]: "" };
    }
   
  }

  export default validator;
