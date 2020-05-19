import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton';

import ArticleTableEntry from './articleTableEntry';
import ArticleTableHead from './articleTableHead';

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
    <ArticleTableEntry entry={entry} className={classes.singleRow} key={index + entry.name + entry.amount} >
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
      </ArticleTableEntry>
  )) : null;


  const calculateTotal = () => {
    var total = 0;
    if (products) {
      products.forEach(entry => {
        if (entry.discount) {
          total += Number(entry.amount) * Number(entry.price) * (1 - (Number(entry.discount) / 100));
        } else {
          total += Number(entry.amount) * Number(entry.price);
        }
      });
    }
    total *= discount ? (1 - (Number(discount) / 100)) : 1;
    return total;
  }

  const tableHeader = <ArticleTableHead />;

  const totalRow =
    <TableRow>
      <TableCell component="th" scope="row" className={classes.title}>
        Total
      </TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right">{Number((discount ? discount : 0)).toFixed(2).toString().concat("%")}</TableCell>
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