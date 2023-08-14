import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveEmployee, searchEmployeeById} from './EmployeeApi';
import Employee from './Employee';

const EmployeeEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>();
  const [employee, setEmployee] = useState<Employee>({
        firstname:"",
        lastname:"",
        email:"",
    });
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
            salary:0
        })}
  }
  const save=async ()=>{
   await saveEmployee(employee)
    history.push("/page/Employees")
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          Gestionar Empleados
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
                      onIonChange={e=>{employee.firstname = String(e.detail.value)}} value={employee.firstname}></IonInput>
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Last Name" labelPlacement="stacked" placeholder="" 
                       onIonChange={e=>{employee.lastname = String(e.detail.value)}} value={employee.lastname}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder=""
                       onIonChange={e=>{employee.email = String(e.detail.value)}} value={employee.email}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder=""
                        onIonChange={e=>{employee.address = String(e.detail.value)}} value={employee.address}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder=""
                         onIonChange={e=>{employee.phone = String(e.detail.value)}} value={employee.phone}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                         <IonInput label="Salario" labelPlacement="stacked" placeholder=""
                         onIonChange={e=>{employee.salary = Number(e.detail.value)}} value={employee.salary}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>

        <IonItem>
          <IonButton onClick={save} color="success" fill='solid' slot="end" size="default">
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