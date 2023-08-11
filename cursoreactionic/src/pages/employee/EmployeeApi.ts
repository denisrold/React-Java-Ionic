import Employee from "./Employee";

export function searchEmployees(){
    if(!localStorage["employees"]){
        localStorage["employees"] = "[]";
    }
    let employees = localStorage["employees"];
    employees = JSON.parse(employees);
    return employees;
   
};
export function removeCostumer(id:string){
    let employees = searchEmployees();
    let indice = employees.findIndex((employee: Employee)=> employee.id == id);
    //elimino a partir de un indice 1 elemento
    employees.splice(indice, 1);
    localStorage["employees"] = JSON.stringify(employees);
};  

export function saveEmployee(employee: Employee){
 
    let employees = searchEmployees();
    if(employee.id){
      let indice = employees.findIndex((c: Employee)=> c.id == employee.id);
      employees[indice] = employee;
    }
    else {
      employee.id = String(Math.round(Math.random()*10000000));
      employees.push(employee);
    }
    localStorage["employees"] = JSON.stringify(employees);
};

export  function  searchEmployeeById(id:string){
  let employees =  searchEmployees();
  let employee =  employees.find((employee:Employee) => employee.id == id);
  return employee;
}