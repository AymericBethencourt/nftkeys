import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { transactions, cryptography, Buffer } from "@liskhq/lisk-client";
import { GameStyled } from "./Game.style";

import PurchaseNFTTokenDialog from "./dialogs/PurchaseNFTTokenDialog";

export default function Game(props) {
  const [openPurchase, setOpenPurchase] = useState(false);
  const base32UIAddress = cryptography
    .getBase32AddressFromAddress(
      Buffer.from(props.item.ownerAddress, "hex"),
      "lsk"
    )
    .toString("binary");

  return (
    <div>
      {props.item.minPurchaseMargin > 0 ? (
        <>
          <GameStyled
            onClick={() => {
              setOpenPurchase(true);
            }}
          >
            <img src={props.item.image} />
            <div>{props.item.name}</div>
            <div>{`${props.item.value ? props.item.value/100000000 : '--'} LSK`}</div>
            <div>{`($${props.item.value ? (props.item.value/100000000*2.49).toFixed(2) : '--'})`}</div>
          </GameStyled>
          <PurchaseNFTTokenDialog
            open={openPurchase}
            handleClose={() => {
              setOpenPurchase(false);
            }}
            token={props.item}
          />
        </>
      ) : (
        <div>Can't purchase this token</div>
      )}
    </div>
  );
}
