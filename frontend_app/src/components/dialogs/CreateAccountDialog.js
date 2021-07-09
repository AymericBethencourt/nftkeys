import React, { Fragment, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { passphrase as Passphrase, cryptography } from "@liskhq/lisk-client";
import {AppContext} from '../../App'

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function CreateAccountDialog(props) {
  const classes = useStyles();
  const {passphrase, address, setAccount, removeAccount} = useContext(AppContext);

  useEffect(() => {
    const pw = Passphrase.Mnemonic.generateMnemonic();
    const address = cryptography
      .getBase32AddressFromPassphrase(pw)
      .toString("hex");
    setAccount(pw, address);
  }, [props.open]);

  return (
    <Fragment>
      <Dialog open={props.open} onBackdropClick={props.handleClose} fullWidth>
        <DialogTitle id="alert-dialog-title">{"Account created!"}</DialogTitle>
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
