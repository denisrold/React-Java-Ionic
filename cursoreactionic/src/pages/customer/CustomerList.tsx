import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<any>([]);

  useEffect(()=>{
    search();
  },[])
  const search = ()=>{
    const datosDeEjemplo = [
      {
        id:1,
        firstname:"Juan",
        lastname:"Perez",
        email:"juanperez@mail.com",
        phone:"123456123",
        address:"Avenida siempre viva 123"
      },
      {
        id:2,
        firstname:"Jorge",
        lastname:"Tanata",
        email:"jorgetanata@mail.com",
        phone:"123456123",
        address:"Avenida nunca muerta 123"
      }
    ];
    setClientes(datosDeEjemplo);
  }
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
          <IonButton color="primary" fill='solid' slot="end" size="default">
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
           <IonGrid className="table">
           <IonRow>
             <IonCol>{cliente.firstname +" "+ cliente.lastname} </IonCol>
             <IonCol>{cliente.email}</IonCol>
             <IonCol>{cliente.phone}</IonCol>
             <IonCol>{cliente.address}</IonCol>
             <IonCol>
               <IonButton  color="primary" fill="clear">
               <IonIcon icon={pencil} slot='icon-only' />
               </IonButton>
               <IonButton  color="danger" fill="clear">
               <IonIcon icon={close} slot='icon-only' />
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
