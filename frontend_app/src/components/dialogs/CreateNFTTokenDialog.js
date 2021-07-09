import React, { Fragment, useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NodeInfoContext } from "../../context";
import { createNFTToken } from "../../utils/transactions/create_nft_token";
import * as api from "../../api";
import { Buckets, PrivateKey } from "@textile/hub";
import styled from "styled-components/macro";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export const UploaderFileSelector = styled.div`
  > input {
    display: none;
  }
`;

export const UploaderLabel = styled.label`
  padding: 30px 36px 10px 10px;
  float: right;
  cursor: pointer;
  font-weight: bold;
`;

export default function CreateNFTTokenDialog(props) {
  const nodeInfo = useContext(NodeInfoContext);
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    image: "",
    key: "",
    initValue: "",
    minPurchaseMargin: "",
    fee: "",
    passphrase: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (event) => {
    event.persist();
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSend = async (event) => {
    event.preventDefault();

    const res = await createNFTToken({
      ...data,
      networkIdentifier: nodeInfo.networkIdentifier,
      minFeePerByte: nodeInfo.minFeePerByte,
    });
    await api.sendTransactions(res.tx);
    props.handleClose();
  };

  async function handleUpload(file) {
    try {
      setIsUploading(true);

      const identity = PrivateKey.fromRandom();
      const buckets = await Buckets.withKeyInfo(
        {
          key: "bxrqd5bqaqludd3bz3uvj7qnmw4",
        },
        {
          debug: true,
        }
      );
      await buckets.getToken(identity);

      const buck = await buckets.getOrCreate("io.textile.dropzone");
      if (!buck.root) {
        throw new Error("Failed to open bucket");
      }

      const raw = await buckets.pushPath(
        buck.root.key,
        file.name,
        file.stream()
      );

      setData({
        ...data,
        image: `https://hub.textile.io/thread/bafkv4t2uqgblrc2gsgjrgc7gg2hthcu5jhnedx46gfpjj3axe6ahtuy/buckets/bafzbeig3vsanyp6xhzyduubyqh3zas4qapbc7hv75lxsngwrxxlnvfgtli/${file.name}`,
      });
      setIsUploading(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Fragment>
      <Dialog open={props.open} onBackdropClick={props.handleClose}>
        <DialogTitle id="alert-dialog-title">{"Create NFT Key"}</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              label="Game Name"
              value={data.name}
              name="name"
              onChange={handleChange}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item md={9}>
                <TextField
                  label="Game Image"
                  value={data.image}
                  name="image"
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item md={3}>
                <UploaderFileSelector>
                  <UploaderLabel htmlFor="uploader">
                    <Typography>
                      {isUploading ? "Uploading..." : "Upload"}
                    </Typography>
                  </UploaderLabel>
                  <input
                    id="uploader"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target &&
                      e.target.files &&
                      e.target.files[0] &&
                      handleUpload(e.target.files[0])
                    }
                  />
                </UploaderFileSelector>
              </Grid>
            </Grid>
            <TextField
              label="Game Key"
              value={data.key}
              name="key"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Price in LSK (1 LSK = $2.49)"
              value={data.initValue}
              name="initValue"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Margin (1 to 100 %, 0 to deactivate)"
              value={data.minPurchaseMargin}
              name="minPurchaseMargin"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Network Fee"
              value={data.fee}
              name="fee"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Passphrase"
              value={data.passphrase}
              name="passphrase"
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend}>Create NFT Key</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
