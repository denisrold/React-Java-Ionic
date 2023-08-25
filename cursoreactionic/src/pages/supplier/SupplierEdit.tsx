import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveSupplier, searchSupplierById} from './SupplierApi';
import Supplier from './Supplier';
import errorsValidator from './validations/errorsValidator';
import validator, { isFormValid } from './validations/validator';

const SupplierEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>();
  const [supplier, setSupplier] = useState<Supplier>({
        name:"",
        contact:"",
        email:"",
    });
  //Error Handler
  const [errors, setErrors] = useState<errorsValidator>({});
  const validate=(value:any)=>{
    const response = validator(value)
      setErrors({...errors, ...response })
  };

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
    await saveSupplier(supplier);
    setSupplier({
    name:"",
    contact:"",
    email:"",
    phone:"",  
    address:"",
    web:""});
    history.push("/page/Suppliers")
};
const back = async ()=>{
  setSupplier({
    name:"",
    contact:"",
    email:"",
    phone:"",  
    address:"",
    web:""});
   setErrors({});
   history.push("/page/Suppliers")
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{fontWeight:"bolder", color:"darkslategray"}}>Gestionar Proveedores</IonTitle>
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
                      <IonInput label="Name" labelPlacement="stacked" placeholder=""
                      onIonInput={e=>{validate(e);supplier.name = String(e.detail.value)}} name="name"value={supplier.name}></IonInput>
                      {!!errors.name?<span className='.errorSpanMessage'>{errors.name}</span>:null}
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Nombre y apellido del contacto" labelPlacement="stacked" placeholder="" 
                       onIonInput={e=>{validate(e);supplier.contact = String(e.detail.value)}} name="contact" value={supplier.contact}></IonInput>
                       {!!errors.contact?<span className='.errorSpanMessage'>{errors.contact}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder=""
                       onIonInput={e=>{validate(e);supplier.email = String(e.detail.value)}} name="email" value={supplier.email}></IonInput>
                       {!!errors.email?<span className='.errorSpanMessage'>{errors.email}</span>:null}
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder=""
                        onIonInput={e=>{validate(e);supplier.address = String(e.detail.value)}} name="address" value={supplier.address}></IonInput>
                        {!!errors.address?<span className='.errorSpanMessage'>{errors.address}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder=""
                         onIonInput={e=>{validate(e);supplier.phone = String(e.detail.value)}} name="phone" value={supplier.phone}></IonInput>
                         {!!errors.phone?<span className='.errorSpanMessage'>{errors.phone}</span>:null}
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                         <IonInput label="Web" labelPlacement="stacked" placeholder=""
                         onIonInput={e=>{validate(e);supplier.web= String(e.detail.value)}} name="web" value={supplier.web}></IonInput>
                         {!!errors.web?<span className='.errorSpanMessage'>{errors.web}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>
        <IonItem>
        <IonButton onClick={back} color="secondary" fill='solid' slot="end" size="default">
            Volver
          </IonButton>
          <IonButton onClick={save} color="success" fill='solid' slot="end" size="default" disabled={!isFormValid(supplier , errors)}>
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