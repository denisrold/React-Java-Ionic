import customer from "../Customer";
import errorsValidator from './errorsValidator';
type ErrorMessage = {
    [key: string]: string;
  };
  
 export const  validator=(value:any)=>{
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
        return { [name]: "email@email.com" };
      } else {
        return { [name]: "" };
      }
    }
    else if (values && name === "phone") {
      const phoneRegex = /^[0-9]+$/;
      const maxLength = 20;
      const minLength = 5;
      if (!phoneRegex.test(values)) {
        return { [name]: "Solo números" };}
      else if(values.length <= minLength ){return {[name]:"Más de 5 numeros"}}
      else if(values.length > maxLength){
          return {[name]: "No más de 20 números"}}
      else {
        return { [name]: "" };}
    }
    else if (values && (name === "firstname" || name === "lastname")) {
      const capitalLetterRegex =  /^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/;
      const maxLength = 20;
      const lettersRegex= /^[a-zA-Z\s]+$/;

      if (!capitalLetterRegex.test(values)) {
        return { [name]: "Primer letra en mayúscula" };
      } 
      else if(!lettersRegex.test(values)){
        return { [name]: "Solo letras" };
      }
      else if(values.length > maxLength){
        return {[name]: "No más de 20 letras"}}
      else {
        return {  [name]: "" };
      }
    }
    else if (values && name === "address") {
      const maxLength = 40;
      const minLength = 5;
    if(values.length > maxLength){
        return {[name]: "No más de 20 letras"}}
    
    else if(values.length <= minLength ){return {[name]:"No es una dirección válida"}}
    else{return{[name]:""}}
    }

    else{
      return{ [name]: ""};
    }
   
  }

  export const isFormValid = (customer:customer, errors:errorsValidator) => {
    return (
      !!customer.firstname &&
      !!customer.lastname &&
      !!customer.email &&
      !!customer.phone &&
      !!customer.address &&
      !errors.address &&
      !errors.email &&
      !errors.firstname&&
      !errors.lastname &&
      !errors.phone 
    )}

  export default validator;
