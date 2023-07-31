import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil"
import { SelectionService } from "../../services/selection-service"

export const PAGE_SIZE = 20

export const refreshIdAtom = atomFamily({
  key: 'Selection/RefreshIdAtom',
  default: 0,
})

export const useRefreshClusterQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0))
  return () => {
    setRefreshId((id) => id + 1)
  }
}


export const clientSessionIdAtom = atom({
  key: 'ClientSessionIdAtom',
  default: 0,
})

export const skipCountAtom = atom({
  key: 'SelectionSkipCountAtom',
  default: 0,
})

export const selectionQuery = selector({
  key: 'SelectionQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const clientSessionId = get(clientSessionIdAtom)
    const skip = get(skipCountAtom)
    const pagination = {
      take: String(PAGE_SIZE),
      skip: String(skip),
    }
    if (clientSessionId === 0) return
    const params = new URLSearchParams({
      ...pagination,
      ...{ clientSessionId: String(clientSessionId) }
    })

    const data = await SelectionService.getSelections(params)
    return data
  },
})

export const selectionRowAtom = atom({
  key: 'SelectionRowAtom',
  default: selector({
    key: 'SelectionRowAtomDefault',
    get: ({ get }) => { 
      const cluster = get(selectionQuery)
      return cluster || []
    },
  }),
})
