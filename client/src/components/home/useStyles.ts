import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage:
        'url(https://www.alpinamotorsport.com/wp-content/uploads/2019/02/Car-dealerships.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
    title: {
      color: '#fff',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;',
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 150,
    },
  })
);
export default useStyles;
