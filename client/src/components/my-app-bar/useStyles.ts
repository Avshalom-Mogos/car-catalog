import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 64,
    },
    container: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
);
