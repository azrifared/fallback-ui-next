import React, { useMemo } from 'react';
import { Panel } from '@fluentui/react';
import { useRecoilState } from 'recoil';
import { sidebarState,  } from './store';
import styled from '../../../components/Theme/styled';
import { Intent } from '../../../services/intent-service';
import FormikSelectIntent from './SelectIntent';

type Props = {
  sessionId: number;
  intents?: Intent[] | []
}

const AddIntentToManySidebar = ({ sessionId, intents }: Props) => {
  const [{ isOpen, data }, openSidebar] = useRecoilState(sidebarState)
  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel='Close'
      isLightDismiss={true}
      headerText='Assign intent to messages'
      onDismiss={() => openSidebar({ isOpen: false, data: null })}
    > 
      <Container>
        {intents && intents.length && (
          <Content>
            <Title>Select intent :</Title>
            <SelectContainer>
              <FormikSelectIntent
                sessionId={sessionId}
                intents={intents}
              />
            </SelectContainer>
          </Content>
        )}
      </Container>
    </Panel>
  )
}

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  padding: 10px 0;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const SelectContainer = styled.div`
`;



export default AddIntentToManySidebar;
