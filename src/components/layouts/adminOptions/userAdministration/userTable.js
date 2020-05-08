import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditEmployeeDialog from "./editEmployeeDialog";
import ArchiveIcon from '@material-ui/icons/Archive';
import Button from "@material-ui/core/Button";
import {updateEmployee} from "../../../connectionHandler/connectionHandler";


function createData(firstname, lastname, id) {
  return {firstname, lastname, id};
}

export default function UserTable({employees, getEmployees, setErrorMessage}) {

  const [showEditEmployeeDialog, setShowEditEmployeeDialog] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    button: {
      marginRight: '10px',
      marginBottom: '10px'
    },
    dialog: {
      zIndex: 1000
    }
  });

  const classes = useStyles();


  const getEmployeeData = () => {
    return employeeData
  }

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

  const openEditEmployeeDialog = (employeeId) => {
    const employee = getEmployeeById(employeeId)
    setEmployeeData(employee)
    setShowEditEmployeeDialog(true)
  }

  const closeEditEmployeeDialog = () => {
    setShowEditEmployeeDialog(false)
  }

  const loadNewEmployees = () => {
    updateEmployee(employeeData, setErrorMessage)
    setShowEditEmployeeDialog(false)
    getEmployees()
  }

  const editEmployeeDialog =
      <EditEmployeeDialog
          className={classes.dialog}
          show={showEditEmployeeDialog}
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
          onCancel={closeEditEmployeeDialog}
          onAccept={loadNewEmployees}
      />

  return (
      <div>
        {editEmployeeDialog}
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
                    <TableCell><Button variant="outlined" color="primary" disableElevation
                                       onClick={() => {
                                         openEditEmployeeDialog(row.id)
                                       }}><ArchiveIcon/></Button></TableCell>
                    <TableCell><Button disabled variant="outlined" color="primary"><ArchiveIcon/></Button></TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}


/*
<TableCell><Button variant="outlined" color="primary" onClick={openEditEmployeeDialog(row.id)}><ArchiveIcon/></Button></TableCell>
*/