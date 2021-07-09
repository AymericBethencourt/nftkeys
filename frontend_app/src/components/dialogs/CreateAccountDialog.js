import React, { Fragment, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { passphrase as Passphrase, cryptography } from "@liskhq/lisk-client";
import { AppContext } from "../../App";
import { transfer } from "../../utils/transactions/transfer";
import * as api from "../../api";
import { NodeInfoContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function CreateAccountDialog(props) {
  const classes = useStyles();
  const nodeInfo = useContext(NodeInfoContext);
  const { passphrase, address, setAccount, removeAccount } =
    useContext(AppContext);

  useEffect(() => {
    if (props.open) {
      const pw = Passphrase.Mnemonic.generateMnemonic();
      const address = cryptography
        .getBase32AddressFromPassphrase(pw)
        .toString("hex");
      setAccount(pw, address);

      // Automated inital transfer to activate the address
      const fundAccount = async () => {
        const res = await transfer({
          recipientAddress: address,
          passphrase: "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready",
          amount: "1000",
          fee: "10",
          networkIdentifier: nodeInfo.networkIdentifier,
          minFeePerByte: nodeInfo.minFeePerByte,
        });
        await api.sendTransactions(res.tx);
      };

      fundAccount();
    }
  }, [props.open]);

  return (
    <Fragment>
      <Dialog open={props.open} onBackdropClick={props.handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title">
          {
            "Account created! An automated transaction of 1,000 LSK form the genesis account has been sent. Please wait 10s until it is processed."
          }
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off" className={classes.root}>
            <TextField
              label="Passphrase"
              value={passphrase}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Address"
              value={address}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
