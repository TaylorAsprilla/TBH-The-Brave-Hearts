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
            link: '/customer/add-customers',
          },
          {
            label: 'All customers',
            link: '/customer/all-customers',
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
            link: '/prospect/add-prospects',
          },
          {
            label: 'All prospects',
            link: '/prospect/all-prospects',
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

  // ########################### Información Adicional #######################################

  // {
  //   label: 'Forms',
  //   icon: 'file-text',
  //   subMenus: [
  //     {
  //       subMenuItems: [
  //         {
  //           label: 'Basic elements',
  //           link: '/form-elements/basic-elements',
  //         },
  //         {
  //           label: 'Editors',
  //           link: '/form-elements/editors',
  //         },
  //         {
  //           label: 'Wizard',
  //           link: '/form-elements/wizard',
  //         },
  //       ],
  //     },
  //     {
  //       subMenuItems: [
  //         {
  //           label: 'Advanced elements',
  //           isTitle: true,
  //         },
  //         {
  //           label: 'Form validation',
  //           link: '/advanced-form-elements/form-validation',
  //         },
  //         {
  //           label: 'Input mask',
  //           link: '/advanced-form-elements/input-mask',
  //         },
  //         {
  //           label: 'Ng-select',
  //           link: '/advanced-form-elements/ng-select',
  //         },
  //         {
  //           label: 'Ngx-chips',
  //           link: '/advanced-form-elements/ngx-chips',
  //         },
  //         {
  //           label: 'Ngx-color-picker',
  //           link: '/advanced-form-elements/ngx-color-picker',
  //         },
  //         {
  //           label: 'Ngx-dropzone',
  //           link: '/advanced-form-elements/ngx-dropzone-wrapper',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: 'Data',
  //   icon: 'pie-chart',
  //   subMenus: [
  //     {
  //       subMenuItems: [
  //         {
  //           label: 'Data & Reports',
  //           isTitle: true,
  //         },

  //         {
  //           label: 'Reports',
  //           link: '/charts-graphs/chartjs',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: 'Icons',
  //   icon: 'smile',
  //   subMenus: [
  //     {
  //       subMenuItems: [
  //         {
  //           label: 'Feather icons',
  //           link: '/icons/feather-icons',
  //         },
  //         {
  //           label: 'Mdi icons',
  //           link: '/icons/mdi-icons',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: 'Special pages',
  //   icon: 'book',
  //   isMegaMenu: true,
  //   subMenus: [
  //     {
  //       subMenuItems: [
  //         {
  //           label: 'Special pages',
  //           isTitle: true,
  //         },
  //         {
  //           label: 'Blank page',
  //           link: '/general/blank-page',
  //         },
  //         {
  //           label: 'Faq',
  //           link: '/general/faq',
  //         },
  //         {
  //           label: 'Invoice',
  //           link: '/general/invoice',
  //         },
  //       ],
  //     },
  //     {
  //       subMenuItems: [
  //         {
  //           label: '',
  //           isTitle: true,
  //         },
  //         {
  //           label: 'Profile',
  //           link: '/general/profile',
  //         },
  //         {
  //           label: 'Pricing',
  //           link: '/general/pricing',
  //         },
  //         {
  //           label: 'Timeline',
  //           link: '/general/timeline',
  //         },
  //       ],
  //     },
  //     {
  //       subMenuItems: [
  //         {
  //           label: 'Auth pages',
  //           isTitle: true,
  //         },
  //         {
  //           label: 'Login',
  //           link: '/auth/login',
  //         },
  //         {
  //           label: 'Register',
  //           link: '/auth/register',
  //         },
  //       ],
  //     },
  //     {
  //       subMenuItems: [
  //         {
  //           label: 'Error pages',
  //           isTitle: true,
  //         },
  //         {
  //           label: '404',
  //           link: '/error/404',
  //         },
  //         {
  //           label: '500',
  //           link: '/error/500',
  //         },
  //       ],
  //     },
  //   ],
  // },
];
