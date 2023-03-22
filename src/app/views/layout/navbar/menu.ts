import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Home',
    icon: 'home',
    link: '/dashboard',
  },
  {
    label: 'Associates',
    icon: 'user',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Add associates',
            isTitle: false,
          },
          {
            label: 'See the associates',
            link: '/apps/email/inbox',
          },
        ],
      },
    ],
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
            link: '/ui-components/accordion',
          },
          {
            label: 'All customers',
            link: '/ui-components/alerts',
          },
        ],
      },
    ],
  },
  {
    label: 'Forms',
    icon: 'file-text',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Basic elements',
            link: '/form-elements/basic-elements',
          },
          {
            label: 'Editors',
            link: '/form-elements/editors',
          },
          {
            label: 'Wizard',
            link: '/form-elements/wizard',
          },
        ],
      },
      {
        subMenuItems: [
          {
            label: 'Advanced elements',
            isTitle: true,
          },
          {
            label: 'Form validation',
            link: '/advanced-form-elements/form-validation',
          },
          {
            label: 'Input mask',
            link: '/advanced-form-elements/input-mask',
          },
          {
            label: 'Ng-select',
            link: '/advanced-form-elements/ng-select',
          },
          {
            label: 'Ngx-chips',
            link: '/advanced-form-elements/ngx-chips',
          },
          {
            label: 'Ngx-color-picker',
            link: '/advanced-form-elements/ngx-color-picker',
          },
          {
            label: 'Ngx-dropzone',
            link: '/advanced-form-elements/ngx-dropzone-wrapper',
          },
        ],
      },
    ],
  },
  {
    label: 'Data',
    icon: 'pie-chart',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Charts & graphs',
            isTitle: true,
          },
          {
            label: 'ApexCharts',
            link: '/charts-graphs/apexcharts',
          },
          {
            label: 'ChartJs',
            link: '/charts-graphs/chartjs',
          },
        ],
      },
      {
        subMenuItems: [
          {
            label: 'Tables',
            isTitle: true,
          },
          {
            label: 'Basic tables',
            link: '/tables/basic-table',
          },
          {
            label: 'Data table',
            link: '/tables/data-table',
          },
          {
            label: 'Ngx-datatable',
            link: '/tables/ngx-datatable',
          },
        ],
      },
    ],
  },
  {
    label: 'Icons',
    icon: 'smile',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Feather icons',
            link: '/icons/feather-icons',
          },
          {
            label: 'Mdi icons',
            link: '/icons/mdi-icons',
          },
        ],
      },
    ],
  },
  {
    label: 'Special pages',
    icon: 'book',
    isMegaMenu: true,
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Special pages',
            isTitle: true,
          },
          {
            label: 'Blank page',
            link: '/general/blank-page',
          },
          {
            label: 'Faq',
            link: '/general/faq',
          },
          {
            label: 'Invoice',
            link: '/general/invoice',
          },
        ],
      },
      {
        subMenuItems: [
          {
            label: '',
            isTitle: true,
          },
          {
            label: 'Profile',
            link: '/general/profile',
          },
          {
            label: 'Pricing',
            link: '/general/pricing',
          },
          {
            label: 'Timeline',
            link: '/general/timeline',
          },
        ],
      },
      {
        subMenuItems: [
          {
            label: 'Auth pages',
            isTitle: true,
          },
          {
            label: 'Login',
            link: '/auth/login',
          },
          {
            label: 'Register',
            link: '/auth/register',
          },
        ],
      },
      {
        subMenuItems: [
          {
            label: 'Error pages',
            isTitle: true,
          },
          {
            label: '404',
            link: '/error/404',
          },
          {
            label: '500',
            link: '/error/500',
          },
        ],
      },
    ],
  },
];
