import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeaderStyled } from './Header.style'

export default function Header(props) {
  return (
    <HeaderStyled>
      <Link to="/">
        <img alt="NFTKeys" src="/logo.svg" />
      </Link>
    </HeaderStyled>
  );
}
