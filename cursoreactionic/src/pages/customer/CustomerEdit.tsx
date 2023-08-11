import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, checkmark, close, pencil, save } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveCustomer, searchCustomerById, searchCustomers } from './CustomerApi';

const CustomerEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>();
  const [customer, setCustomer] = useState<any>({});
  const history = useHistory();  
  useEffect(()=>{
    search();
  },[])
  const search = ()=>{
    if(id != "new"){ 
    let result = searchCustomerById(id);
    setCustomer(result)}
  }
  const save=()=>{
    saveCustomer(customer)
    setCustomer({});
    history.push("/page/Customers")
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
                      onIonChange={e=>{customer.firstname = e.detail.value}} value={customer.firstname}></IonInput>
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Last Name" labelPlacement="stacked" placeholder="Enter text" 
                       onIonChange={e=>{customer.lastname = e.detail.value}} value={customer.lastname}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder="Enter text"
                       onIonChange={e=>{customer.email = e.detail.value}} value={customer.email}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e=>{customer.address = e.detail.value}} value={customer.address}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder="Enter text"
                         onIonChange={e=>{customer.phone = e.detail.value}} value={customer.phone}></IonInput>
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