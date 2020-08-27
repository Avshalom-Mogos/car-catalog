import React, { useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Car } from '../../models/car';
import { useStyles } from './useStyles';

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  listToDisplay: Car[];
};

const PaginationBar = ({ page, setPage, listToDisplay }: Props) => {
  const classes = useStyles();

  useEffect(() => {
    //reset the page to 1 when listToDisplay changes
    setPage(1);
  }, [listToDisplay, setPage]);

  const setPageOnChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const calcNumOfPages = () => {
    const carsPerPage = 6;
    return Math.ceil(listToDisplay.length / carsPerPage);
  };

  const minPages = 2;
  if (calcNumOfPages() < minPages) return <></>;

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
