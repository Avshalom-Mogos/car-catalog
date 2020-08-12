import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Car } from "../../models/car";
import { useStyles } from "./useStyles";

const CatalogItem = ({ brand, modelDate, model, price, image }: Car) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className={classes.root}>
      <Card>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {brand}
            </Typography>
            <Typography variant="body2" component="p">
              {model}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {modelDate}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            ${price}
          </Button>
          <Button size="small" color="primary">
            {/* Learn More */}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default CatalogItem;
