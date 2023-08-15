import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams} from 'react-router';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveCustomer, searchCustomerById} from './CustomerApi';
import Customer from './Customer';

const CustomerEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>(); 

  const [customer, setCustomer] = useState<Customer>({
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
    let result = await searchCustomerById(ID);
     setCustomer(result)}
     else{    
        setCustomer({
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            address:""
        })}
  }
  const save = async ()=>{
   await saveCustomer(customer)
    history.push("/page/Customers")
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{fontWeight:"bolder", color:"darkslategray"}}>Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonTitle>{id=== "new"? "Agregar cliente":"Editar cliente"}</IonTitle>
            <IonRow>
                <IonCol>
                    <IonItem>
                      <IonInput label="First Name" labelPlacement="stacked" placeholder=""
                      onIonChange={e=>{customer.firstname = String(e.detail.value)}} value={customer.firstname}></IonInput>
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Last Name" labelPlacement="stacked" placeholder="" 
                       onIonChange={e=>{customer.lastname = String(e.detail.value)}} value={customer.lastname}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder=""
                       onIonChange={e=>{customer.email = String(e.detail.value)}} value={customer.email}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder=""
                        onIonChange={e=>{customer.address = String(e.detail.value)}} value={customer.address}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder=""
                         onIonChange={e=>{customer.phone = String(e.detail.value)}} value={customer.phone}></IonInput>
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

export default CustomerEdit;