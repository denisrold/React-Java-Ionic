import Employee from "./Employee";
const url = import.meta.env.VITE_REACT_APP_API + "employees";

export async function searchEmployees(){
  let response = await fetch(url,{
    "method":"GET",
    "headers":{
      "Content-Type":"application/json"
      }
  });
    return await response.json();
};
export async function removeEmployee(id:string){
  let response = await fetch(`${url}/${id}`,{
    "method":"DELETE",
    "headers":{
      "Content-Type":"application/json"
      }
  });
};  

export async function saveEmployee(employee: Employee){
  let response = await fetch(url,{
    "method":"POST",
    "body":JSON.stringify(employee),
    "headers":{
      "Content-Type":"application/json"
      }
  });
};

export async function  searchEmployeeById(id:string){
  let response = await fetch(`${url}/${id}`,{
    "method":"GET",
    "headers":{
      "Content-Type":"application/json"
      }
  });
    return await response.json();
}