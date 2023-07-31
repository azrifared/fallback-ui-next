import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil"
import { ClusterService } from "../../services/cluster-service"

export const PAGE_SIZE = 20

export const refreshIdAtom = atomFamily({
  key: 'Cluster/RefreshIdAtom',
  default: 0,
})

export const useRefreshClusterQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0))
  return () => {
    setRefreshId((id) => id + 1)
  }
}

export const calculationIdAtom = atom({
  key: 'CalculationIdAtom',
  default: 0,
})


export const skipCountAtom = atom({
  key: 'ClusterSkipCountAtom',
  default: 0,
})

export const clusterQuery = selector({
  key: 'ClusterQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const calculationId = get(calculationIdAtom)
    const skip = get(skipCountAtom)
    const pagination = {
      take: String(PAGE_SIZE),
      skip: String(skip),
    }
    if (calculationId === 0) return
    const params = new URLSearchParams({
      ...pagination,
      ...{ calculationId: String(calculationId) }
    })

    const data = await ClusterService.getClusterList(params)
    return data
  },
})

export const clusterRowAtom = atom({
  key: 'ClusterRowAtom',
  default: selector({
    key: 'ClusterRowAtomDefault',
    get: ({ get }) => { 
      const cluster = get(clusterQuery)
      return cluster || []
    },
  }),
})

