import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  // todo Make active ribbon in #FFF
  // Check following link in future: https://material-ui.com/customization/components/#overriding-with-classes
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    color: '#FFF',
    backgroundColor: '#2E75B6',
    height: '50px'
  },
  selected: {
    color: '#FFF'
  },
  naviElement: {
    color: '#D3D3D3'
  }
});


export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
      <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
      >
        <BottomNavigationAction className={classes.naviElement} label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction className={classes.naviElement} label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction className={classes.naviElement} label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
  );
}