import Supplier from "./Supplier";
const url = import.meta.env.VITE_REACT_APP_API + "suppliers";

export async function searchSuppliers(){
  let response = await fetch(url,{
    "method":"GET",
    "headers":{
      "Content-Type":"application/json"
      }
  });
    return await response.json();
};
export async function removeSupplier(id:string){
  let response = await fetch(`${url}/${id}`,{
    "method":"DELETE",
    "headers":{
      "Content-Type":"application/json"
      }
  });
};  

export async function saveSupplier(supplier: Supplier){
  let response = await fetch(url,{
    "method":"POST",
    "body":JSON.stringify(supplier),
    "headers":{
      "Content-Type":"application/json"
      }
  });
};

export async function  searchSupplierById(id:string){
  let response = await fetch(`${url}/${id}`,{
    "method":"GET",
    "headers":{
      "Content-Type":"application/json"
      }
  });
    return await response.json();
}