import {
  FunctionComponent,
  useEffect,
  useState,
  useCallback
} from 'react';
import {
  DetailsListLayoutMode,
  ShimmeredDetailsList,
} from '@fluentui/react'
import moment from 'moment';
import { SelectionMode } from '@fluentui/utilities'
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import {
  clientSessionRowAtom,
  clientSessionWithCountSelectionRowAtom,
  PAGE_SIZE,
  skipCountAtom
} from '../store';
import { tableColumns } from './columns';
import { Row } from './Row';
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import { ClientSessionWithCountSelection } from '../../../services/client-session';
import {
  LANGUAGE, BOTNAME, COUNTRY
} from "../../../common/constants"
import Pagination from '../../../components/Pagination';

export const ShimmerApplicationExample: FunctionComponent = () => {
  const { state, contents } = useRecoilValueLoadable(clientSessionRowAtom);
  const [rows, setRows] = useState(contents)
  const [totalCount, setTotalCount] = useState(0)
  const isLoading = state === RECOIL_ASYNC_STATE.LOADING
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)

  const {
    state: clientSessionWithCountSelectionState,
    contents: clientSessionWithCountSelectionContents
  } = useRecoilValueLoadable(clientSessionWithCountSelectionRowAtom)
  const clientSessionWithCountSelectionStateLoading = clientSessionWithCountSelectionState === RECOIL_ASYNC_STATE.LOADING
  
  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
  }, [])
  useEffect(() => {
    setSkipCount(0)
  }, [])
  useEffect(() => {
    if (!clientSessionWithCountSelectionStateLoading && clientSessionWithCountSelectionContents) {
      const [list, count] = clientSessionWithCountSelectionContents || []
      const mappedList = (list || []).map(({
        clientSessionCreatedDate,
        calculationAnalysisDateFrom,
        calculationAnalysisDateTo,
        clientSessionId,
        calculationBotname,
        calculationCountry,
        calculationLanguage,
        calculationState,
        selectionCount,
        userId
      }: ClientSessionWithCountSelection) => {
        const sessionDate = new Date(clientSessionCreatedDate)
        const analysisDateFrom = new Date(calculationAnalysisDateFrom)
        const analysisDateTo = new Date(calculationAnalysisDateTo)
        const formattedSessionDate = moment(sessionDate).format('YYYY-MM-DD HH:mm:ss')
        const formattedAnalysisDateFrom = moment(analysisDateFrom).format('YYYY-MM-DD HH:mm:ss')
        const formattedaAalysisDateTo = moment(analysisDateTo).format('YYYY-MM-DD HH:mm:ss')
        return {
          sessionId: clientSessionId,
          sessionDate: formattedSessionDate,
          analysisDateFrom: formattedAnalysisDateFrom,
          analysisDateTo: formattedaAalysisDateTo,
          country: COUNTRY[calculationCountry as keyof typeof COUNTRY],
          language: LANGUAGE[calculationLanguage as keyof typeof LANGUAGE],
          botName: BOTNAME[calculationBotname as keyof typeof BOTNAME],
          isActive: calculationState === 'active',
          userId,
          labeled: selectionCount,
          newIntents: selectionCount
        }
      })
      setRows(mappedList)
      setTotalCount(count)
    }
  }, [clientSessionWithCountSelectionStateLoading, clientSessionWithCountSelectionContents])

  return (
    <>
      <ShimmeredDetailsList
        items={rows}
        columns={tableColumns}
        enableShimmer={isLoading}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={(detailsRowProps) => <Row {...detailsRowProps} />}
      />
      <Pagination
        count={totalCount || 0}
        pageSize={PAGE_SIZE}
        currentStart={skipCount}
        onChange={onPageChange}
      />
    </>
  );
};
