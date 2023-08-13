import Supplier from "./Supplier";

export function searchSuppliers(){
    if(!localStorage["suppliers"]){
        localStorage["suppliers"] = "[]";
    }
    let suppliers = localStorage["suppliers"];
    suppliers = JSON.parse(suppliers);
    return suppliers;
   
};
export function removeCostumer(id:string){
    let suppliers = searchSuppliers();
    let indice = suppliers.findIndex((supplier: Supplier)=> supplier.id == id);
    //elimino a partir de un indice 1 elemento
    suppliers.splice(indice, 1);
    localStorage["suppliers"] = JSON.stringify(suppliers);
};  

export function saveSupplier(supplier: Supplier){
 
    let suppliers = searchSuppliers();
    if(supplier.id){
      let indice = suppliers.findIndex((c: Supplier)=> c.id == supplier.id);
      suppliers[indice] = supplier;
    }
    else {
      supplier.id = String(Math.round(Math.random()*10000000));
      suppliers.push(supplier);
    }
    localStorage["suppliers"] = JSON.stringify(suppliers);
};

export  function  searchSupplierById(id:string){
  let suppliers =  searchSuppliers();
  let supplier =  suppliers.find((supplier:Supplier) => supplier.id == id);
  return supplier;
}