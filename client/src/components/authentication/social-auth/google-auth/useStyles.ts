import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import googleIcon from '../../../../assets/icons/google.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    googleBtn: {
      border: 'none',
      backgroundColor: '#fafafa',
      width: 48,
      height: 48,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    googleBtnIcon: {
      backgroundImage: `url(${googleIcon})`,
      backgroundSize: '100% 100%',
      width: '100%',
      height: '100%',
    },
  })
);
export default useStyles;
