import styled from '../../../components/Theme/styled';
import { BOTNAME, COUNTRY, LANGUAGE } from '../../../common/constants';

type SessionDetailProps = {
  languageId: number;
  botId: number;
  countryId: number;
}

const SessionDetail = ({ languageId, botId, countryId }: SessionDetailProps) => {
  const language = LANGUAGE[languageId as keyof typeof LANGUAGE]
  const botname = BOTNAME[botId as keyof typeof BOTNAME]
  const country = COUNTRY[countryId as keyof typeof COUNTRY]

  return (
    <Container>
      <Content>
        <Title>Country :</Title>
        <Description>{country}</Description>
      </Content>
      <Content>
        <Title>Language :</Title>
        <Description>{language}</Description>
      </Content>
      <Content>
        <Title>Botname :</Title>
        <Description>{botname}</Description>
      </Content>
    </Container>
  )
}

const Container = styled.div`
`;

const Content = styled.div`
  padding: 10px 0;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.div`
`;

export default SessionDetail;