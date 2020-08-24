import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import facebookIcon from '../../assets/icons/facebook.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fbBtn: {
      border: 'none',
      backgroundColor: '#fafafa',
      width: 48,
      height: 48,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    fbBtnIcon: {
      backgroundImage: `url(${facebookIcon})`,
      backgroundSize: '100% 100%',
      width: '100%',
      height: '100%',
    },
  })
);
export default useStyles;
