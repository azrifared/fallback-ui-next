import {
  FunctionComponent,
  useMemo,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  DetailsListLayoutMode,
  ShimmeredDetailsList,
} from '@fluentui/react'
import {
  useRecoilState,
  useRecoilValueLoadable
} from 'recoil';
import {
  conversationIdAtom,
  conversationRowAtom,
  skipCountAtom,
  PAGE_SIZE
} from './store'
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import { SelectionMode } from '@fluentui/utilities'
import { tableColumns } from './columns';
import { Row } from './Row';
import Pagination from '../../../components/Pagination';

const ConversationTable: FunctionComponent = () => {
  const { state: conversationState, contents: conversationContent } = useRecoilValueLoadable(conversationRowAtom)
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)
  const [, setConversationId] = useRecoilState(conversationIdAtom)
  const isConversationLoading = useMemo(
    () => conversationState === RECOIL_ASYNC_STATE.LOADING, [conversationState]
  )
  const [rows, setRows] = useState()
  const [totalCount, setTotalCount] = useState(0)
  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
  }, [])

  // Update row if messageContent loaded
  useEffect(() => {
    if (!isConversationLoading && conversationContent) {
      const [list, count] = conversationContent
      setRows(list)
      setTotalCount(count)
    }
  }, [isConversationLoading, conversationContent])
  useEffect(() => {
    setConversationId(0)
    setSkipCount(0)
  }, [])
  return (
    <>
      <ShimmeredDetailsList
        items={rows ?? []}
        columns={tableColumns}
        enableShimmer={isConversationLoading}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={(detailsRowProps) => <Row {...detailsRowProps} />}
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

export default ConversationTable
