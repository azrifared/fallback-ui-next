import styled from "../../../components/Theme/styled";
import { Calculation } from "../../../services/client-session";
import { BOTNAME, LANGUAGE, COUNTRY } from "../../../common/constants";

function Header({ calculation }: { calculation: Calculation }) {
  const botName = BOTNAME[calculation.botName as keyof typeof BOTNAME]
  const language = LANGUAGE[calculation.language as keyof typeof LANGUAGE]
  const country = COUNTRY[calculation.country as keyof typeof COUNTRY]

  return (
    <Container>
      <HeaderTitle>Analysis - Clusters</HeaderTitle>
      <HeaderDescription>Country: {country} | Language: {language} | Botname: {botName}</HeaderDescription>
    </Container>
  )
}

const Container = styled.div`
  padding: 10px;
  align-items: baseline;
`;

const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const HeaderDescription = styled.div`
  font-size: 13px;
  font-weight: 350;
`;

export default Header
