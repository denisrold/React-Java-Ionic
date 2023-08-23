import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, close, pencil, person } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeCostumer, searchCustomers } from './CustomerApi';
import Customer from './Customer';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const [clientCard,setClientCard]= useState({
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    display:{display:"none"}
  });
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
  const closedCard =()=>{
    setClientCard({
      firstname:"",
      lastname:"",
      email:"",
      phone:"",
      display:{display:"none"}
    })
}

const handlerClientCard =(cliente:any)=>{
  setClientCard({
  firstname:cliente.firstname,
  lastname:cliente.lastname,
  email:cliente.email,
  phone:cliente.phone,
  display:{display:"block"}
  })
};
  return (
    <IonPage>
      <IonCard className='contactCard' style={clientCard.display}>
          <IonCardHeader className='header'>
            <IonButton fill="clear" className="close" onClick={closedCard}>
            <IonIcon icon={close} />
            </IonButton>
            <IonCardTitle>{clientCard.firstname +" "+ clientCard.lastname}</IonCardTitle>
            <IonList className='card-list'>
            <IonCardSubtitle>Teléfono</IonCardSubtitle>
            <IonCardContent>{clientCard.phone}</IonCardContent>
            <IonCardSubtitle>Email</IonCardSubtitle>
            <IonCardContent>{clientCard.email}</IonCardContent>
            </IonList>
          </IonCardHeader>
        </IonCard>
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
          <IonCol>Dirección</IonCol>
          <IonCol>Contacto</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
      </IonGrid>
      {clientes.map((cliente: Customer)=>
           <IonGrid className="table" key={cliente.id} >
           <IonRow >
             <IonCol className='col'>{cliente.firstname +" "+ cliente.lastname} </IonCol>  
             <IonCol className='col'>{cliente.address}</IonCol>
             <IonCol>
                <IonButton fill='clear' style={{ marginLeft:"20px"}} onClick={()=>handlerClientCard(cliente)}>
                  <IonIcon icon={person}/>
                </IonButton>
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
