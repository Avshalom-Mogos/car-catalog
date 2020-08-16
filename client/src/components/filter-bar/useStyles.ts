import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    slider: {
      width: 250,
      paddingTop: theme.spacing(6),
      paddingLeft: theme.spacing(2),
    },
    button: {
      position: 'relative',
      marginTop: theme.spacing(2),
      display: 'inline-block',
      left: '50%',
      transform: 'translate(-50%)',
    },
  })
);
