import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeCostumer, saveCustomer, searchCustomers } from './CustomerApi';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<any>([]);
  const history = useHistory();
  
  useEffect(()=>{
    search();
  },[clientes])

  const search = ()=>{
    let result = searchCustomers();
    setClientes(result);
  }
  
  const remove = (id:string)=>{
    removeCostumer(id);
    search();
  };

  const addCostumer = ()=>{
    history.push("/page/Customers/new");
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
        <IonTitle>Gestión de Clientes</IonTitle>
        <IonItem>
          <IonButton color="primary" fill='solid' slot="end" size="default" onClick={addCostumer}>
          <IonIcon icon={add}/>
            Agregar Cliente
          </IonButton>
        </IonItem>
        <IonGrid className="table">
        <IonRow className="firstRow">
        <IonCol>Nombre</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Teléfono</IonCol>
          <IonCol>Dirección</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
      </IonGrid>
      {clientes.map((cliente:any )=>
           <IonGrid className="table" key={cliente.id}>
           <IonRow >
             <IonCol>{cliente.firstname +" "+ cliente.lastname} </IonCol>
             <IonCol>{cliente.email}</IonCol>
             <IonCol>{cliente.phone}</IonCol>
             <IonCol>{cliente.address}</IonCol>
             <IonCol>
               <IonButton  color="primary" fill="clear">
               <IonIcon icon={pencil} slot='icon-only' />
               </IonButton>
               <IonButton  color="danger" fill="clear"
               onClick={()=>remove(cliente.id)}>
               <IonIcon icon={close} slot='icon-only' />
               </IonButton>
             </IonCol>
           </IonRow>
         </IonGrid>
          )}
      </IonCard>
      <IonItem>
         <IonButton color="danger" fill='clear' slot="start" size="default" onClick={saveCustomer}>
            Agregar Cliente
          </IonButton>
          </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
