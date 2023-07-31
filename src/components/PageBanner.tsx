import styled from "styled-components"
import { useRouter } from "next/router";

function PageBanner() {
  const router = useRouter();
  return (
    <Container>
      <Logo onClick={() => { router.push('/') }}/>
    </Container>
  )
}

const Container =  styled.div`
  background: linear-gradient(to right, #FFCC00, #FFFACD);
  height: 70px;
  position: relative;
`;

const Logo = styled.div`
  background: url('/dhl-logo.svg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 12rem;
  height: 3.125rem; 
  position: absolute;
  top: 30%;
  cursor: pointer;
`;

export default PageBanner
