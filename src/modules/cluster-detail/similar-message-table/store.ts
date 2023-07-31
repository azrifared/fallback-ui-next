import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil"
import { MessageService } from "../../../services/message-service"
import { IntentService } from "../../../services/intent-service"

export const PAGE_SIZE = 10

export const refreshIdAtom = atomFamily({
  key: 'SimilarMessage/RefreshIdAtom',
  default: 0,
})

export const useRefreshSimilarMessageQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0))
  return () => {
    setRefreshId((id) => id + 1)
  }
}

export const similarMessageIdAtom = atom({
  key: 'SimilarMessageIdAtom',
  default: 0,
})

export const skipCountAtom = atom({
  key: 'SimilarMessageSkipCountAtom',
  default: 0,
})

export const similarMessageQuery = selector({
  key: 'SimilarMessageQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const similarMessageId = get(similarMessageIdAtom)
    const skip = get(skipCountAtom)
    const pagination = {
      take: String(PAGE_SIZE),
      skip: String(skip),
    }
    if (similarMessageId === 0) return
    const params = new URLSearchParams({
      ...pagination,
      ...{ messageId: String(similarMessageId) }
    })

    const data = await MessageService.getMatrixWithSelection(params)
    return data
  },
})

export const similarMessageRowAtom = atom({
  key: 'SimilarMessageRowAtom',
  default: selector({
    key: 'SimilarMessageRowAtomDefault',
    get: ({ get }) => { 
      const messages = get(similarMessageQuery)
      const [list, count] =  messages || []
      const newList = (list || []).map((data) => {
        return {
          ...data,
          messageId: data.id,
          score: data.Score,
        }
      }) 
      return messages ? [newList, count] : []
    },
  }),
})



export const refreshIntentAtom = atomFamily({
  key: 'Intent/RefreshIntentAtom',
  default: 0,
})

export const useIntentRefreshQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIntentAtom(0))
  return () => {
    setRefreshId((id) => id + 1)
  }
}

export const intentQuery = selector({
  key: 'IntentQuery',
  get: async ({ get }) => {
    get(refreshIntentAtom(0))
    const data = await IntentService.getIntents()
    return data
  },
})

export const intentAtom = atom({
  key: 'IntentAtom',
  default: selector({
    key: 'intentAtomDefault',
    get: ({ get }) => { 
      const intents = get(intentQuery)
      return intents ?? []
    },
  }),
})

