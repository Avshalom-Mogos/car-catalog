import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./useStyles";

const MyAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Car Catalog
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default MyAppBar;
