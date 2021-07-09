import styled from "styled-components/macro";

export const GameStyled = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  > img {
    width: 100%;
    border-radius: 5px;
  }

  > div {
    font-size: 16px;
    color: #FF5D01;
    text-align: left;
    font-weight: bold;
  }
`;


