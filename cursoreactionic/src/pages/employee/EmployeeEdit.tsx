import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveEmployee, searchEmployeeById} from './EmployeeApi';
import Employee from './Employee';
import errorsValidator from './validations/errorsValidator';
import validator, { isFormValid } from './validations/validator';

const EmployeeEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>();
  const [employee, setEmployee] = useState<Employee>({
        firstname:"",
        lastname:"",
        email:"",
    });
  
  //Errors Handlers
  const [errors, setErrors] = useState<errorsValidator>({});
  
  const validate=(value:any)=>{
    const response = validator(value)
      setErrors({...errors, ...response })
  }
  
  const history = useHistory();  
  useEffect(()=>{
    search();
  },[id])
  
  const search = async ()=>{
    const ID = id;
    if(ID != "new"){ 
    let result = await  searchEmployeeById(ID);
     setEmployee(result)}
     else{    
        setEmployee({
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            address:"",
            salary:""
        })}
  }
  const save=async ()=>{
   await saveEmployee(employee);
   setEmployee({firstname:"",
    lastname:"",
    email:"",
    phone:"",  
    address:"",
    salary:""});
    history.push("/page/Employees")
};
const back = async ()=>{
  setEmployee({firstname:"",
   lastname:"",
   email:"",
   phone:"",  
   address:"",
   salary:""});

   setErrors({});
   history.push("/page/Employees")
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{fontWeight:"bolder", color:"darkslategray"}}>Empleados</IonTitle>
        
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonTitle>{id === "new"? "Agregar empleado":"Editar empleado"}</IonTitle>
            <IonRow>
                <IonCol>
                    <IonItem>
                      <IonInput label="First Name" labelPlacement="stacked" placeholder=""
                       onIonInput={e=>{validate(e);employee.firstname = String(e.detail.value)}} name="firstname" value={employee.firstname}></IonInput>
                       {!!errors.firstname?<span className='.errorSpanMessage'>{errors.firstname}</span>:null}
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Last Name" labelPlacement="stacked" placeholder="" 
                        onIonInput={e=>{validate(e);employee.lastname = String(e.detail.value)}} name="lastname" value={employee.lastname}></IonInput>
                        {!!errors.lastname?<span className='.errorSpanMessage'>{errors.lastname}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder=""
                        onIonInput={e=>{validate(e);employee.email = String(e.detail.value)}} name="email" value={employee.email}></IonInput>
                        {!!errors.email?<span className='.errorSpanMessage'>{errors.email}</span>:null}
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder=""
                         onIonInput={e=>{validate(e);employee.address = String(e.detail.value)}} name="address" value={employee.address}></IonInput>
                        {!!errors.address?<span className='.errorSpanMessage'>{errors.address}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder=""
                          onIonInput={e=>{validate(e);employee.phone = String(e.detail.value)}} name="phone" value={employee.phone}></IonInput>
                         {!!errors.phone?<span className='.errorSpanMessage'>{errors.phone}</span>:null}
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                         <IonInput label="Salario" labelPlacement="stacked" placeholder=""
                          onIonInput={e=>{validate(e);employee.salary = String(e.detail.value)}} name="salary" value={employee.salary}></IonInput>
                          {!!errors.salary?<span className='.errorSpanMessage'>{errors.salary}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>

        <IonItem>
        <IonButton onClick={back} color="secondary" fill='solid' slot="end" size="default">
            Volver
          </IonButton>
          <IonButton onClick={save} color="success" fill='solid' slot="end" size="default" disabled={!isFormValid(employee , errors)}>
          <IonIcon icon={checkmark}/>
            Guardar
          </IonButton>
        </IonItem>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeEdit;