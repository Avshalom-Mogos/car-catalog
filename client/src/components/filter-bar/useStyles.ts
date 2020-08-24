import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 1),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      backgroundColor: '#fff',
      borderBottom: '1px outset ',
      height: 500,
    },
    slider: {
      width: '100%',
      maxWidth: 400,
      paddingTop: theme.spacing(6),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    filterBtn: {
      marginTop: theme.spacing(2),
      width: '100%',
      maxWidth: 300,
      margin: '0 auto',
    },
  })
);
