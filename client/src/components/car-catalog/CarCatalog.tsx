import React, { useState, useEffect } from 'react';
import CarCatalogItem from './car-catalog-item/CarCatalogItem';
import FilterBar from '../filter-bar/FilterBar';
import PaginationBar from '../paginataion-bar/PaginationBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Car } from '../../models/car';
import { useStyles } from './useStyles';
import Spinner from '../spinner/Spinner';

const CarCatalog = () => {
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [listToDisplay, setListToDisplay] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  console.log(carsList);
  console.log(listToDisplay);

  useEffect(() => {
    //get car list from the backend
    fetch('/cars')
      .then(res => res.json())
      .then(data => {
        setCarsList([...data]);
        setListToDisplay([...data]);

        //hide spinner after data load
        setIsLoading(false);
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
      <FilterBar
        listToDisplay={listToDisplay}
        setListToDisplay={setListToDisplay}
        carsList={carsList}
      />
      {isLoading && <Spinner />}
      {!listToDisplay.length && !isLoading && (
        <p>no results found. try different filters.</p>
      )}
      <Grid container spacing={3} justify='space-evenly'>
        {paginate(listToDisplay).map(car => (
          <CarCatalogItem key={car.id} {...car} />
        ))}
      </Grid>
      <PaginationBar
        page={page}
        setPage={setPage}
        listToDisplay={listToDisplay}
      />
    </Container>
  );
};
export default CarCatalog;
