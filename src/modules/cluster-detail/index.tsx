import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Selection, SelectionMode } from "@fluentui/react";
import { useRecoilState } from 'recoil';
import styled from "../../components/Theme/styled";
import PageContainer from "../../components/PageContainer";
import { useAsync } from "../../common/hooks";
import { ClientSessionService } from "../../services/client-session";
import { ClusterService } from "../../services/cluster-service";
import { RECOIL_ASYNC_STATE } from "../../common/constants";
import Header from "./header";
import ClusterMessageTable from "./cluster-message-table";
import ConversationTable from "./conversation-table";
import SimilarMessageTable from "./similar-message-table";
import { messageIdAtom } from './cluster-message-table/store'

function ClusterDetail() {
  const router = useRouter()
  const query = router.query
  const [, setMessageId] = useRecoilState(messageIdAtom)
  const { sessionId, clusterId } = query
  const calculationState = useAsync(async (sessionId?: string) => {
    if (!sessionId) return
    const clientSession = await ClientSessionService.getClientSessionBySessionId(sessionId)
    return clientSession?.calculation
  }, [sessionId as string])
  const clusterState = useAsync(async (clusterId: string) => {
    if (!clusterId) return
    const params = new URLSearchParams({ ID: clusterId })
    const cluster = await ClusterService.getClusterList(params)
    const [list] = cluster ?? [];
    return list && list[0]
  }, [clusterId as string])

  const { contents: calculationContent, loading: calculationLoading } = calculationState
  const { contents: clusterContent, loading: clusterLoading } = clusterState
  const isCalculationLoading = useMemo(
    () => calculationLoading === RECOIL_ASYNC_STATE.LOADING, [calculationLoading]
  )
  const isClusterLoading = useMemo(
    () => clusterLoading === RECOIL_ASYNC_STATE.LOADING, [clusterLoading]
  )
  const [selectedSimilarMassage, setSelectedSimilarMessage] = useState();
  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          setSelectedSimilarMessage((selection as any).getSelection());
        },
        selectionMode: SelectionMode.multiple,
        getKey: (item: any) => item.id,
        
      }),
    []
  );

  useEffect(() => {
    setMessageId(0)
  }, [])

  return (
    <PageContainer>
      {!isCalculationLoading && calculationContent && !isClusterLoading && clusterContent && (
        <Header calculation={calculationContent} cluster={clusterContent} />
      )}
      <Container>
        <LeftSidebar>
          <ContentTitle>Message in cluster</ContentTitle>
          <ClusterMessageTable selection={selection}/>
        </LeftSidebar>
        <MainContent>
          <div>
            <ContentTitle>Conversation for particular message</ContentTitle>
            <ConversationTable />
          </div>
          <div>
            <ContentTitle>Similar messages for particular message</ContentTitle>
            <SimilarMessageTable
              selection={selection}
              sessionId={Number(sessionId)}
              selectedSimilarMassage={selectedSimilarMassage}
            />
          </div>
        </MainContent>
      </Container>
    </PageContainer>
  )
}

const ContentTitle = styled.div`
  font-size: 17px;
  font-weight: 300;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
`;

const LeftSidebar = styled.div`
  width: 700px;
  margin-right: 20px;
`;

const MainContent = styled.div`
  width: 100%;
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
`;

export default ClusterDetail
