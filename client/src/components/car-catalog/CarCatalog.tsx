import React, { useState, useEffect, useContext } from 'react';
import CarCatalogItem from './car-catalog-item/CarCatalogItem';
import FilterForm from '../filter-bar/FilterForm';
import PaginationBar from '../paginataion-bar/PaginationBar';
import Grid from '@material-ui/core/Grid';
import { getCarsList } from '../../api/cars';
import { Car } from '../../models/car';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import Spinner from '../spinner/Spinner';
import useStyles from './useStyles';

const CarCatalog = () => {
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [listToDisplay, setListToDisplay] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { isUserLoggedIn } = useContext(IsUserLoggedInContext);
  const classes = useStyles();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const user = JSON.parse(localStorage.car_catalog_login);
        const { authProvider, accessToken } = user;
        const fetchedCarslist: Car[] = await getCarsList(
          accessToken,
          authProvider
        );
        setCarsList(fetchedCarslist);
        setListToDisplay(fetchedCarslist);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const loaderIfNeeded: boolean | JSX.Element = isLoading && <Spinner />;
  const numOfResults = !isLoading && (
    <p className={classes.numOfResults}>{listToDisplay.length} Matches</p>
  );
  const noResults: boolean | JSX.Element = !listToDisplay.length &&
    !isLoading && <p>no results found. try different filters.</p>;

  const paginate = (listToDisplay: Car[]): Car[] => {
    const carsPerPage = 6;
    const endIndex = page * carsPerPage;
    const startIndex = endIndex - carsPerPage;
    const partialCarList = listToDisplay.slice(startIndex, endIndex);
    return partialCarList;
  };

  if (!isUserLoggedIn) return <Redirect to='/signin' />;

  return (
    <Container maxWidth='md'>
      <FilterForm
        listToDisplay={listToDisplay}
        setListToDisplay={setListToDisplay}
        carsList={carsList}
      />
      {numOfResults}
      {loaderIfNeeded}
      {noResults}
      <Grid container spacing={3} justify='space-evenly'>
        {paginate(listToDisplay).map(car => (
          <CarCatalogItem key={car._id} {...car} />
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
