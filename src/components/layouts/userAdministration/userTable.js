import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UserEdit from "./userEdit";
import ArchiveIcon from '@material-ui/icons/Archive';
import Button from "@material-ui/core/Button";



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(surname, name) {
  return { surname, name};
}

const rows = [
  createData('Adrian', 'Vieceli'),
  createData('Riccardo', 'Monteiro'),
  createData('Felix', 'von Tiedemann'),
];

export default function UserTable() {
  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vorname</TableCell>
              <TableCell>Nachname</TableCell>
              <TableCell>Einstellungen</TableCell>
              <TableCell>Archivieren</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.surname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell><UserEdit/></TableCell>
                  <TableCell><Button variant="outlined" color="primary"><ArchiveIcon/></Button></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}