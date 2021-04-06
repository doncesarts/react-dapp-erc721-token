import React from "react";

const Web3Context = React.createContext({
  user: undefined,
  contractInstance: undefined,
  networkId: undefined,
  networkType: undefined,
  web3: undefined,
});
export default Web3Context;
