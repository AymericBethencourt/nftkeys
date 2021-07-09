import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeaderStyled } from "./Header.style";
import CreateAccountDialog from "./dialogs/CreateAccountDialog";
import TransferFundsDialog from "./dialogs/TransferFundsDialog";
import CreateNFTTokenDialog from "./dialogs/CreateNFTTokenDialog";

export default function Header(props) {
  const [openDialog, setOpenDialog] = useState(null);

  return (
    <HeaderStyled>
      <Link to="/">
        <img alt="NFTKeys" src="/logo.svg" />
      </Link>
      
      <Link to="/transactions">Transactions</Link>

      <div
        onClick={() => {
          setOpenDialog("CreateNFTTokenDialog");
        }}
      >
        Create NFT
      </div>

      <div
        onClick={() => {
          setOpenDialog("TransferFundsDialog");
        }}
      >
        Transfer Funds
      </div>

      <div
        onClick={() => {
          setOpenDialog("CreateAccountDialog");
        }}
      >
        Create Account
      </div>

      <CreateNFTTokenDialog
        open={openDialog === "CreateNFTTokenDialog"}
        handleClose={() => {
          setOpenDialog(null);
        }}
      />

      <CreateAccountDialog
        open={openDialog === "CreateAccountDialog"}
        handleClose={() => {
          setOpenDialog(null);
        }}
      />

      <TransferFundsDialog
        open={openDialog === "TransferFundsDialog"}
        handleClose={() => {
          setOpenDialog(null);
        }}
      />
    </HeaderStyled>
  );
}
