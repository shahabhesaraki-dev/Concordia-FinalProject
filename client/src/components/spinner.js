import { ImSpinner9 } from "react-icons/im";
import { keyframes } from "styled-components";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper>
      <StyledLoadingCircle />
    </Wrapper>
  );
};

const spin = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const StyledLoadingCircle = styled(ImSpinner9)`
  margin: 0 auto;
  animation: ${spin} 2s infinite linear;
  height: 2em;
  width: 2em;
`;
export default Spinner;
