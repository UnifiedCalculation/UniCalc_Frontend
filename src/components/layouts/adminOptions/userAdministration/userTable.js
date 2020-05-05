import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import {func} from "prop-types";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(firstname, lastname, id) {
  return {firstname, lastname, id};
}

export default function UserTable({employees}) {
  const classes = useStyles();

  function getEmployeeById(employeeId) {
    return employees.find(element => element.id === employeeId);
  }

  const rows = employees.map(function (item) {
    return createData(
        item.firstname,
        item.lastname,
        item.id
    )
  });

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
                    {row.firstname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.lastname}
                  </TableCell>
                  <TableCell><UserEdit employeeData={getEmployeeById(row.id)}/></TableCell>
                  <TableCell><Button variant="outlined" color="primary"><ArchiveIcon/></Button></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}