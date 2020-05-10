import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton';

const ArticleTable = ({ products, discount, confirmDeleteProduct, editProduct, deactivateFunctions = false, ...props }) => {

  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
    title: {
      fontWeight: 700,
    }
  });

  const classes = useStyles();

  const entries = products && products.length ? products.map((entry, index) => (
    <TableRow className={classes.singleRow} key={index + entry.name + entry.amount} >
      <TableCell component="th" scope="row">
        {entry.name}
      </TableCell>
      <TableCell align="right">{entry.amount}</TableCell>
      <TableCell align="right">{entry.unit}</TableCell>
      <TableCell align="right">{entry.price}</TableCell>
      <TableCell align="right">{(entry.discount ? entry.discount : 0).toFixed(2).toString().concat("%")}</TableCell>
      <TableCell align="right">{(entry.discount ? entry.amount * entry.price * (1 - (entry.discount / 100)) : entry.amount * entry.price).toFixed(2)}</TableCell>
      <TableCell align="right">
        {deactivateFunctions ?
          null :
          <>
            <IconButton onClick={() => confirmDeleteProduct(entry.product_id)} >
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
            <IconButton onClick={() => editProduct(entry)}>
              <FontAwesomeIcon icon={faPen} />
            </IconButton>
          </>}
      </TableCell>
    </TableRow>
  )) : null;


  const calculateTotal = () => {
    var total = 0;
    if (products) {
      products.forEach(entry => {
        if (entry.discount) {
          total += entry.amount * entry.price * (1 - (entry.discount / 100));
        } else {
          total += entry.amount * entry.price;
        }
      });
    }
    total *= discount ? (1 - (discount / 100)) : 1;
    return total;
  }

  const tableHeader =
    <TableHead>
      <TableRow>
        <TableCell className={classes.title}>Artikel</TableCell>
        <TableCell className={classes.title} align="right">Anzahl</TableCell>
        <TableCell className={classes.title} align="right">Einheit</TableCell>
        <TableCell className={classes.title} align="right">Preis</TableCell>
        <TableCell className={classes.title} align="right">Rabatt</TableCell>
        <TableCell className={classes.title} align="right">Total</TableCell>
        <TableCell className={classes.title} align="right">Funktionen</TableCell>
      </TableRow>
    </TableHead>;

  const totalRow =
    <TableRow>
      <TableCell component="th" scope="row" className={classes.title}>
        Total
      </TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right">{(discount ? discount : 0).toFixed(2).toString().concat("%")}</TableCell>
      <TableCell align="right">{calculateTotal().toFixed(2)}</TableCell>
    </TableRow>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          {tableHeader}
          <TableBody>
            {entries}
            {totalRow}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ArticleTable;