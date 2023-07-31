import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Panel } from '@fluentui/react';
import { useRecoilState } from 'recoil';
import { sidebarState,  } from './store';
import { useAsync } from '../../../common/hooks';
import { ClientSessionService } from '../../../services/client-session';
import { RECOIL_ASYNC_STATE } from '../../../common/constants';
import SessionDetail from './SessionDetail';
import CreateIntent from './CreateIntent';

const CreateIntentSidebar = () => {
  const [isOpen, openSidebar] = useRecoilState(sidebarState)
  const router = useRouter()
  const sessionId = router.query.sessionId;
  const sessionState = useAsync(async (id: string) => {
    if (!id) return
    const data = await ClientSessionService.getClientSessionBySessionId(id)
    return data
  }, [String(sessionId)])
  const { loading: clientSessionLoading, contents: clientSessionContents } =  sessionState
  const isClientSessionLoading = useMemo(
    () => clientSessionLoading === RECOIL_ASYNC_STATE.LOADING, [clientSessionLoading]
  )

  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel='Close'
      isLightDismiss={true}
      headerText='Create Intent'
      onDismiss={() => openSidebar(false)}
    >
      {!isClientSessionLoading && clientSessionContents && (
        <>
          <SessionDetail
            languageId={clientSessionContents.calculation.language}
            countryId={clientSessionContents.calculation.country}
            botId={clientSessionContents.calculation.botName}
          />
          <CreateIntent
            languageId={clientSessionContents.calculation.language}
            countryId={clientSessionContents.calculation.country}
            botId={clientSessionContents.calculation.botName}
          />
        </>
      )}
    </Panel>
  )
}

export default CreateIntentSidebar;
