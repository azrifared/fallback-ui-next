import {
  FunctionComponent,
  useMemo,
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import moment from 'moment';
import {
  DetailsListLayoutMode,
  ShimmeredDetailsList,
} from '@fluentui/react'
import { SelectionMode } from '@fluentui/utilities'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { tableColumns } from './columns';
import Pagination from '../../../components/Pagination';
import {
  skipCountAtom,
  PAGE_SIZE,
  clientSessionIdAtom,
  selectionRowAtom,
  useRefreshClusterQuery
} from '../store';
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import { Selection } from '../../../services/selection-service';

type Props = {
  clientSessionId: number
  setExportActive: Dispatch<SetStateAction<boolean>>
}

const SelectionTable: FunctionComponent<Props> = ({ clientSessionId, setExportActive }) => {
  const refreshQuery = useRefreshClusterQuery()
  const { state: selectionState, contents: selectionContents } = useRecoilValueLoadable(selectionRowAtom)
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)
  const [, setClientSessionId] = useRecoilState(clientSessionIdAtom)
  const [totalCount, setTotalCount] = useState(0)
  const [rows, setRows] = useState()
  
  const isSelectionLoading = useMemo(
    () => selectionState === RECOIL_ASYNC_STATE.LOADING, [selectionState]
  )

  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
  }, [])

  useEffect(() => {
    refreshQuery()
    setClientSessionId(clientSessionId)
    setSkipCount(0)
  }, [clientSessionId])
  useEffect(() => {
    if (!isSelectionLoading && selectionContents) {
      const [list, count] = selectionContents
      const mappedList = (list || []).map((selection: Selection) => {
        const date = new Date(selection.createdDate)
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss')
        return {
          id: selection.id,
          messageId: selection.message?.ID,
          clusterId: selection.cluster?.ID,
          clientSessionId: selection.clientSession.ID,
          text: selection.text,
          intent: selection.intent,
          createdDate: formattedDate
        }
      })
      setRows(mappedList)
      setTotalCount(count)
    }
  }, [selectionContents, isSelectionLoading, clientSessionId])
  useEffect(() => {
    if (rows && Array.isArray(rows) && (rows as any).length) {
      setExportActive(true)
    } else {
      setExportActive(false)
    }
  }, [rows])

  return (
    <>
      <ShimmeredDetailsList
        items={rows ?? []}
        columns={tableColumns}
        enableShimmer={isSelectionLoading}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        shimmerLines={20}
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

export default SelectionTable
