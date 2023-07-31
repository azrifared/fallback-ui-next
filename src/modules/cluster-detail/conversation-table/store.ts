import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil"
import { ConversationService } from "../../../services/conversation-service"

export const PAGE_SIZE = 20

export const refreshIdAtom = atomFamily({
  key: 'Conversation/RefreshIdAtom',
  default: 0,
})

export const useRefreshConversationQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0))
  return () => {
    setRefreshId((id) => id + 1)
  }
}

export const conversationIdAtom = atom({
  key: 'ConversationIdAtom',
  default: 0,
})

export const skipCountAtom = atom({
  key: 'ConversationSkipCountAtom',
  default: 0,
})

export const conversationQuery = selector({
  key: 'ConversationQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const conversationId = get(conversationIdAtom)
    const skip = get(skipCountAtom)
    const pagination = {
      take: String(PAGE_SIZE),
      skip: String(skip),
    }
    if (conversationId === 0) return
    const params = new URLSearchParams({
      ...pagination,
      ...{ conversationId: String(conversationId) }
    })

    const data = await ConversationService.getConversationTexts(params)
    return data
  },
})

export const conversationRowAtom = atom({
  key: 'ConversationRowAtom',
  default: selector({
    key: 'ConversationRowAtomDefault',
    get: ({ get }) => { 
      const messages = get(conversationQuery)
      const [list, count] =  messages || []
      const newList = (list || []).map((data) => {
        return {
          messageType: data.messageType,
          text: data.text,
          intentName: data.intentName,
          message: data.message
        }
      }) 
      return messages ? [newList, count] : []
    },
  }),
})

