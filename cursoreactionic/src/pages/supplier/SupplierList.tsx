import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeSupplier, searchSuppliers } from './SupplierApi';
import Supplier from './Supplier';

const SupplierList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<Supplier[]>([]);
  const history = useHistory();
  
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          Proveedores
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
          <IonCol>Teléfono</IonCol>
          <IonCol>Contacto</IonCol>
          <IonCol>Dirección</IonCol>
          <IonCol>web</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
      </IonGrid>
      {clientes.map((cliente: Supplier)=>
           <IonGrid className="table" key={cliente.id}>
           <IonRow >
             <IonCol>{cliente.name} </IonCol>
             <IonCol>{cliente.phone}</IonCol>
             <IonCol>{cliente.contact}</IonCol>
             <IonCol>{cliente.address}</IonCol>
             <IonCol>{cliente.web}</IonCol>
             <IonCol>{cliente.email}</IonCol>
             <IonCol>
               <IonButton  color="primary" fill="clear"
                onClick={()=>editCostumer(String(cliente.id))} >
               <IonIcon icon={pencil} slot='icon-only'/>
               </IonButton>
               <IonButton  color="danger" fill="clear"
               onClick={()=>remove(String(cliente.id))}>
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

export default SupplierList;
