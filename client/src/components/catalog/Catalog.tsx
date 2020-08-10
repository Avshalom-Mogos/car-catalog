import React, { useState, useEffect } from 'react';
import CatalogItem from '../catalog-item/CatalogItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Car } from '../models/car';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(15),
            // '&:nth-child(even)': {
            //     backgroundColor: '#f2f2f2'
            // },
        },
    })
);


const Catalog = () => {
    const [carsList, setCarsList] = useState<Car[]>([]);
    // const [searchValue, setsearchValuet] = useState('');
    const classes = useStyles();

    console.log(carsList);


    useEffect(() => {
        //get car list from the backend
        fetch('/cars')
            .then(res => res.json())
            .then(data => setCarsList(data))
            .catch(error => console.error('Error:', error));
    }, []);


    return (
        <Container className={classes.root} maxWidth='md'>
            <Grid container spacing={3} justify="space-evenly">
                {carsList.map(car => <CatalogItem key={car.id} {...car} />)}
            </Grid>
        </Container>
    );
};
export default Catalog;