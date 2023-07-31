import styled from "../../components/Theme/styled";
import PageContainer from "../../components/PageContainer";
import CreateSession from "./create-session";
import { ShimmerApplicationExample } from './session-table';

function Session() {
  return (
    <PageContainer>
      <Container>
        <LeftSidebar>
          <CreateSession />
        </LeftSidebar>
        <MainContent>
          <ShimmerApplicationExample />
        </MainContent>
      </Container>
    </PageContainer>
  )
}

const LeftSidebar = styled.div`
  width: 270px;
  margin: 10px;
`;

const MainContent = styled.div`
  width: 100%;
  margin: 10px;
`;

const Container = styled.div`
  display: flex;
`;

export default Session
