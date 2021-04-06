import React, { useState, useEffect } from "react";
import "../App.css";
import { getWeb3, getInstance } from "../Web3Util";
import { AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

/**
 * @App Build Decentralized Art Market using ERC-721
 * @Util header navigation
 * @Book Learn Ethereum
 * @author brian wu
 */
const AppNav = props => {
  const [state, setState] = useState({
    name: "",
    symbol: "",
    collapsed: false,
  });

  useEffect(  () => {
    (async  ()=> {
      const web3 = await getWeb3();
      const contractInstance = await getInstance(web3);
      window.user = (await web3.eth.getAccounts())[0];
      const symbol = await contractInstance.methods.symbol().call();
      const name = await contractInstance.methods.name().call();
      setState((prevState) => ({ ...prevState, symbol, name }));
    })();

  }, []);
  // const classes = useStyles(); 
  // TODO 
  const classes = {  toolbar: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },};

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar style={classes.toolbar} component="nav">
        <Typography
          // variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <strong>
            <i className="fa fa-coins"></i>Decentralized Art Market ({" "}
            {state.name} | {state.symbol})
          </strong>
        </Typography>
          <Link
            variant="button"
            color="textPrimary"
            href="/"
            className={classes.link}
          >
            Art Gallery
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="/publishArt"
            className={classes.link}
          >
            Publish Your Art
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="/myWallet"
            className={classes.link}
          >
            My Wallet Info
          </Link>
        {/* <Button href="#" color="primary" variant="outlined" className={classes.link}>
          Login
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}

export default AppNav;
