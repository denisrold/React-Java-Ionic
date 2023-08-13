import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveSupplier, searchSupplierById} from './SupplierApi';
import Supplier from './Supplier';

const SupplierEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>();
  const [supplier, setSupplier] = useState<Supplier>({
        name:"",
        contact:"",
        email:"",
    });
  const history = useHistory();  
  useEffect(()=>{
    search();
  },[id])
  
  const search = async ()=>{
    const ID = id;
    if(ID != "new"){ 
    let result = await searchSupplierById(ID);
     setSupplier(result)}
     else{    
        setSupplier({
            name:"",
            contact:"",
            email:"",
            phone:"",
            address:"",
            web:""
        })}
  }
  const save=async()=>{
    await saveSupplier(supplier)
    history.push("/page/Suppliers")
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          Gestionar Proveedores
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonTitle>{id === "new"? "Agregar Proveedor":"Editar Proveedor"}</IonTitle>
            <IonRow>
                <IonCol>
                    <IonItem>
                      <IonInput label="Name" labelPlacement="stacked" placeholder="Enter text"
                      onIonChange={e=>{supplier.name = String(e.detail.value)}} value={supplier.name}></IonInput>
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Contact" labelPlacement="stacked" placeholder="Enter text" 
                       onIonChange={e=>{supplier.contact = String(e.detail.value)}} value={supplier.contact}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder="Enter text"
                       onIonChange={e=>{supplier.email = String(e.detail.value)}} value={supplier.email}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e=>{supplier.address = String(e.detail.value)}} value={supplier.address}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder="Enter text"
                         onIonChange={e=>{supplier.phone = String(e.detail.value)}} value={supplier.phone}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                         <IonInput label="Web" labelPlacement="stacked" placeholder="Enter text"
                         onIonChange={e=>{supplier.web= String(e.detail.value)}} value={supplier.web}></IonInput>
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

export default SupplierEdit;