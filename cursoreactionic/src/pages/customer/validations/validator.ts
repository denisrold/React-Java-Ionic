
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
    else if (values && name === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(values)) {
        return { [name]: "ej: email@email.com" };
      } else {
        return { [name]: "" };
      }
    }
    else if (values && name === "phone") {
      const phoneRegex = /^[0-9]+$/;
      const maxLength = 20;
      if (!phoneRegex.test(values)) {
        return { [name]: "Ingrese solo números" };}
      else if(values.length > maxLength){
          return {[name]: "No debe tener más de 20 letras"}}
      else {
        return { [name]: "" };
      }
    }
    else if (values && (name === "firstname" || name === "lastname")) {
      const capitalLetterRegex = /^[A-Z]/;
      const maxLength = 20;

      if (!capitalLetterRegex.test(values)) {
        return { [name]: "La primera letra debe ser mayúscula" };
      } 
      else if(values.length > maxLength){
        return {[name]: "No debe tener más de 20 letras"}}
      else {
        return {  [name]: "" };
      }
    }
    else if (values && name === "address") {
      const maxLength = 40;
    if(values.length > maxLength){
        return {[name]: "No debe tener más de 20 letras"}}
    }
    else {
      return{ [name]: "" };
    }
   
  }

  export default validator;
