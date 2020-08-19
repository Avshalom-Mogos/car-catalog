import React, { useState, useEffect, useContext } from 'react';
import CarCatalogItem from './car-catalog-item/CarCatalogItem';
import FilterBar from '../filter-bar/FilterBar';
import PaginationBar from '../paginataion-bar/PaginationBar';
import Grid from '@material-ui/core/Grid';
import { getCarsList } from '../../api/cars';
import { Car } from '../../models/car';
import { Redirect } from 'react-router-dom';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import Spinner from '../spinner/Spinner';

const CarCatalog = () => {
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [listToDisplay, setListToDisplay] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { isUserLoggedIn } = useContext(IsUserLoggedInContext);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const fetchedCarslist = await getCarsList();
        setCarsList(fetchedCarslist);
        setListToDisplay(fetchedCarslist);
      } catch (err) {
        console.error('Error from cars catalog');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const loaderIfNeeded: boolean | JSX.Element = isLoading && <Spinner />;
  const noResults: boolean | JSX.Element = !listToDisplay.length &&
    !isLoading && <p>no results found. try different filters.</p>;

  const paginate = (listToDisplay: Car[]): Car[] => {
    const carsPerPage: number = 6;
    const endIndex: number = page * carsPerPage;
    const startIndex: number = endIndex - carsPerPage;
    const partialList: Car[] = listToDisplay.slice(startIndex, endIndex);
    return partialList;
  };

  if (!isUserLoggedIn) return <Redirect to='/signin' />;

  return (
    <>
      <FilterBar
        listToDisplay={listToDisplay}
        setListToDisplay={setListToDisplay}
        carsList={carsList}
      />
      {loaderIfNeeded}
      {noResults}
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
    </>
  );
};
export default CarCatalog;
