import Customer from "./Customer";
const url = import.meta.env.VITE_REACT_APP_API + "customers";



export async function searchCustomers(){
  let response = await fetch(url,{
    "method":"GET",
    "headers":{
      "Content-Type":"application/json"
      }
  });
    return await response.json();
    /* //Modo LocalStorage
    if(!localStorage["customers"]){
        localStorage["customers"] = "[]";
    }
    let customers = localStorage["customers"];
    customers = JSON.parse(customers);
    return customers;*/
};




export async function removeCostumer(id:string){
    
  let response = await fetch(`${url}/${id}`,{
    "method":"DELETE",
    "headers":{
      "Content-Type":"application/json"
      }
  });

  /* Remove del local Storage
    let customers =await searchCustomers();
    let indice = customers.findIndex((customer: Customer)=> customer.id == id);
    //elimino a partir de un indice 1 elemento
    customers.splice(indice, 1);
    localStorage["customers"] = JSON.stringify(customers);*/
};  

export async function saveCustomer(customer: Customer){
  
  let response = await fetch(url,{
    "method":"POST",
    "body":JSON.stringify(customer),
    "headers":{
      "Content-Type":"application/json"
      }
  });
  /* //Con LocalStorage
    let customers = await searchCustomers();
    if(customer.id){
      let indice = customers.findIndex((c: Customer)=> c.id == customer.id);
      customers[indice] = customer;
    }
    else {
      customer.id = String(Math.round(Math.random()*10000000));
      customers.push(customer);
    }
    localStorage["customers"] = JSON.stringify(customers);*/
};

export async  function  searchCustomerById(id:string){
 
  let response = await fetch(`${url}/${id}`,{
    "method":"GET",
    "headers":{
      "Content-Type":"application/json"
      }
  });
    return await response.json();
  /*let customers =await searchCustomers();
  let customer =  customers.find((customer:Customer) => customer.id == id);*/
}