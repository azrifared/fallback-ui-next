import styled from "../../../components/Theme/styled";
import { Calculation } from "../../../services/client-session";
import { Cluster } from "../../../services/cluster-service";
import { BOTNAME, LANGUAGE, COUNTRY } from "../../../common/constants";

type Props = {
  calculation: Calculation;
  cluster: Cluster
}

function Header({ calculation, cluster }: Props) {
  const botName = BOTNAME[calculation.botName as keyof typeof BOTNAME]
  const language = LANGUAGE[calculation.language as keyof typeof LANGUAGE]
  const country = COUNTRY[calculation.country as keyof typeof COUNTRY]

  return (
    <Container>
      <HeaderTitle>Analysis - Cluster Detail</HeaderTitle>
      <HeaderDescription>Country: {country} | Language: {language} | Botname: {botName}</HeaderDescription>
      <HeaderDescription>Cluster name: {cluster.name}</HeaderDescription>
      <HeaderDescription>Cluster size: {cluster.size}</HeaderDescription>
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
  padding: 10px 0;
`;

const HeaderDescription = styled.div`
  font-size: 13px;
  font-weight: 350;
`;

export default Header
