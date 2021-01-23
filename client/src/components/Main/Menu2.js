import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/core/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Menu2 (){
	const classes = useStyles();
	return(
		<AppBar position="static">
		  <Toolbar>
		    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
		      <MenuIcon />
		    </IconButton>
		    <Typography variant="h6" className={classes.title}>
		      Market Place
		    </Typography>
		    <Button color="inherit">Login</Button>
		  </Toolbar>
		</AppBar>
	)
}

export default withRouter(Menu2);