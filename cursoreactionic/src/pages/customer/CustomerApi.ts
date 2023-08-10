export function searchCustomers(){
    if(!localStorage["customers"]){
        localStorage["customers"] = "[]";
    }
    let customers = localStorage["customers"];
    customers = JSON.parse(customers);
    return customers;
    /*const datosDeEjemplo = [
        {
          id:"1",
          firstname:"Juan",
          lastname:"Perez",
          email:"juanperez@mail.com",
          phone:"123456123",
          address:"Avenida siempre viva 123"
        },
        {
          id:"2",
          firstname:"Jorge",
          lastname:"Tanata",
          email:"jorgetanata@mail.com",
          phone:"123456123",
          address:"Avenida nunca muerta 123"
        }
      ];*/
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
    //customers.push(customer);
    customers.push(        {
        id:"1",
        firstname:"Juan",
        lastname:"Perez",
        email:"juanperez@mail.com",
        phone:"123456123",
        address:"Avenida siempre viva 123"
      })
    localStorage["customers"] = JSON.stringify(customers);
};
