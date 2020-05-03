import React, {useState, useEffect} from 'react';
import Logo from '../header/logo.png';
import { makeStyles } from '@material-ui/core/styles';

import * as API from '../connectionHandler/connectionHandler'


const Header = (onError) => {

  const [username,setUsername] = useState(null);

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
      marginTop: '12px',
      marginRight: '12px'
      //verticalAlign: 'top'
    },
    headerRight:{
      position: 'relative'
    }
  });

  useEffect(() => {
    
  },[]);

  const classes = useStyles();

  return (
      <div className={classes.header}>
        <a href='/'>
        <img className={classes.logo} src={Logo} alt={'Logo uniCalc'} height={'50px'}/>
        </a>
        <div className={classes.headerRight}>
          <div className={classes.username}>{username}</div>
        </div>

      </div>
  );
};

export default Header;