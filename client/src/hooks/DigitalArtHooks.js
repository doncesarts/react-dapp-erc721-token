import  { useState, useEffect, useCallback , useContext} from 'react';
import Web3Context  from "../Web3Context";

export const useFindArtTokens =(props)=>{
  const { web3, contractInstance} = useContext(Web3Context);
    const { filter} = props;
    const [artTokens, setArtTokens] =  useState([]);
    useEffect(()=>{
        const findArt = async (_web3, tokenId) => {
          const artFind = await contractInstance.methods
            .findArt(tokenId)
            .call();
          let [
            id,
            title,
            desc,
            price,
            status,
            date,
            authorName,
            author,
            owner,
            image,
          ] = Object.values(artFind);
          //  rename object props to make it easier to work with
          const artToken = {
            id,
            title,
            desc,
            price: _web3.utils.fromWei(price, "ether"),
            status: status === 1 ? "In selling" : "Publish",
            date,
            authorName,
            author,
            owner,
            image,
          };
          return artToken;
        }
        const loadDigitalArts = async( findArts )=> {
          try {
            const result = await findArts().call();
            const tokenIds = Array.isArray(result) ? result: Object.values(result)[0];
            const _artTokens = await Promise.all(tokenIds.map((tokenId) => findArt(web3, tokenId)));
            setArtTokens(_artTokens);
            return;
          } catch (e) {
            setArtTokens([]);
            console.log("Error", e);
          }
        }
    
        if(!!web3){
          const criteria = filter ==='mine' ? contractInstance.methods.findMyArts : contractInstance.methods.findAllPendingArt;
          loadDigitalArts(criteria);
        }
    
      },[web3, contractInstance, filter]);
      
    return artTokens;
};


export const useCreateTokenAndSellArt = (props) =>{
  const web3Context = useContext(Web3Context);
  const { web3, contractInstance, user } = web3Context;
  const [response, setResponse] = useState({
    data: null,
    isFetching: false,
    error: null,
  });

const createTokenAndSellArt = useCallback(async (artToken) => {
    const {title, description, date, authorName, price, imageValue} = artToken;
    const { utils} = web3;
    const priceInWei =  utils.toWei(price, 'ether');
    try {
        await contractInstance.methods.createTokenAndSellArt(title,description, date, authorName, priceInWei, imageValue).send({ from: user})
        setResponse({ isFetching: false });
    } catch (e) {
      console.log('Error', e)
      setResponse({
        isFetching: false,
        error: e.message,
      })
    }
      },[contractInstance.methods, web3, user ]);
      return {
        response,
        createTokenAndSellArt,
      };
}

export const useBuySellArt = (props) =>{
  const web3Context = useContext(Web3Context);
  const { web3, contractInstance, user } = web3Context;
  const [response, setResponse] = useState({
    data: null,
    isFetching: false,
    error: null,
  });

const buyArt = useCallback(async (artToken) => {
    const {tokenId, price} = artToken;
    const {utils} = web3;
    const priceInWei =  utils.toWei(price, 'ether');
    try {
        await contractInstance.methods.buyArt(tokenId).send({
          from: user,
          gas: 6000000,
          value: priceInWei,
        });
        setResponse({ isFetching: false });
    } catch (e) {
      console.log('Error', e)
      setResponse({
        isFetching: false,
        error: e.message,
      })
    }
      },[contractInstance.methods, web3, user ]);

  return { response, buyArt };
}


export const useResellArt = (props) =>{
  const web3Context = useContext(Web3Context);
  const { web3, contractInstance, user } = web3Context;
  const [response, setResponse] = useState({
    data: null,
    isFetching: false,
    error: null,
  });

const resellArt = useCallback(async (artToken) => {
    const {tokenId, price} = artToken;
    const {utils} = web3;
    const priceInWei =  utils.toWei(price, 'ether');
    try {
        await contractInstance.methods.resellArt(tokenId, priceInWei).send({
          from: user,
          gas: 6000000,
        });
        setResponse({ isFetching: false });
    } catch (e) {
      console.log('Error', e)
      setResponse({
        isFetching: false,
        error: e.message,
      })
    }
      },[contractInstance.methods, web3, user ]);

  return { response, resellArt };
}