import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    numOfResults: {
      margin: theme.spacing(3,2),
      fontWeight: 600,
      fontSize:18
    },
  })
);
export default useStyles;
