import React, {useState} from 'react';
import './App.css';
import {  Container, Typography, Grid ,   Button,
    Card,
    CardMedia,
    CardActions,
    CardContent,
    CardHeader,
    TextField,Select, FormControl,  MenuItem,InputLabel
    } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {useCreateTokenAndSellArt} from "./hooks/DigitalArtHooks";

/**
 * @App Build Decentralized Art Market using ERC-721
 * @Util Publish artwork
 * @CreditTo  https://github.com/PacktPublishing/Learn-Ethereum 
 * @author christopher chavez
 */
    const PublishArt = (props) =>{
        const {response: createTokenAndSellArtResponse, createTokenAndSellArt } = useCreateTokenAndSellArt();
        const [state, setState] =  useState({ 
            isFetching: false,
            imageValue: 'images/a-moment-of-silence.png',
            description: '',
            title: '', 
            authorName: '',
            price: 0,
            date:'',
            error: undefined,
        });
        const handleImageChange = (event) => setState(prevState => ({ ...prevState, imageValue: event.target.value }));
        const handleSubmit = (event) => {
            event.preventDefault();
            const {  imageValue, description, title, authorName, price, date} = state;
            if(isNotEmpty(title) &&isNotEmpty(description) &&isNotEmpty(authorName) 
                &&isNotEmpty(date)&&isNotEmpty(imageValue) && isNotEmpty(price)) {
                publishArt({title, description, date, authorName, price, imageValue});  
            }else{
                setState(prevState => ({ ...prevState, error: "Input data incorrect." }));
            }
        };
        const isNotEmpty= (val) =>val && val.length>0;
        const handleFormChange = event => {
            setState(prevState => ({ ...prevState,
                [event.target.name]: event.target.value
                }))
        };
        const  publishArt = async (tokenArt) =>{
                await createTokenAndSellArt(tokenArt)
                props.history.push(`/home`)
                window.location.reload(); 
        }        
        // style={{ marginTop: '20px'}}
        return (
            <div>
                <section className="text-center">
                <Typography component="h5"  variant="h2"  align="center"  color="textPrimary">
                    Publish Your Art
                </Typography>
                <Container maxWidth="md">
                {!!createTokenAndSellArtResponse?.error && ( 
                <Alert severity="error"> {createTokenAndSellArtResponse?.error}</Alert>
                )}
                {!!state.error && ( 
                <Alert severity="error"> {state.error}</Alert>
                )} 
                <form className="text-center border border-light p-5" noValidate onSubmit={handleSubmit} >
                <Card>
                <CardContent>
                <CardHeader
            // title="Submit your digital art today"
            // subheader={`TokenId: ${props.tokenId}`}
            titleTypographyProps={{ align: "center" }}
            subheaderTypographyProps={{ align: "center" }}
            // action={"Pro" === "Pro" ? "StarIcon" : null}
            //  className={classes.cardHeader}
          ></CardHeader>
          {/* className={classes.form}  */}
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}><TextField  margin="dense" required fullWidth id="title" name="title" label="Title" placeholder="Title"  autoComplete="off" autoFocus onChange={handleFormChange}  value={state.title}/></Grid>
          <Grid item xs={12} sm={6}><TextField  margin="dense" required fullWidth id="authorName" name="authorName" label="Author Name" placeholder="Author Name"  autoComplete="off" autoFocus onChange={handleFormChange}  value={state.authorName}/></Grid>
          <Grid item xs={24} sm={12}><TextField  margin="dense" required fullWidth id="description" name="description" label="Description" placeholder="Description"  autoComplete="off" autoFocus onChange={handleFormChange}  value={state.description}/></Grid>
                </Grid>            
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}><TextField  margin="dense" required fullWidth id="price" name="price" label="Price (ether)" placeholder="Price (ether)"  autoComplete="off" autoFocus onChange={handleFormChange}  value={state.price}/></Grid>
    <Grid item xs={12} sm={6}><TextField type="date" margin="dense" required fullWidth id="date" name="date" label="Date" placeholder="Date"  autoComplete="off" autoFocus onChange={handleFormChange}  value={state.date}
                    InputLabelProps={{
                        shrink: true,
                      }}
                /></Grid>
    </Grid>
    <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormControl margin="dense"  fullWidth>
                <InputLabel id="image-select-label">Art</InputLabel>
                <Select
                labelId="image-select-label"
                id="image-select"
                onChange={handleImageChange} value={state.imageValue}>
                <MenuItem value="images/a-moment-of-silence.png">a-moment-of-silence.png</MenuItem>
                <MenuItem value="images/Finchwing.png">Finchwing.png</MenuItem>
                <MenuItem value="images/girl-and-bird.png">girl-and-bird.png</MenuItem>
                <MenuItem value="images/kitty.png">kitty.png</MenuItem>
                <MenuItem value="images/margay-cat.png">margay-cat.png</MenuItem>
                <MenuItem value="images/Nighthill.png">Nighthill.png</MenuItem>
                <MenuItem value="images/storm.png">storm.png</MenuItem>          
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
    
          <CardMedia
              // className={classes.media}
              className="img-fluid"
              image={state.imageValue} 
              title={"Art"}
            />
            </Grid>
        </Grid>
                {/* <img className="imgBox z-depth-4 rounded" alt="art" src={state.imageValue} /> */}
                {/* <button className="btn btn-info btn-block" type="submit">Publish</button>                                     */}
            </CardContent>
            <CardActions>
            <Button variant="contained"  color="primary" type="submit"
            //   onClick={(e) => {
            //     e.preventDefault();
            //     props.onBuyArt(props.tokenId, props.price);
            //   }}
            >
              Publish
            </Button>
            </CardActions>
                            </Card>
                            </form>
                </Container>
                </section>
        </div>
    );
    }

  export default PublishArt;