import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Car } from '../../models/car';


const CatalogItem = ({ id, brand, modelDate, price, image }: Car) => {

    const useStyles = makeStyles({
        root: {
            maxWidth: 300
        },
        media: {
            height: 170,
        },
    });

    const classes = useStyles();
    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className={classes.root}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                    // title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {brand}
                            <p>{id}</p>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {modelDate}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {price}
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                            </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
export default CatalogItem;