import {
  FunctionComponent,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  DetailsListLayoutMode,
  ShimmeredDetailsList,
  Selection
} from '@fluentui/react';
import { useRouter } from 'next/router';
import { SelectionMode } from '@fluentui/utilities'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { tableColumns } from './columns';
import { Row } from './Row';
import Pagination from '../../../components/Pagination';
import {
  clusterIdAtom,
  messageRowAtom,
  useRefreshClusterQuery,
  skipCountAtom,
  PAGE_SIZE
} from './store'
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import { conversationIdAtom } from '../conversation-table/store'
import MessageClusterQuickInfoSidebar from '../cluster-message-quick-info-sidebar';

type ClusterMessageTableProps = {
  selection: Selection
}

const ClusterMessageTable: FunctionComponent<ClusterMessageTableProps> = ({
  selection
}) => {
  const router = useRouter()
  const query = router.query
  const refreshQuery = useRefreshClusterQuery()
  const clusterId = useMemo(() => query.clusterId, [query])
  const [, setClusterId] = useRecoilState(clusterIdAtom)
  const [, setCalculationId] = useRecoilState(conversationIdAtom)
  const { state: messageState, contents: messageContent } = useRecoilValueLoadable(messageRowAtom)
  const [skipCount, setSkipCount] = useRecoilState(skipCountAtom)
  const isMessageLoading = useMemo(
    () => messageState === RECOIL_ASYNC_STATE.LOADING, [messageState]
  )
  const [rows, setRows] = useState()
  const [totalCount, setTotalCount] = useState(0)
  const onPageChange = useCallback((page: string) => {
    setSkipCount(Number(page))
    setCalculationId(0)
  }, [])

  // Update cluster message row by clusterId
  useEffect(() => {
    refreshQuery()
    if (clusterId) {
      setClusterId(Number(clusterId))
    }
  }, [clusterId])
 // Update row if messageContent loaded
  useEffect(() => {
    if (!isMessageLoading && messageContent) {
      const [list, count] = messageContent
      setRows(list)
      setTotalCount(count)
    }
  }, [isMessageLoading, messageContent])
  // set page 1 during first load
  useEffect(() => setSkipCount(0), [])

  return (
    <>
      <ShimmeredDetailsList
        items={rows || []}
        columns={tableColumns}
        enableShimmer={isMessageLoading}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderRow={(detailsRowProps) => (
          <Row {...detailsRowProps} selection={selection} />
        )}
        shimmerLines={20}
      />
      <Pagination
        count={totalCount || 0}
        pageSize={PAGE_SIZE}
        currentStart={skipCount}
        onChange={onPageChange}
      />
      <MessageClusterQuickInfoSidebar />
    </>
    
  );
};

export default ClusterMessageTable
