import styled from "styled-components/macro";

export const HeaderStyled = styled.div`
  z-index: 1;
  width: 90vw;
  height: 60px;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 238px repeat(5, 1fr);
  grid-gap: 10px;
  margin: auto;

  img {
    width: 240px;
    margin-top: 12px;
  }

  a {
    line-height: 60px;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
    text-decoration: none;
  }

  div {
    line-height: 60px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }

  .pretty {
    margin-top: 10px;
    text-align: center;
    height: 36px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    will-change: box-shadow;
    width: 100%;
    user-select: none;
    background: linear-gradient(to right bottom, #ff3b00, #fe7e00);
    line-height: 36px;
  }
`;
