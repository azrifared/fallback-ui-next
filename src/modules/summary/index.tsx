import { useMemo, useState } from 'react';
import { useRouter } from "next/router";
import PageContainer from "../../components/PageContainer";
import { useAsync } from "../../common/hooks";
import { ClientSessionService } from "../../services/client-session";
import { RECOIL_ASYNC_STATE } from "../../common/constants";
import Header from "./header";
import SelectionTable from './table';

function SelectionList() {
  const router = useRouter()
  const query = router.query
  const [exportIsActive, setExportActive] = useState(false)
  const clientSessionState = useAsync(async (input: typeof query) => {
    const { sessionId } = input as { sessionId: string };
    if (!sessionId) return
    const clientSession = await ClientSessionService.getClientSessionBySessionId(sessionId)
    return clientSession
  }, [query])
  const clientSessionId = useMemo(() => query.sessionId, [query])

  const { loading: clientSessionLoading, contents: clientSessionContents } = clientSessionState
  const isClientSessionLoading = clientSessionLoading === RECOIL_ASYNC_STATE.LOADING


  return (
    <PageContainer>
      {!isClientSessionLoading && clientSessionContents && (
        <Header
          calculation={clientSessionContents.calculation}
          exportIsActive={exportIsActive}
          clientSessionId={Number(clientSessionId)}
        />
      )}
      {clientSessionId && (
        <SelectionTable
          clientSessionId={Number(clientSessionId)}
          setExportActive={setExportActive}
        />
      )}
    </PageContainer>
  )
}

export default SelectionList
