import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useStyles } from './useStyles';


type props = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationBar = ({ page, setPage }: props) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const classes = useStyles();

    return (
        <div className={classes.pagination}>
            <Pagination
                shape="rounded"
                size="large"
                count={4}
                page={page}
                onChange={handleChange}
            />
        </div>
    );
};
export default PaginationBar;