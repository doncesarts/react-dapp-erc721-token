import React  from 'react';
import "./App.css";
import { ArtTokenCard } from "./components/";
import {useFindArtTokens, useBuySellArt} from "./hooks/DigitalArtHooks";
import { Alert } from "@material-ui/lab";
import {  Container, Typography, Grid } from "@material-ui/core";

const ArtHome = (props)=>{
  const artTokens  = useFindArtTokens({filter: 'pending'});
  const {response: buyArtResponse , buyArt } = useBuySellArt();

  const handleBuyArt = async (tokenId, price) => {
      await buyArt({tokenId, price});
      console.log(buyArtResponse);
      
      if(buyArtResponse?.error !== null){
        window.location.reload();
      }
  }
  return (
    <div>
      <section className="text-center">
      <Typography component="h5"  variant="h2"  align="center"  color="textPrimary">
        Buy/Sell Digital Art on our Art Gallery
        </Typography>
        <Container maxWidth="md">
        {!!buyArtResponse?.error && ( 
                <Alert severity="error"> {buyArtResponse?.error}</Alert>
          )}
          {artTokens.length > 0  && (
          <Grid container direction="row" justify="center"  alignItems="center" spacing={3}>
            {artTokens.map((artToken, index) => (
                <Grid item xs={6} key={artToken.id}>
                <ArtTokenCard
                  title={artToken.title}
                  tokenId={artToken.id}
                  image={artToken.image}
                  price={artToken.price}
                  author={artToken.author}
                  publishDate={artToken.publishDate}
                  desc={artToken.desc}
                  status={artToken.status}
                  onBuyArt={handleBuyArt}
                />
              </Grid>
            ))}
          </Grid>)}
          {!artTokens.length > 0   && ( 
          <Alert severity="info">
            Publish your digital arts in blockchain today!
          </Alert>)}
        </Container>
      </section>
    </div>
  );
};
export default ArtHome;
