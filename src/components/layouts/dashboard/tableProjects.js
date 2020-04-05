import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: '100%',
    fontSize: '12px',
    paddingLeft: '5px'
  },
});

function createData(name, pnumber, openOffers, openContracts, responsibility) {
  return { name, pnumber, openOffers, openContracts, responsibility};
}

const rows = [
  createData('Mühlacker', 'P001', 6, 1, 'AV'),
  createData('Sonnenhof', 'P002', 9, 2,'RM'),
];

export default function TableProjects() {
  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.table}>Name</TableCell>
              <TableCell className={classes.table} align="right">Projekt Nr.</TableCell>
              <TableCell className={classes.table} align="right">Offene Angebote</TableCell>
              <TableCell className={classes.table} align="right">Offene Aufträge</TableCell>
              <TableCell className={classes.table} align="right">Zuständigkeit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className={classes.table} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell className={classes.table} align="right">{row.pnumber}</TableCell>
                  <TableCell className={classes.table} align="right">{row.openOffers}</TableCell>
                  <TableCell className={classes.table} align="right">{row.openContracts}</TableCell>
                  <TableCell className={classes.table} align="right">{row.responsibility}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}