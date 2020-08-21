import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 64,
      backgroundColor:'#1976d2'
    },
    container: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brand: {
      color: '#fff',
      textDecoration: 'none',
    },
    showMore: {
      color: '#fff',
    },
    menuItem: {
      width: 'auto',
      overflow: 'hidden',
      fontSize: '1rem',
      boxSizing: 'border-box',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      lineHeight: '1.5',
      paddingTop: '6px',
      whiteSpace: 'nowrap',
      letterSpacing: '0.00938em',
      paddingBottom: '6px',
      textDecoration: 'none',
      color: '#000',
    },
  })
);
