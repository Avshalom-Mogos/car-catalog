import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Car } from '../../models/car';
import { useStyles } from './useStyles';

type props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  listToDisplay: Car[];
};

const PaginationBar = ({ page, setPage, listToDisplay }: props) => {
  const classes = useStyles();

  const setPageOnChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const calcNumOfPages: Function = (): number => {
    const carsPerPage: number = 6;
    return Math.ceil(listToDisplay.length / carsPerPage);
  };

  if (calcNumOfPages() < 2) return <></>;

  return (
    <div className={classes.pagination}>
      <Pagination
        shape='rounded'
        size='large'
        count={calcNumOfPages()}
        page={page}
        onChange={setPageOnChange}
      />
    </div>
  );
};
export default PaginationBar;
