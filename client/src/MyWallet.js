import React, {useState, useContext } from 'react';
import { ArtTokenCard, WalletCard } from "./components/";
import {useFindArtTokens, useResellArt} from "./hooks/DigitalArtHooks";
import {  Container, Typography, Grid, TextField, Dialog, DialogActions, DialogTitle, DialogContent, Button} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import './App.css';
import Web3Context  from "./Web3Context";

/**
 * @App Build Decentralized Art Market using ERC-721
 * @Util my digial art wallet
 * @Book Learn Ethereum 
 * @author brian wu
 */
const  MyWallet = (props)=>{
  const web3Context = useContext(Web3Context);
  const [state, setState] =  useState({
    message: "",
    tokenId: "",
    price: 0,
    showModal: false,
  });

  const artTokens  = useFindArtTokens({filter: 'mine'});
  const {response: resellArtResponse , resellArt } = useResellArt();


  const handleChangePrice = (event) => {
    event.preventDefault();
    setState(prevState => ({ ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSellArt = (tokenId)=> {
    try {
      //open  popup window
      setState({ tokenId: tokenId, showModal: true });
    } catch (e) {
      console.log("Error", e);
    }
  }

  const handleCloseDialog = () => setState(prevState =>({...prevState, showModal: false }));

  const handleResellArt = async () => {
    await resellArt({tokenId: state.tokenId, price:state.price});
    if(resellArtResponse?.error !== null){
      window.location.reload();
    }
}

    // const classes = useStyles();
    // const useStyles = makeStyles((theme) => ({
    //   root: {
    //     width: '100%',
    //     maxWidth: 360,
    //     backgroundColor: theme.palette.background.paper,
    //   },
    // }));

    const classes = {
      root: {
        width: "100%",
        maxWidth: 360,
      },
    };
    return (
      <div>
        <section className="text-center">
          <Container maxWidth="md">
            <Typography
              component="h5"
              variant="h2"
              align="center"
              color="textPrimary"
            >
              My Wallet Arts
            </Typography>
            <WalletCard
              className={classes.root}
              user={web3Context.user}
              networkId={web3Context.networkId}
              balance={web3Context.balance}
              networkType={web3Context.networkType}
            />
                    {!!resellArtResponse?.error && ( 
                <Alert severity="error"> {resellArtResponse?.error}</Alert>
          )}
                <Container maxWidth="md">
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                    {artTokens.map((artToken) => (
                      <Grid item xs={6} key={artToken.id}>
                        <ArtTokenCard
                          title={artToken.title}
                          tokenId={artToken.id}
                          image={artToken.image}
                          price={artToken.price}
                          author={artToken.author}
                          publishDate={artToken.publishDate}
                          desc={artToken.desc}
                          onSellArt={handleSellArt}
                          status={artToken.status}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Container>
                <Dialog
                  onClose={handleCloseDialog}
                  aria-labelledby="customized-dialog-title"
                  open={state.showModal}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseDialog}
                  >
                    Sell Art
                  </DialogTitle>
                  <DialogContent dividers>
                    <TextField
                      id="price"
                      name="price"
                      label="Price (ether)"
                      placeholder="Price (ether)"
                      onChange={handleChangePrice}
                      value={state.price}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      autoFocus
                      onClick={handleCloseDialog}
                      color="secondary"
                    >
                      Close
                    </Button>
                    <Button
                      autoFocus
                      onClick={(e) =>{
                        e.preventDefault();
                        handleResellArt();
                      }}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
          </Container>
        </section>
      </div>
    );
}

export default MyWallet;
