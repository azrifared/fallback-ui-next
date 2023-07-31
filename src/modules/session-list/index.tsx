import { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useRecoilState } from 'recoil';
import { useRouter } from "next/router";
import PageContainer from "../../components/PageContainer";
import { useAsync } from "../../common/hooks";
import { ClientSessionService } from "../../services/client-session";
import { RECOIL_ASYNC_STATE } from "../../common/constants";
import Header from "./header";
import ClusterTable from "./cluster-table";
import {
  calculationIdAtom,
  clusterRowAtom,
  useRefreshClusterQuery
} from './store';
import { Cluster } from '../../services/cluster-service';

function SessionList() {
  const router = useRouter()
  const query = router.query
  const refreshQuery = useRefreshClusterQuery()
  const clientSessionState = useAsync(async (input: typeof query) => {
    const { sessionId } = input as { sessionId: string };
    if (!sessionId) return
    const clientSession = await ClientSessionService.getClientSessionBySessionId(sessionId)
    return clientSession
  }, [query])
  const [, setCalculationId] = useRecoilState(calculationIdAtom)
  const { state: clusterState, contents: clusterContents } = useRecoilValueLoadable(clusterRowAtom)
  const [rows, setRows] = useState()
  const [totalCount, setTotalCount] = useState(0)

  const { loading: clientSessionLoading, contents: clientSessionContents } = clientSessionState

  const isClusterLoading = clusterState === RECOIL_ASYNC_STATE.LOADING
  const isClientSessionLoading = clientSessionLoading === RECOIL_ASYNC_STATE.LOADING

  // Update cluster row by calculationId
  useEffect(() => {
    if (!isClientSessionLoading && clientSessionContents) {
      refreshQuery()
      const calcId = clientSessionContents.calculation.ID
      setCalculationId(calcId)
    }
  }, [clientSessionState])
  // Update row if clusterContents loaded
  useEffect(() => {
    if (!isClusterLoading && clusterContents) {
      const [list, count] = clusterContents
      const filteredList = (list || []).filter((cluster: Cluster) => {
        return cluster.topic !== -1
      })
      setRows(filteredList)
      setTotalCount(count)
    }
  }, [clusterContents, isClusterLoading])

  return (
    <PageContainer>
      {!isClientSessionLoading && clientSessionContents && (
        <Header calculation={clientSessionContents.calculation} />
      )}
      <ClusterTable
        isLoading={isClusterLoading}
        contents={rows!}
        totalCount={totalCount}
      />
    </PageContainer>
  )
}

export default SessionList
