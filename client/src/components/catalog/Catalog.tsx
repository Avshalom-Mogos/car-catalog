import React, { useState, useEffect } from 'react';
import CatalogItem from '../catalog-item/CatalogItem';
import PaginationBar from '../paginataion-bar/PaginationBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Car } from '../../models/car';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(10),
            // '&:nth-child(even)': {
            //     backgroundColor: '#f2f2f2'
            // },
        },
    })
);


const Catalog = () => {
    const [carsList, setCarsList] = useState<Car[]>([]);
    const [listToDisplay, setListToDisplay] = useState<Car[]>([]);
    const [page, setPage] = useState(1);
    const classes = useStyles();
    // const [searchValue, setsearchValuet] = useState('');



    useEffect(() => {
        //get car list from the backend
        fetch('/cars')
            .then(res => res.json())
            .then(data => {
                setCarsList(data);
                setListToDisplay(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);


    const paginate = (listToDisplay: Car[]): Car[] => {
        const carsPerPage: number = 6;
        const endIndex: number = page * carsPerPage;
        const startIndex: number = endIndex - carsPerPage;
        const partialList: Car[] = listToDisplay.slice(startIndex, endIndex);
        return partialList;
    };


    return (
        <Container className={classes.root} maxWidth='md'>
            <Grid container spacing={3} justify="space-evenly">
                {paginate(listToDisplay).map(car => <CatalogItem key={car.id} {...car} />)}
            </Grid>
            <PaginationBar
                page={page}
                setPage={setPage}
            />
        </Container>
    );
};
export default Catalog;