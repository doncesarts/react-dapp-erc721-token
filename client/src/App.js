import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import AppNav from "./components/AppNav";
import Web3Context  from "./Web3Context";
import useWeb3 from './hooks/useWeb3';

/**
 * @App Build Decentralized Art Market using ERC-721
 * @Util initial App build main class
 * @CreditTo  https://github.com/PacktPublishing/Learn-Ethereum
 * @author christopher chavez
 */
const App = (props)=>{
  const web3Context = useWeb3();

  return (
    <React.Fragment>
      <CssBaseline />
      <Web3Context.Provider value={web3Context}>
      <div className="App">
        <Container maxWidth="lg">
          <AppNav />
          <Router>
            <div>
              <main>
                <Routes />
              </main>
            </div>
          </Router>
        </Container>
      </div>
      </Web3Context.Provider>
    </React.Fragment>
  );
};

export default App;
