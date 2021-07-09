import React, { useEffect, useState, createContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as api from "./api";
import { NodeInfoContext, nodeInfoContextDefaultValue } from "./context";
import HomePage from "./components/HomePage";
import TransactionsPage from "./components/TransactionsPage";
import Header from "./components/Header";
import AccountPage from "./components/AccountPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { reducer } from "./reducer";

export const initialState = {
  passphrase: "",
  address: "",
  setAccount: () => {},
  removeAccount: () => {},
};

export const AppContext = createContext(initialState);

const useStyles = makeStyles((theme) => ({
  palette: {
    background: "#ff0000",
  },
  appBarLink: {
    margin: theme.spacing(0, 2),
    flex: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  contentContainer: {
    padding: theme.spacing(5, 0),
  },
  grow: {
    flexGrow: 1,
  },
}));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [nodeInfoState, updateNodeInfoState] = useState(
    nodeInfoContextDefaultValue
  );

  const updateHeight = async () => {
    const info = await api.fetchNodeInfo();

    updateNodeInfoState({
      networkIdentifier: info.networkIdentifier,
      minFeePerByte: info.genesisConfig.minFeePerByte,
      height: info.height,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const info = await api.fetchNodeInfo();
      updateNodeInfoState({
        networkIdentifier: info.networkIdentifier,
        minFeePerByte: info.genesisConfig.minFeePerByte,
        height: info.height,
      });
      setInterval(updateHeight, 1000);
    }
    fetchData();
  }, []);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <AppContext.Provider
      value={{
        passphrase: state.passphrase,
        address: state.address,
        setAccount: (passphrase, address) =>
          dispatch({
            type: "set-account",
            payload: { passphrase, address },
          }),
        removeAccount: () => dispatch({ type: "remove-account" }),
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <NodeInfoContext.Provider value={nodeInfoState}>
          <Router>
            <Header />

            <Container className={classes.contentContainer}>
              <Switch>
                <Route path="/" exact>
                  <HomePage />
                </Route>

                <Route path="/accounts/:address" component={AccountPage} />
                <Route path="/transactions" component={TransactionsPage} />
              </Switch>
            </Container>
          </Router>
        </NodeInfoContext.Provider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
