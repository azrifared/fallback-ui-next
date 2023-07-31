import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil"
import moment from 'moment'
import { MessageService } from "../../../services/message-service"

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

export const clusterIdAtom = atom({
  key: 'ClusterIdAtom',
  default: 0,
})

export const messageIdAtom = atom({
  key: 'MessageIdAtom',
  default: 0
})

export const skipCountAtom = atom({
  key: 'MessageSkipCountAtom',
  default: 0,
})

export const messageQuery = selector({
  key: 'MessageQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const clusterId = get(clusterIdAtom)
    const skip = get(skipCountAtom)
    const pagination = {
      take: String(PAGE_SIZE),
      skip: String(skip),
    }
    if (clusterId === 0) return
    const params = new URLSearchParams({
      ...pagination,
      ...{ clusterId: String(clusterId) }
    })

    const data = await MessageService.getMessages(params)
    return data
  },
})


export const messageRowAtom = atom({
  key: 'MessageRowAtom',
  default: selector({
    key: 'MessageRowAtomDefault',
    get: ({ get }) => { 
      const messages = get(messageQuery)
      const [list, count] =  messages || []
      const newList = (list || []).map((data) => {
        const date = new Date(parseInt(data.messagetimestamp))
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss')
        return {
          ...data,
          id: data.ID,
          time: String(formattedDate),
          text: data.text,
          conversation: data.conversation
        }
      }) 
      return messages ? [newList, count] : []
    },
  }),
})
