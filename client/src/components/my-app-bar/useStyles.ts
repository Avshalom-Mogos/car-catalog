import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // border: '1px solid red',
      height: 64,
    },
    title: {
      paddingLeft: theme.spacing(5),
      position: 'relative',
      top: '50%',
    },
  })
);
