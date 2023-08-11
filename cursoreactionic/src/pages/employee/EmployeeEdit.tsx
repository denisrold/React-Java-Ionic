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
  
  const search =  ()=>{
    const ID = id;
    if(ID != "new"){ 
    let result =  searchEmployeeById(ID);
     setEmployee(result)}
     else{    
        setEmployee({
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            address:""
        })}
  }
  const save=()=>{
    saveEmployee(employee)
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
          Titulos Cliente
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonTitle>{id === "new"? "Agregar cliente":"Editar cliente"}</IonTitle>
            <IonRow>
                <IonCol>
                    <IonItem>
                      <IonInput label="First Name" labelPlacement="stacked" placeholder="Enter text"
                      onIonChange={e=>{employee.firstname = String(e.detail.value)}} value={employee.firstname}></IonInput>
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Last Name" labelPlacement="stacked" placeholder="Enter text" 
                       onIonChange={e=>{employee.lastname = String(e.detail.value)}} value={employee.lastname}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder="Enter text"
                       onIonChange={e=>{employee.email = String(e.detail.value)}} value={employee.email}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e=>{employee.address = String(e.detail.value)}} value={employee.address}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder="Enter text"
                         onIonChange={e=>{employee.phone = String(e.detail.value)}} value={employee.phone}></IonInput>
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