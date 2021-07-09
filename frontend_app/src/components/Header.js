import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HeaderStyled } from "./Header.style";
import CreateAccountDialog from "./dialogs/CreateAccountDialog";
import TransferFundsDialog from "./dialogs/TransferFundsDialog";
import CreateNFTTokenDialog from "./dialogs/CreateNFTTokenDialog";
import { AppContext } from "../App";

export default function Header(props) {
  const [openDialog, setOpenDialog] = useState(null);
  const { passphrase, address, setAccount, removeAccount } =
    useContext(AppContext);

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
        Create Key NFT
      </div>

      {address ? (
        <Link to={`/accounts/${address}`}>
          <div className="pretty">My Account</div>
        </Link>
      ) : (
        <div
          className="pretty"
          onClick={() => {
            setOpenDialog("CreateAccountDialog");
          }}
        >
          Create Account
        </div>
      )}

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
