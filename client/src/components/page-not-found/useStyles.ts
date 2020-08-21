import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      // border: '1px solid red',
      backgroundImage:
        'url(https://trvprodcdn.azureedge.net/-/media/feature/truevalue/errorpage/404.png?modified=20190821061352&h=538&w=988&la=en&hash=3754E3A2B6BFDA9D5478DED41C914313)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
  })
);
export default useStyles;
