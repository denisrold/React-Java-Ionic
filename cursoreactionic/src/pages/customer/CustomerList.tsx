import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, close, pencil, person } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeCostumer, searchCustomers } from './CustomerApi';
import Customer from './Customer';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();
  
  useEffect(()=>{
    search();
  },[history.location.pathname])

  const search = async ()=>{
    let result = await searchCustomers();
    setClientes(result);
  }

  const remove = async (id:string)=>{
    await removeCostumer(id);
    search();
  };

  const addCostumer = ()=>{
    history.push("/page/Customers/new");
  };
  const editCostumer = (id:string)=>{
    history.push("/page/Customers/"+id);
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
          <IonCol>Contacto</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
      </IonGrid>
      {clientes.map((cliente: Customer)=>
           <IonGrid className="table" key={cliente.id} >
           <IonRow >
             <IonCol>{cliente.firstname +" "+ cliente.lastname} </IonCol>
             <IonCol>{cliente.email}</IonCol>
            
             <IonCol>{cliente.phone}</IonCol>
             <IonCol>{cliente.address}</IonCol>
             <IonCol>
                <IonButton fill='clear' style={{ marginLeft:"20px"}}><IonIcon icon={person}/></IonButton>
             </IonCol>
             <IonCol>
               <IonButton  color="primary" fill="clear"
                onClick={()=>editCostumer(String(cliente.id))} >
               <IonIcon icon={pencil} slot='icon-only' style={{ marginLeft:"-5px"}}/>
               </IonButton>
               <IonButton  color="danger" fill="clear"
               onClick={()=>remove(String(cliente.id))}>
               <IonIcon icon={close} slot='icon-only' style={{ marginLeft:"-10px"}}/>
               </IonButton>
             </IonCol>
           </IonRow>
         </IonGrid>
          )}
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
