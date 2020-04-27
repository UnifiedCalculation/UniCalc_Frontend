import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ArticleTable = ({ articles, discount, ...props }) => {

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
    title: {
      fontWeight: 700,
    },
    singleRow: {
      "&:hover":{
        backgroundColor: '#fafafa',
      }
    }
  });

  const classes = useStyles();

  const entries = articles.map((entry, index) => (
    <TableRow className={classes.singleRow} key={index + entry.name + entry.amount} onClick={() => alert('this works wow')}>
      <TableCell component="th" scope="row">
        {entry.name}
      </TableCell>
      <TableCell align="right">{entry.amount}</TableCell>
      <TableCell align="right">{entry.unit}</TableCell>
      <TableCell align="right">{entry.price}</TableCell>
      <TableCell align="right">{(entry.discount ? entry.discount : 0).toFixed(2).toString().concat("%")}</TableCell>
      <TableCell align="right">{(entry.discount ? entry.amount * entry.price * (1 - (entry.discount / 100)) : entry.amount * entry.price).toFixed(2)}</TableCell>
    </TableRow>
  ))

  var total = 0;

  articles.forEach(entry => {
    if (entry.discount) {
      total += entry.amount * entry.price * (1 - (entry.discount / 100));
    } else {
      total += entry.amount * entry.price;
    }
  });

  total *= discount ? (1 - (discount / 100)) : 1;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.title}>Artikel</TableCell>
            <TableCell className={classes.title} align="right">Anzahl</TableCell>
            <TableCell className={classes.title} align="right">Einheit</TableCell>
            <TableCell className={classes.title} align="right">Preis</TableCell>
            <TableCell className={classes.title} align="right">Rabatt</TableCell>
            <TableCell className={classes.title} align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries}
          <TableRow>
            <TableCell component="th" scope="row" className={classes.title}>
              Total
              </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{(discount ? discount : 0).toFixed(2).toString().concat("%") }</TableCell>
            <TableCell align="right">{total.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ArticleTable;