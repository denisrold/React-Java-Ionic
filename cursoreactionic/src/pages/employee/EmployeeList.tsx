import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, close, pencil, person } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeEmployee, searchEmployees } from './EmployeeApi';
import Employee from './Employee';

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<Employee[]>([]);
  const history = useHistory();
  
  useEffect(()=>{
    search();
  },[history.location.pathname])

  const search =async ()=>{
    let result =await searchEmployees();
    setClientes(result);
  }

  const remove =async (id:string)=>{
    await removeEmployee(id);
    search();
  };

  const addCostumer = ()=>{
    history.push("/page/Employees/new");
  };
  const editCostumer = (id:string)=>{
    history.push("/page/Employees/"+id);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{fontWeight:"bolder", color:"darkslategray"}}>Empleados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonTitle>Gestión de Empleados</IonTitle>
        <IonItem>
          <IonButton color="primary" fill='solid' slot="end" size="default" onClick={addCostumer}>
          <IonIcon icon={add}/>
            Agregar Empleado
          </IonButton>
        </IonItem>
        <IonCard className='contactCard'>
          <IonCardHeader className='header'>
            <IonButton fill="clear" className="close">
            <IonIcon icon={close} />
            </IonButton>
            <IonCardTitle>{clientes[0].firstname +" "+ clientes[0].lastname}</IonCardTitle>
            <IonList className='card-list'>
            <IonCardSubtitle>Email</IonCardSubtitle>
            <IonCardContent>{clientes[0].email}</IonCardContent>
            <IonCardSubtitle>Teléfono</IonCardSubtitle>
            <IonCardContent>{clientes[0].phone}</IonCardContent>
            <IonCardSubtitle>Dirección</IonCardSubtitle>
            <IonCardContent>{clientes[0].address}</IonCardContent>
            </IonList>
          </IonCardHeader>
        </IonCard>
        <IonGrid className="table">
        <IonRow className="firstRow">
        <IonCol>Nombre</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Teléfono</IonCol>
          <IonCol>Dirección</IonCol>
          <IonCol>Salario</IonCol>
          <IonCol>Contacto</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
      </IonGrid>
      {clientes.map((cliente: Employee)=>
           <IonGrid className="table" key={cliente.id}>
           <IonRow >
             <IonCol>{cliente.firstname +" "+ cliente.lastname} </IonCol>
             <IonCol>{cliente.email}</IonCol>
             <IonCol>{cliente.phone}</IonCol>
             <IonCol>{cliente.address}</IonCol>
             <IonCol>{cliente.salary} USD</IonCol>
             <IonCol>
                <IonButton fill='clear'color='primary' style={{ marginLeft:"10px"}}><IonIcon icon={person}/></IonButton>
             </IonCol>
             <IonCol>
               <IonButton  color="primary" fill="clear"
                onClick={()=>editCostumer(String(cliente.id))} >
               <IonIcon icon={pencil} slot='icon-only'style={{ marginLeft:"-5px"}} />
               </IonButton>
               <IonButton  color="danger" fill="clear"
               onClick={()=>remove(String(cliente.id))}>
               <IonIcon icon={close} slot='icon-only' style={{ marginLeft:"-10px"}} />
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

export default EmployeeList;
