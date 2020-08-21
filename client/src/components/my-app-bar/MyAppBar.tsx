import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { IsUserLoggedInContext } from '../../contexts/IsUserLoggedIn';
import { Link, useHistory } from 'react-router-dom';
import { useStyles } from './useStyles';

const MyAppBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setIsUserLoggedIn, isUserLoggedIn } = useContext(
    IsUserLoggedInContext
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsUserLoggedIn(false);
    history.push('/');
    handleClose();
  };

  const greetUser = isUserLoggedIn
    ? `Welcome ${JSON.parse(localStorage.car_catalog_login).name}`
    : `Welcome Guest`;

  const getMenuItems = () => {
    if (isUserLoggedIn) {
      return (
        <div>
          <MenuItem onClick={handleClose}>
            <Link className={classes.menuItem} to='/catalog'>
              Catalog
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>logout</MenuItem>
        </div>
      );
    }
    return (
      <MenuItem onClick={handleClose}>
        <Link className={classes.menuItem} to='/signIn'>
          Sign in
        </Link>
      </MenuItem>
    );
  };

  return (
    <AppBar className={classes.root} position='static'>
      <Container maxWidth='md' className={classes.container}>
        <Typography
          className={classes.brand}
          component={Link}
          to='/'
          variant='h5'
          noWrap
        >
          Driver Deals
        </Typography>
        <div>
          <IconButton
            aria-label='show more'
            aria-haspopup='true'
            color='inherit'
            onClick={handleClick}
          >
            <MoreIcon />
          </IconButton>

          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{greetUser}</MenuItem>
            {getMenuItems()}
          </Menu>
        </div>
      </Container>
    </AppBar>
  );
};
export default MyAppBar;
