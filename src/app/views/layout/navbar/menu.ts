import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { MenuItem } from './menu.model';
import { TEXT } from 'src/app/core/enum/text.enum';

export const MENU: MenuItem[] = [
  {
    label: 'Home',
    icon: 'home',
    link: '/dashboard',
  },

  {
    label: 'Customers',
    icon: 'users',
    isMegaMenu: false,
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Add Customer',
            link: `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ADD_CUSTOMERS}/${TEXT.NEW}`,
          },
          {
            label: 'All customers',
            link: `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ALL_CUSTOMERS}`,
          },
        ],
      },
    ],
  },

  {
    label: 'Prospects',
    icon: 'file-plus',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Add prospects',
            isTitle: false,
            link: `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${TEXT.NEW}`,
          },
          {
            label: 'All prospects',
            link: `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ALL_PROSPECTS}`,
          },
        ],
      },
    ],
  },

  {
    label: 'Agents',
    icon: 'user',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Add agents',
            isTitle: false,
            link: `${ROUTE_APP.AGENT}/${ROUTE_APP.ADD_AGENTS}/${TEXT.NEW}`,
          },
          {
            label: 'All agents',
            link: `${ROUTE_APP.AGENT}/${ROUTE_APP.ALL_AGENTS}`,
          },
        ],
      },
    ],
  },

  {
    label: 'Policy',
    icon: 'copy',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'All policy',
            link: `${ROUTE_APP.POLICY}/${ROUTE_APP.ALL_POLICY}`,
          },
        ],
      },
    ],
  },

  {
    label: 'Reports',
    icon: 'file-text',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Search',
            isTitle: false,
            link: '',
          },
          {
            label: 'Report',
            link: '',
          },
        ],
      },
    ],
  },
];
