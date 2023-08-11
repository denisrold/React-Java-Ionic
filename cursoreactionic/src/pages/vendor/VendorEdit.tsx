import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveVendor, searchVendorById} from './VendorApi';
import Vendor from './Vendor';

const VendorEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>();
  const [vendor, setVendor] = useState<Vendor>({
        firstname:"",
        lastname:"",
        email:"",
    });
  const history = useHistory();  
  useEffect(()=>{
    search();
  },[id])
  
  const search =  ()=>{
    const ID = id;
    if(ID != "new"){ 
    let result =  searchVendorById(ID);
     setVendor(result)}
     else{    
        setVendor({
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            address:""
        })}
  }
  const save=()=>{
    saveVendor(vendor)
    history.push("/page/Vendors")
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
                      <IonInput label="First Name" labelPlacement="stacked" placeholder="Enter text"
                      onIonChange={e=>{vendor.firstname = String(e.detail.value)}} value={vendor.firstname}></IonInput>
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Last Name" labelPlacement="stacked" placeholder="Enter text" 
                       onIonChange={e=>{vendor.lastname = String(e.detail.value)}} value={vendor.lastname}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder="Enter text"
                       onIonChange={e=>{vendor.email = String(e.detail.value)}} value={vendor.email}></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder="Enter text"
                        onIonChange={e=>{vendor.address = String(e.detail.value)}} value={vendor.address}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder="Enter text"
                         onIonChange={e=>{vendor.phone = String(e.detail.value)}} value={vendor.phone}></IonInput>
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

export default VendorEdit;