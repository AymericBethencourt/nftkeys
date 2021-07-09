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
    margin-bottom: 5px;
  }

  > div:nth-child(2) {
    font-size: 14px;
    line-height: 16px;
    color: #FFF;
    text-align: left;
    display: block;
  }

  > div:nth-child(3) {
    font-size: 16px;
    color: #FF5D01;
    text-align: left;
    font-weight: bold;
    display: inline-block;
  }

  > div:nth-child(4) {
    font-size: 12px;
    line-height: 16px;
    color: #999FAD;
    text-align: right;
    display: inline-block;
    padding-bottom: 3px;
    padding-left: 5px;
  }
`;


