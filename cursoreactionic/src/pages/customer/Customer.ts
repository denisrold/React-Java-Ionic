//Usamos interfaces para definir la estructura de Datos.
//datos de interfaces son obligatorios a usarse
export default interface customer {
id?:string;
firstname:string;
lastname:string;
email:string;
phone?:string; //Con el signo de pregunta no es obligatorio puede ser undefined 
address?:string;
};
