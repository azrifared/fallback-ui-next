import { atom, selector } from 'recoil';

/**
 * State to maintain Sidebar panel
 */
export const sidebarState = atom({
  key: 'SidebarState',
  default: false
});
