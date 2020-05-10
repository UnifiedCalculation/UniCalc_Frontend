import React, { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import { updateEmployee, submitNewEmployee } from "../../../connectionHandler/connectionHandler";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";

function createData(firstname, lastname, id) {
  return { firstname, lastname, id };
}

export default function UserTable({ employees, getEmployees, setErrorMessage }) {

  const [showEditEmployeeDialog, setShowEditEmployeeDialog] = useState(false);
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: '50px'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    button: {
      marginBottom: '10px'
    },
    dialog: {
      zIndex: 1000
    }
  }));

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
    { id: 'firstname', numeric: false, disablePadding: false, label: 'Vorname' },
    { id: 'lastname', numeric: false, disablePadding: false, label: 'Nachname' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Ändern' },
    { id: 'archive', numeric: false, disablePadding: false, label: 'Archivieren' },
  ];

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id + 'tableCell'}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                key={headCell.id + 'tableSortLabel'}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }));

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Mitarbeiterübersicht
            </Typography>
          )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('firstname');
  const [page, setPage] = React.useState(0);
  const dense = true;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openEditEmployeeDialog = (employeeId) => {
    const employee = getEmployeeById(employeeId)
    setEmployeeData(employee)
    setShowEditEmployeeDialog(true)
  }

  const openAddEmployeeDialog = () => {
    setShowAddEmployeeDialog(true)
  }

  const closeEditEmployeeDialog = () => {
    setEmployeeData(null);
    setShowEditEmployeeDialog(false)
  }

  const closeAddEmployeeDialog = () => {
    setShowAddEmployeeDialog(false)
  }

  const submitEmployee = (newEmployee) => {
    submitNewEmployee(newEmployee, setErrorMessage, loadEmployees)
    setShowAddEmployeeDialog(false)
  }

  const updateEmployeeData = (changedEmployee) => {
    updateEmployee(changedEmployee, setErrorMessage, loadEmployees)
    setShowEditEmployeeDialog(false)
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
      setEmployeeData={setEmployeeData}
      onCancel={closeAddEmployeeDialog}
      onAccept={submitEmployee}
    />

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {editEmployeeDialog}
      {addEmployeeDialog}
      <Button variant="outlined"
        className={classes.button}
        color="primary"
        disableElevation
        name='addEmployeeButton'
        onClick={openAddEmployeeDialog}>
        <PersonAddIcon />
      </Button>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={0}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={0}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id + 'tableRow'}
                    >
                      <TableCell component="th" scope="row">
                        {row.firstname}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.lastname}
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined"
                          color="primary"
                          disableElevation
                          onClick={() => {
                            openEditEmployeeDialog(row.id)
                          }}><EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button disabled variant="outlined" color="primary"><ArchiveIcon /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
