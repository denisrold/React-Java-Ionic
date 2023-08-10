import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add } from 'ionicons/icons';

const CustomerList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

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
        <IonRow >
        <IonCol>Nombre</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Teléfono</IonCol>
          <IonCol>Dirección</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
      </IonGrid>

      <IonGrid className="table">
        <IonRow>
        <IonCol>Juan Perez</IonCol>
          <IonCol>juanperez@mail.com</IonCol>
          <IonCol>34122332412</IonCol>
          <IonCol>Avenida siempre viva 123</IonCol>
          <IonCol>Boton Editar</IonCol>
        </IonRow>
      </IonGrid>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
