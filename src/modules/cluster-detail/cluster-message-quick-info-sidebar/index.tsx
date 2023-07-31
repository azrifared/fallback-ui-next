import React from 'react';
import { Panel } from '@fluentui/react';
import { useRecoilState } from 'recoil';
import { sidebarState,  } from './store';
import styled from '../../../components/Theme/styled';

type Props = {}

const MessageClusterQuickInfoSidebar = (props: Props) => {
  const [{ isOpen, data }, openSidebar] = useRecoilState(sidebarState)
  console.log(data)
  return (
    <Panel
      isOpen={isOpen}
      closeButtonAriaLabel='Close'
      isLightDismiss={true}
      headerText='Details'
      onDismiss={() => openSidebar({ isOpen: false, data: null })}
    > 
      <Container>
        <Content>
          <Title>ID :</Title>
          <Description>{data?.ID ?? '-'}</Description>
        </Content>
        <Content>
          <Title>Cluster ID :</Title>
          <Description>{data?.cluster?.ID ?? '-'}</Description>
        </Content>
        <Content>
          <Title>Conversation ID :</Title>
          <Description>{data?.conversation?.extconversationid ?? '-'}</Description>
        </Content>
        <Content>
          <Title>Time :</Title>
          <Description>{data?.time ?? '-'}</Description>
        </Content>
      </Container>
    </Panel>
  )
}

const Container = styled.div`
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

export default MessageClusterQuickInfoSidebar;
