import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, close, pencil, person } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeSupplier, searchSuppliers } from './SupplierApi';
import Supplier from './Supplier';

const SupplierList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<Supplier[]>([]);
  const history = useHistory();
  const [clientCard,setClientCard]= useState({
    name:"",
    contact:"",
    email:"",
    phone:"",
    address:"",
    display:{display:"none"}
  });
  useEffect(()=>{
    search();
  },[history.location.pathname])

  const search =async ()=>{
    let result =await searchSuppliers();
    setClientes(result);
  }

  const remove = async (id:string)=>{
    await removeSupplier(id);
    search();
  };

  const addCostumer = ()=>{
    history.push("/page/Suppliers/new");
  };
  const editCostumer = (id:string)=>{
    history.push("/page/Suppliers/"+id);
  };
  const closedCard =()=>{
    setClientCard({
      name:"",
      contact:"",
      email:"",
      phone:"",
      address:"",
      display:{display:"none"}
    })
}

const handlerClientCard =(cliente:any)=>{
  setClientCard({
  name:cliente.name,
  contact:cliente.contact,
  address:cliente.address,
  email:cliente.email,
  phone:cliente.phone,
  display:{display:"block"}
  })
}
  return (
    
    <IonPage>
       <IonCard  className='contactCard suppcard' style={clientCard.display}>
          <IonCardHeader className='header'>
            <IonButton fill="clear" className="close" onClick={closedCard}>
            <IonIcon icon={close} />
            </IonButton>
            <IonCardTitle>{clientCard.name}</IonCardTitle>
            <IonList className='card-list'>
            <IonCardSubtitle>Contacto</IonCardSubtitle>
            <IonCardContent>{clientCard.contact}</IonCardContent>
            <IonCardSubtitle>Teléfono</IonCardSubtitle>
            <IonCardContent>{clientCard.phone}</IonCardContent>
            <IonCardSubtitle>Email</IonCardSubtitle>
            <IonCardContent>{clientCard.email}</IonCardContent>
            <IonCardSubtitle>Dirección</IonCardSubtitle>
            <IonCardContent>{clientCard.address}</IonCardContent>
            </IonList>
          </IonCardHeader>
        </IonCard>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{fontWeight:"bolder", color:"darkslategray"}}>Proveedores</IonTitle>
     
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonTitle>Gestión de proveedores</IonTitle>
        <IonItem>
          <IonButton color="primary" fill='solid' slot="end" size="default" onClick={addCostumer}>
          <IonIcon icon={add}/>
            Agregar proveedor
          </IonButton>
        </IonItem>
       
        <IonGrid className="table">
        <IonRow className="firstRow">
        <IonCol>Nombre</IonCol>
          <IonCol>web</IonCol>
          <IonCol>Contacto</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
      </IonGrid>
      {clientes.map((cliente: Supplier)=>
           <IonGrid className="table" key={cliente.id}>
           <IonRow >
             <IonCol>{cliente.name} </IonCol>
             <IonCol>{cliente.web}</IonCol>
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
               <IonIcon icon={close} slot='icon-only' style={{marginLeft:"-10px"}} />
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

export default SupplierList;
