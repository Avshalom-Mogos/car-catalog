import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      marginTop: theme.spacing(1),
    },
    userFeedbackContainer: {
      height: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialaAuth: {
      marginTop: theme.spacing(4),
      width: '100%',
    },
    seperator: {
      marginTop: theme.spacing(1),
    },
    or: {
      margin: '0 auto',
      transform: 'translateY(-70%)',
      backgroundColor: '#fff',
      width: 85,
      textAlign: 'center',
    },
  })
);
