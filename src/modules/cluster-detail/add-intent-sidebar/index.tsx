import React, { useMemo } from 'react';
import { Panel } from '@fluentui/react';
import { useRecoilState } from 'recoil';
import { sidebarState,  } from './store';
import styled from '../../../components/Theme/styled';
import FormikSelectIntent from '../select-intent';
import { Intent } from '../../../services/intent-service';

type Props = {
  sessionId: number;
  intents?: Intent[] | []
}

const AddIntentSidebar = ({ sessionId, intents }: Props) => {
  const [{ isOpen, data }, openSidebar] = useRecoilState(sidebarState)
  const {
    clientSessionId,
    messageId
  } = data ?? {}
  const isDisabled = useMemo(() => {
    if (clientSessionId) {
      return clientSessionId !== sessionId
    } else {
      return false
    }
  }, [])
  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel='Close'
      isLightDismiss={true}
      headerText='Add Intent'
      onDismiss={() => openSidebar({ isOpen: false, data: null })}
    > 
      {intents && intents.length && (
        <Container>
          <Content>
            <Title>Select intent :</Title>
            <SelectContainer>
              <FormikSelectIntent
                intents={intents}
                messageId={messageId}
                disabled={isDisabled}
                sessionId={sessionId}
              />
            </SelectContainer>
          </Content>
        </Container>
      )}
    </Panel>
  )
}

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  padding: 10px 0;
`;

const SelectContainer = styled.div`
  padding: 5px 0;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.div`
`;

export default AddIntentSidebar;
