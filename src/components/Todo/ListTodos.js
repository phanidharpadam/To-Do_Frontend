import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../../features/todosSlice";
import { setSnackbar } from "../../features/snackbarSlice";
import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  Paper,
  Toolbar,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";

import { getComparator, stableSort } from "./common";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
  },
  textField: {
    width: "40ch",
  },
  title: {
    flex: "1 1 100%",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  dialogTitle: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableSortLabel = withStyles(() =>
  createStyles({
    root: {
      color: "white",
      "&:hover": {
        color: "white",
      },
      "&$active": {
        color: "white",
      },
    },
    active: {},
    icon: {
      color: "white !important",
    },
  })
)(TableSortLabel);

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#D9E1F2",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#FFFFFF",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
}))(TableRow);

export default function ListTodos(props) {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todos);
  let navigate = useNavigate();
  const { setMenubarTitle } = props;

  useEffect(() => {
    setMenubarTitle("ToDos List");
  }, [setMenubarTitle]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  useEffect(() => {
    if (todosState.deleteTodoStatus === "success") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: "Todo Deleted Successfully!",
          snackbarType: "success",
        })
      );
    } else if (todosState.deleteTodoStatus === "rejected") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: todosState.deleteTodoError,
          snackbarType: "error",
        })
      );
    }
  }, [todosState, dispatch]);

  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const _filteredTodos = todosState.todos.filter(
        (todo) =>
          todo.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          todo.priority.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          todo.status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          todo.creator.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
      setFilteredTodos(_filteredTodos);
    } else {
      setFilteredTodos(todosState.todos);
    }
  }, [searchTerm, todosState]);

  const rows = filteredTodos;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDialogOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleRowDelete = () => {
    console.log(deleteId);
    dispatch(deleteTodo(deleteId));
    handleDialogClose();
  };

  const headCells = [
    { id: "title", float: "left", label: "Title", minWidth: 50 },
    { id: "priority", float: "left", label: "Priority", minWidth: 50 },
    { id: "status", float: "left", label: "Status", minWidth: 50 },
    { id: "dueDate", float: "left", label: "Due Date", minWidth: 50 },
    { id: "creator", float: "left", label: "Creator", minWidth: 50 },
  ];

  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="h2"
          >
            TodosList
          </Typography>
          <TextField
            autoFocus
            value={searchTerm}
            className={classes.textField}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
        <TableContainer>
          <Table stickyHeader size="small" aria-label="Todos table">
            <TableHead>
              <TableRow style={{ height: 55 }}>
                {headCells.map((headCell) => (
                  <StyledTableCell
                    key={headCell.id}
                    style={{ minWidth: headCell.minWidth }}
                    align={headCell.float}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <StyledTableSortLabel
                      className={classes.tableSortLable}
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, headCell.id)}
                    >
                      <Typography>{headCell.label}</Typography>
                    </StyledTableSortLabel>
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  <Typography>Actions</Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length < 1 ? (
                <TableRow style={{ height: "50px" }}>
                  <TableCell colSpan={8} align="center">
                    No result found
                  </TableCell>
                </TableRow>
              ) : (
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <StyledTableRow key={row.id}>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.priority}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>{row?.creator}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit" arrow>
                            <IconButton
                              aria-label="edit"
                              color="primary"
                              onClick={() => {
                                navigate(`/edittodo/${row.id}`);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View" arrow>
                            <IconButton
                              aria-label="view"
                              color="primary"
                              onClick={() => {
                                navigate(`/viewtodo/${row.id}`);
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              aria-label="delete"
                              color="primary"
                              onClick={() => handleDialogOpen(row.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </StyledTableRow>
                    );
                  })
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "black" }}
          >
            Are you sure you want to delete this todo? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleRowDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
