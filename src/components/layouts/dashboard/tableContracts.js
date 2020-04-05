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

function createData(name, offerNumber, responsibility) {
  return { name, offerNumber, responsibility};
}

const rows = [
  createData('Elektroinstallation 1OG', 'O001', 'AV'),
  createData('SmartHome Installation', 'O002', 'RM'),
];

export default function TableContracts() {
  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.table}>Bezeichnung</TableCell>
              <TableCell className={classes.table} align="right">Angebot Nr.</TableCell>
              <TableCell className={classes.table} align="right">Zuständigkeit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow  key={row.name}>
                  <TableCell className={classes.table} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell className={classes.table} align="right">{row.offerNumber}</TableCell>
                  <TableCell className={classes.table} align="right">{row.responsibility}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}