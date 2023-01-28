import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./Router";

function App() {
  return (
    <Wrapper>
      <Router />
      <GlobalStyle />
    </Wrapper>
  );
}

export default App;

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
