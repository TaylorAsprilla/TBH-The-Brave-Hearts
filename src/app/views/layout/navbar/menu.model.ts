export interface MenuItem {
  id?: number;
  label?: string;
  icon?: string;
  link?: string;
  subMenus?: SubMenus[];
  isMegaMenu?: boolean;
  role: ROL[];
}

export interface SubMenus {
  subMenuItems?: SubMenuItems[];
}

export interface SubMenuItems {
  label?: string;
  link?: string;
  isTitle?: boolean;
  badge?: Badge;
}

export interface Badge {
  variant?: string;
  text?: string;
}

export enum ROL {
  ADMINISTRATOR = 'ADMIN_ROLE',
  USER = 'USER_ROLE',
}
