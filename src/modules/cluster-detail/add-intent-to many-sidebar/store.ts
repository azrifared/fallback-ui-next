import { atom, selector } from 'recoil';

export type AddIntentSidebarState = {
  isOpen: boolean
  data: any | null
}

/**
 * State to maintain Sidebar panel
 */
export const sidebarState = atom<AddIntentSidebarState>({
  key: 'SidebarAddIntentToManyState',
  default: {
    isOpen: false,
    data: null
  }
});
