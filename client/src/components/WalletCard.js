import React from "react";
import {   Grid,
    Card,
    CardContent,
     ListItemIcon, 
  List, ListItem, ListItemText
  } from "@material-ui/core";
  import Wifi from '@material-ui/icons/Wifi';
  import PermIdentity from '@material-ui/icons/PermIdentity';
  import AccountBalance from '@material-ui/icons/AccountBalance';
  import Lock from '@material-ui/icons/Lock';

/**
 * @App Build Decentralized Art Market using ERC-721
 * @Util aution house for digial art
 * @Book Learn Ethereum
 * @author brian wu
 */
const WalledCard = (props) => {
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
    width: '100%',
    maxWidth: 360,
  }
}
  return (
    <Card className={classes.root} variant="outlined">
    <CardContent>
    <Grid container direction="row" justify="center"  alignItems="center" spacing={3}>
      <Grid item xs={6} >
    <List  dense className={classes.root} aria-label="wallet">
      <ListItem >
        <ListItemIcon>
          <PermIdentity />
        </ListItemIcon>
        <ListItemText primary="My Address" secondary={props.user} />
      </ListItem>
      <ListItem >
      <ListItemIcon>
          <Wifi />
        </ListItemIcon>
      <ListItemText primary="NetworkId" secondary={props.networkId} />
      </ListItem>
    </List>
    </Grid>
    <Grid item xs={6} >
    <List  dense className={classes.root} aria-label="wallet">
      <ListItem >
      <ListItemIcon>
          <AccountBalance />
        </ListItemIcon>
      <ListItemText primary="Balance" secondary={props.balance}/>
      </ListItem>
      <ListItem >
      <ListItemIcon>
          <Lock />
        </ListItemIcon>
      <ListItemText primary="NetworkType" secondary={props.networkType} />
      </ListItem>    
    </List>
    </Grid>                    
    </Grid>
    </CardContent>
  </Card>
  );
};

export default WalledCard;
