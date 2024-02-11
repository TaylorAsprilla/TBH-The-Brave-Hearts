import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { MenuItem, ROL } from './menu.model';
import { TEXT } from 'src/app/core/enum/text.enum';

export const MENU: MenuItem[] = [
  {
    label: 'Home',
    icon: 'home',
    link: '/dashboard',
    role: [ROL.ADMINISTRATOR, ROL.USER],
  },

  {
    label: 'Clients',
    icon: 'users',
    isMegaMenu: false,
    role: [ROL.ADMINISTRATOR, ROL.USER],
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Add Clients',
            link: `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ADD_CUSTOMERS}/${TEXT.NEW}`,
          },
          {
            label: 'All Clients',
            link: `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ALL_CUSTOMERS}`,
          },
        ],
      },
    ],
  },

  {
    label: 'Prospects',
    icon: 'file-plus',
    role: [ROL.ADMINISTRATOR, ROL.USER],
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Add Prospects',
            isTitle: false,
            link: `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${TEXT.NEW}`,
          },
          {
            label: 'All Prospects',
            link: `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ALL_PROSPECTS}`,
          },
        ],
      },
    ],
  },

  {
    label: 'Policies',
    icon: 'copy',
    role: [ROL.ADMINISTRATOR, ROL.USER],
    link: `${ROUTE_APP.POLICY}/${ROUTE_APP.ALL_POLICY}`,
  },

  {
    label: 'Administrator',
    icon: 'unlock',
    role: [ROL.ADMINISTRATOR],
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'All Clients',
            link: `${ROUTE_APP.ADMINISTRATOR}/${ROUTE_APP.ALL_CUSTOMERS}`,
          },
          {
            label: 'All Prospects',
            link: `${ROUTE_APP.ADMINISTRATOR}/${ROUTE_APP.ALL_PROSPECTS}`,
          },
          {
            label: 'All Policies',
            link: `${ROUTE_APP.ADMINISTRATOR}/${ROUTE_APP.ALL_POLICY}`,
          },
          {
            label: 'All Agents',
            link: `${ROUTE_APP.ADMINISTRATOR}/${ROUTE_APP.ALL_AGENTS}`,
          },
        ],
      },
    ],
  },

  {
    label: 'Reports',
    icon: 'file-text',
    role: [ROL.ADMINISTRATOR],
    link: `${ROUTE_APP.ADMINISTRATOR}/${ROUTE_APP.REPORTS}`,
  },
];
