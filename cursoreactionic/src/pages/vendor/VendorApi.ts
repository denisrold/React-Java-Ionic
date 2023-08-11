import Vendor from "./Vendor";

export function searchVendors(){
    if(!localStorage["vendors"]){
        localStorage["vendors"] = "[]";
    }
    let vendors = localStorage["vendors"];
    vendors = JSON.parse(vendors);
    return vendors;
   
};
export function removeCostumer(id:string){
    let vendors = searchVendors();
    let indice = vendors.findIndex((vendor: Vendor)=> vendor.id == id);
    //elimino a partir de un indice 1 elemento
    vendors.splice(indice, 1);
    localStorage["vendors"] = JSON.stringify(vendors);
};  

export function saveVendor(vendor: Vendor){
 
    let vendors = searchVendors();
    if(vendor.id){
      let indice = vendors.findIndex((c: Vendor)=> c.id == vendor.id);
      vendors[indice] = vendor;
    }
    else {
      vendor.id = String(Math.round(Math.random()*10000000));
      vendors.push(vendor);
    }
    localStorage["vendors"] = JSON.stringify(vendors);
};

export  function  searchVendorById(id:string){
  let vendors =  searchVendors();
  let vendor =  vendors.find((vendor:Vendor) => vendor.id == id);
  return vendor;
}