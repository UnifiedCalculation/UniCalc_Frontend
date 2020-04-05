import React from 'react';
import Logo from './logo.png';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header:{
    height: '50px',
    width: '100vw',
    top: '0px',
    backgroundColor: '#2E75B6',
  },
  logo:{
    float: 'left',
  },
  options:{
    float: 'right',
    paddingLeft: '10px',
    paddingRight: '5px',
    marginTop: '5px'
  },
  username:{
    color: '#FFF',
    float: 'right',
    marginTop: '12px'
    //verticalAlign: 'top'
  },
  headerRight:{
    position: 'relative'
  }
});


const Header = () => {
  const classes = useStyles();

  return (
      <div className={classes.header}>
        <img className={classes.logo} src={Logo} alt={'Logo uniCalc'} height={'50px'}/>
        <div className={classes.headerRight}>
          <SettingsIcon className={classes.options} style={{fill: "white", fontSize: 40}}/>
          <div className={classes.username}>Username</div>
        </div>

      </div>
  );
};

export default Header;