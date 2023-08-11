export function searchCustomers(){
    if(!localStorage["customers"]){
        localStorage["customers"] = "[]";
    }
    let customers = localStorage["customers"];
    customers = JSON.parse(customers);
    return customers;
   
};
export function removeCostumer(id:string){
    let customers = searchCustomers();
    let indice = customers.findIndex((customer:any)=> customer.id == id);
    //elimino a partir de un indice 1 elemento.
    customers.splice(indice, 1);
    localStorage["customers"] = JSON.stringify(customers);
};  

export function saveCustomer(customer:any){
 
    let customers = searchCustomers();
    if(customer.id){
      let indice = customers.findIndex((c:any)=> c.id == customer.id);
      customers[indice] = customer;
    }
    else {
      customer.id = Math.round(Math.random()*10000000)
      customers.push(customer);
    }
    localStorage["customers"] = JSON.stringify(customers);
};

export function searchCustomerById(id:string){
  let customers = searchCustomers();
  let customer = customers.find((customer:any) => customer.id == id);
  return customer;
}