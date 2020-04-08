import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const ArticleTable = ({ articles, ...props }) => {

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artikel</TableCell>
            <TableCell align="right">Anzahl</TableCell>
            <TableCell align="right">Einheit</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="right">Rabatt</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((entry, index) => (
            <TableRow key={index + entry.name + entry.amount}>
              <TableCell component="th" scope="row">
                {entry.name}
              </TableCell>
              <TableCell align="right">{entry.amount}</TableCell>
              <TableCell align="right">{entry.unit}</TableCell>
              <TableCell align="right">{entry.price}</TableCell>
              <TableCell align="right">{entry.discount ? entry.discount : 0}</TableCell>
              <TableCell align="right">{(entry.discount ? entry.amount*entry.price*(1-(entry.discount/100)) : entry.amount*entry.price).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ArticleTable;