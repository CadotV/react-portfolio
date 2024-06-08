import styled, { keyframes } from "styled-components";

export default function ColoredContainer({ children }) {
  return (
    <StyledGradientBG className="p-0.5 rounded-md">
      <div className=" bg-gray-100 dark:bg-gray-900 rounded-md">{children}</div>
    </StyledGradientBG>
  );
}

const Gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledGradientBG = styled.div`
  width: 100wh;
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: ${Gradient} 15s ease infinite;
  -moz-animation: ${Gradient} 15s ease infinite;
  animation: ${Gradient} 15s ease infinite;
`;
