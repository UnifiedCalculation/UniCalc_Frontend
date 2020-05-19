import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const ArticleTableEntry = ({ entry, children, onClick, ...props }) => {

  return (
      <TableRow onClick={onClick} hover={onClick ? true : false}>
        <TableCell component="th" scope="row">
          {entry.name}
        </TableCell>
        <TableCell align="right">{entry.amount}</TableCell>
        <TableCell align="right">{entry.unit}</TableCell>
        <TableCell align="right">{entry.price}</TableCell>
        <TableCell align="right">{Number((entry.discount ? entry.discount : 0)).toFixed(2).toString().concat("%")}</TableCell>
        <TableCell align="right">{(entry.discount ? Number(entry.amount) * Number(entry.price) * (1 - (Number(entry.discount) / 100)) : Number(entry.amount) * Number(entry.price)).toFixed(2)}</TableCell>
        <TableCell align="right">
          {children}
        </TableCell>
      </TableRow>
  );
}

export default ArticleTableEntry;