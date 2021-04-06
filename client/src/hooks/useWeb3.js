import  { useState, useEffect } from 'react';
import { getWeb3, getInstance}  from "../Web3Util";

const useWeb3 = ()=> {
    const [state, setState] =  useState({
        user: "",
        balance: 0,
        contractInstance: "",
        networkId: "",
        networkType: "",
        web3: undefined,
      });

    useEffect(()=>{
        async function loadWeb3 () {
          const web3 = await getWeb3();
          const user = (await web3.eth.getAccounts())[0];
          const balanceInWei = await web3.eth.getBalance(user);
          var balance = web3.utils.fromWei(balanceInWei, "ether");
          const networkId = await web3.eth.net.getId();
          const networkType = await web3.eth.net.getNetworkType();
          const contractInstance = await getInstance(web3);
        //   TODO - REMOVE window assignments 
          window.web3 = web3;
          window.user = user;
          setState({ user: user, 
            balance: balance, 
            contractInstance: contractInstance,
            networkId: networkId ,
            networkType: networkType,
            web3: web3,
           });
        }
        loadWeb3();
      },[ ]);
      return {...state} ;
  }
  export default useWeb3;