import {
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {  mailOutline, people } from 'ionicons/icons';
import './Menu.css';
import LogoImg from "../image/logo.jpg";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Clientes',
    url: '/page/Customers',
    iosIcon: mailOutline,
    mdIcon: people
  },
  {
    title: 'Empleados',
    url: '/page/Employees',
    iosIcon: mailOutline,
    mdIcon: people
  },
  {
    title: 'Proveedores',
    url: '/page/Suppliers',
    iosIcon: mailOutline,
    mdIcon: people
  }
];
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonImg src={LogoImg} className='logoImg'/>
          </IonListHeader>
   
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel style={{fontWeight:"bolder"}}>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
