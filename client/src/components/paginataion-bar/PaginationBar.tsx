import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Car } from "../../models/car";
import { useStyles } from "./useStyles";

type props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  listToDisplay: Car[];
};

const PaginationBar = ({ page, setPage, listToDisplay }: props) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const numOfPages: Function = (): number => {
    return Math.floor(listToDisplay.length / 6);
  };

  const classes = useStyles();

  if (numOfPages()) return <></>; //fix this

  return (
    <div className={classes.pagination}>
      <Pagination
        shape="rounded"
        size="large"
        count={numOfPages()}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};
export default PaginationBar;
