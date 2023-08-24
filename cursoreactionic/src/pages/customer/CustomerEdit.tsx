import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams} from 'react-router';
import {checkmark} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { saveCustomer, searchCustomerById} from './CustomerApi';
import Customer from './Customer';
import errorsValidator from './validations/errorsValidator';
import  {validator , isFormValid }  from './validations/validator';

const CustomerEdit: React.FC = () => {
  const { name , id } = useParams<{ name: string; id:string; }>(); 

  const [customer, setCustomer] = useState<Customer>({
        firstname:"",
        lastname:"",
        email:"",
    });
  
  //Errors
  const [errors, setErrors] = useState<errorsValidator>({})
  
  const validate=(value:any)=>{
    const response = validator(value)
      setErrors({...errors, ...response })
  }

  const history = useHistory();  
  useEffect(()=>{
    search();
  },[id])
  
  const search = async ()=>{
    const ID = id;
    if(ID != "new"){ 
    let result = await searchCustomerById(ID);
     setCustomer(result)}
     else{    
        setCustomer({
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            address:""
        })}
  }

  const save = async ()=>{
   await saveCustomer(customer)
   setCustomer({firstname:"",
    lastname:"",
    email:"",
    phone:"",  
    address:""})
    history.push("/page/Customers")
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
        <IonTitle>{id=== "new"? "Agregar cliente":"Editar cliente"}</IonTitle>
            <IonRow>
                <IonCol>
                    <IonItem>
                      <IonInput label="First Name" labelPlacement="stacked" placeholder=""
                      onIonInput={e=>{validate(e);customer.firstname = String(e.detail.value)}} name="firstname"value={customer.firstname}></IonInput>
                      {!!errors.firstname?<span>{errors.firstname}</span>:null}
                 </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                       <IonInput label="Last Name" labelPlacement="stacked" placeholder="" 
                       onIonInput={e=>{validate(e);customer.lastname = String(e.detail.value)}} name='lastname' value={customer.lastname}></IonInput>
                       {!!errors.lastname?<span>{errors.lastname}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                       <IonInput label="Email" labelPlacement="stacked" placeholder=""
                       onIonInput={e=>{validate(e);customer.email = String(e.detail.value)}} name="email" value={customer.email}></IonInput>
                       {!!errors.email?<span>{errors.email}</span>:null}
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonItem>
                        <IonInput label="Address" labelPlacement="stacked" placeholder=""
                        onIonInput={e=>{validate(e);customer.address = String(e.detail.value)}} name="address" value={customer.address}></IonInput>
                        {!!errors.address?<span>{errors.address}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                         <IonInput label="Phone" labelPlacement="stacked" placeholder=""
                         onIonInput={e=>{validate(e);customer.phone = String(e.detail.value)}} name="phone" value={customer.phone}></IonInput>
                         {!!errors.phone?<span>{errors.phone}</span>:null}
                    </IonItem>
                </IonCol>
            </IonRow>

        <IonItem>
          <IonButton onClick={save} color="success" fill='solid' slot="end" size="default" disabled={!isFormValid(customer , errors)}>
          <IonIcon icon={checkmark}/>
            Guardar
          </IonButton>
        </IonItem>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;