import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            padding: theme.spacing(2),
        },
    }),
);