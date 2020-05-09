import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmployeeDialog from "./employeeDialog";
import ArchiveIcon from '@material-ui/icons/Archive';
import Button from "@material-ui/core/Button";
import {updateEmployee, submitNewEmployee} from "../../../connectionHandler/connectionHandler";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';


function createData(firstname, lastname, id) {
  return {firstname, lastname, id};
}

export default function UserTable({employees, getEmployees, setErrorMessage}) {

  const [showEditEmployeeDialog, setShowEditEmployeeDialog] = useState(false);
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    { id: 'firstname', numeric: false, disablePadding: true, label: 'Vorname' },
    { id: 'lastname', numeric: false, disablePadding: false, label: 'Calories' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Ändern' },
    { id: 'archive', numeric: false, disablePadding: false, label: 'Archivieren' },
  ];



  const openEditEmployeeDialog = (employeeId) => {
    const employee = getEmployeeById(employeeId)
    setEmployeeData(employee)
    setShowEditEmployeeDialog(true)
  }

  const openAddEmployeeDialog = () => {
    setEmployeeData({
      roles: {
        admin: false,
        pl: false,
        sales: false,
        employee: false
      },
      email: '',
      firstname: '',
      lastname: ''
    })
    setShowAddEmployeeDialog(true)
  }

  const closeEditEmployeeDialog = () => {
    setShowEditEmployeeDialog(false)
  }

  const closeAddEmployeeDialog = () => {
    setShowAddEmployeeDialog(false)
  }

  const submitEmployee = () => {
    submitNewEmployee(employeeData, setErrorMessage)
    setShowAddEmployeeDialog(false)
    loadEmployees()
  }

  const updateEmployeeData = () => {
    updateEmployee(employeeData, setErrorMessage)
    setShowEditEmployeeDialog(false)
    loadEmployees()
  }

  const loadEmployees = () => {
    getEmployees()
  }

  const editEmployeeDialog =
      <EmployeeDialog
          className={classes.dialog}
          show={showEditEmployeeDialog}
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
          onCancel={closeEditEmployeeDialog}
          onAccept={updateEmployeeData}
      />

  const addEmployeeDialog =
      <EmployeeDialog
          className={classes.dialog}
          show={showAddEmployeeDialog}
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
          onCancel={closeAddEmployeeDialog}
          onAccept={submitEmployee}
      />

  return (
      <div>
        {editEmployeeDialog}
        {addEmployeeDialog}
        <Button variant="outlined"
                color="primary"
                disableElevation
                name='addEmployeeButton'
                onClick={openAddEmployeeDialog}>
          <PersonAddIcon/>
        </Button>
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
                  <TableRow key={row.id + 'tableRow'}>
                    <TableCell component="th" scope="row">
                      {row.firstname}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.lastname}
                    </TableCell>
                    <TableCell><Button variant="outlined"
                                       color="primary"
                                       disableElevation
                                       onClick={() => {
                                         openEditEmployeeDialog(row.id)
                                       }}><EditIcon/></Button></TableCell>
                    <TableCell><Button disabled variant="outlined" color="primary"><ArchiveIcon/></Button></TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
