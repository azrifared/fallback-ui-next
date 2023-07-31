import {
  atomFamily,
  useSetRecoilState,
  selector,
  atom,
} from "recoil"
import Cookies from 'js-cookie';
import moment from 'moment';
import { ClientSessionService, ClientSession } from "../../services/client-session"
import {
  LANGUAGE, BOTNAME, COUNTRY
} from "../../common/constants"

export const PAGE_SIZE = 20


export const refreshIdAtom = atomFamily({
  key: 'ClientSession/RefreshIdAtom',
  default: 0,
})

export const useRefreshClientSessionQuery = () => {
  const setRefreshId = useSetRecoilState(refreshIdAtom(0))
  return () => {
    setRefreshId((id) => id + 1)
  }
}

export const clientSessionQuery = selector({
  key: 'ClientSessionQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const data = await ClientSessionService.getClientSessionByCurrentUserLdap();
    return data;
  },
})

export const skipCountAtom = atom({
  key: 'ClientSessionWithCountSelectionSkipCountAtom',
  default: 0,
})

export const clientSessionWithCountSelectionQuery = selector({
  key: 'ClientSessionWithSelectionQuery',
  get: async ({ get }) => {
    get(refreshIdAtom(0))
    const userLdap = Cookies.get('user-ldap')
   
    if (!userLdap) return
    const skip = get(skipCountAtom)
    const pagination = {
      take: String(PAGE_SIZE),
      skip: String(skip),
    }
    const params = new URLSearchParams({
      ...pagination,
      ...{ ldapId: String(userLdap) }
    })

    const data = await ClientSessionService.getClientSessionWithCountSelection(params)
    return data
  },
})

export const clientSessionWithCountSelectionRowAtom = atom({
  key: 'ClientSessionWithSelectionRowAtom',
  default: selector({
    key: 'ClientSessionWithSelectionRowAtomDefault',
    get: ({ get }) => { 
      const clientSessionWithCountSelection = get(clientSessionWithCountSelectionQuery)
      return clientSessionWithCountSelection || []
    },
  }),
})

export const clientSessionRowAtom = atom({
  key: 'ClientSessionRowAtom',
  default: selector({
    key: 'ClientSessionRowAtomDefault',
    get: ({ get }) => { 
      const clientSession = get(clientSessionQuery)
      return (clientSession || []).map(({
        ID, calculation, createdDate
      }: ClientSession) => {
        const sessionDate = new Date(createdDate)
        const analysisDateFrom = new Date(calculation.analysisDateFrom)
        const analysisDateTo = new Date(calculation.analysisDateTo)
        const formattedSessionDate = moment(sessionDate).format('YYYY-MM-DD HH:mm:ss')
        const formattedAnalysisDateFrom = moment(analysisDateFrom).format('YYYY-MM-DD HH:mm:ss')
        const formattedaAalysisDateTo = moment(analysisDateTo).format('YYYY-MM-DD HH:mm:ss')
        return {
          sessionId: ID,
          sessionDate: formattedSessionDate,
          analysisDateFrom: formattedAnalysisDateFrom,
          analysisDateTo: formattedaAalysisDateTo,
          country: COUNTRY[calculation.country as keyof typeof COUNTRY],
          language: LANGUAGE[calculation.language as keyof typeof LANGUAGE],
          botName: BOTNAME[calculation.botName as keyof typeof BOTNAME],
          isActive: calculation.state === 'active'
        }
      })
    },
  }),
})

