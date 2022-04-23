import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Content'
  },
  {
    name: 'Posts',
    url: '/posts',
    icon: 'fa fa-newspaper-o'
  },
];
