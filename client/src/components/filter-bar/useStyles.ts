import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{padding :theme.spacing(3)},
        slider: {
            width: 250,
        },
        margin: {
            height: theme.spacing(3),
        },
    }),
);