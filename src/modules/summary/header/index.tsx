import { useCallback } from "react";
import styled from "../../../components/Theme/styled";
import { Calculation } from "../../../services/client-session";
import { BOTNAME, LANGUAGE, COUNTRY } from "../../../common/constants";
import { API_URL } from "../../../http";

type HeaderProps = {
  calculation: Calculation;
  exportIsActive: boolean;
  clientSessionId: number;
}

function Header({ calculation, exportIsActive, clientSessionId }: HeaderProps) {
  const botName = BOTNAME[calculation.botName as keyof typeof BOTNAME]
  const language = LANGUAGE[calculation.language as keyof typeof LANGUAGE]
  const country = COUNTRY[calculation.country as keyof typeof COUNTRY]
  const exportHandler = useCallback(() => {
    window.open(`${API_URL}/fallback-selection/download/${clientSessionId}`, '_blank')
  }, [])

  return (
    <Flex>
      <Container>
        <HeaderTitle>Selection Sumamry</HeaderTitle>
        <HeaderDescription>Country: {country} | Language: {language} | Botname: {botName}</HeaderDescription>
      </Container>
      <ButtonContainer>
        <Button
          onClick={exportHandler}
          disabled={!exportIsActive}
        >Export
        </Button>
      </ButtonContainer>
    </Flex>
  )
}

const ButtonContainer = styled.div`
  margin: 15px;
`;

const Button = styled.button`
  width: 150px;
  height: 30px;
  background: ${({ disabled }) => disabled ? 'lightgray' : '#24a0ed'};
  color: #fff;
  border: 1px solid transparent;
  cursor: ${({ disabled }) => disabled ? 'auto' : 'pointer'};
`;


const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

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
