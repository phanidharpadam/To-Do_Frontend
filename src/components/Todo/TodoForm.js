import React, { useState, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  TextField,
  Paper,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import * as moment from "moment";
import { createTodo, getTodos, updateTodo } from "../../features/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../features/snackbarSlice";
import { useParams, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "none",
    width: "100%",
    maxWidth: "40rem",
    margin: theme.spacing(1, "auto"),
    padding: theme.spacing(2),
    boxShadow: "none",
  },
  paper2: {
    background: "none",
    width: "100%",
    maxWidth: "50rem",
    margin: theme.spacing(2, "auto"),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const statusOptions = [
  { status: "New", disabled: true },
  { status: "InProgress", disabled: false },
  { status: "Pending", disabled: false },
  { status: "Completed", disabled: false },
];

export default function TodoForm(props) {
  const { newForm, editForm, viewForm, setMenubarTitle } = props;
  const { firstName, lastName } = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();
  const initialState = {
    title: "",
    description: "",
    status: { status: "New", disabled: true },
    priority: "",
    dueDate: new Date(),
    creator: `${firstName} ${lastName}`,
  };
  const [todoFormData, setTodoFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todos);
  const todosLength = todosState.todos.length;
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    newForm
      ? setMenubarTitle("Create ToDo")
      : editForm
      ? setMenubarTitle("Update ToDo")
      : setMenubarTitle("View ToDo");
  }, [newForm, editForm, viewForm, setMenubarTitle]);
  useEffect(() => {
    const { todos } = todosState;
    if (id && todos.length > 0) {
      const filteredTodo = todos.filter((todo) => todo.id === Number(id));

      if (filteredTodo.length > 0) {
        let values = {};
        values = {
          ...filteredTodo[0],
          status: {
            status: filteredTodo[0].status,
            disabled: false,
          },
        };
        setTodoFormData(values);
      }
    }
  }, [id, todosState]);

  useEffect(() => {
    if (todosLength === 0) {
      dispatch(getTodos());
    }
  }, [todosLength, dispatch]);

  useEffect(() => {
    if (todosState.addTodoStatus === "success") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: "Todo Created Successfully!",
          snackbarType: "success",
        })
      );
      handleClose();
      navigate("/listtodos");
    } else if (todosState.addTodoStatus === "rejected") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: todosState.addTodoError,
          snackbarType: "error",
        })
      );
      handleClose();
    } else if (todosState.updateTodoStatus === "success") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: "Todo Updated Successfully!",
          snackbarType: "success",
        })
      );
      handleClose();
      navigate("/listtodos");
    } else if (todosState.updateTodoStatus === "rejected") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: todosState.updateTodoError,
          snackbarType: "error",
        })
      );
      handleClose();
    }
  }, [todosState, dispatch, navigate]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleText = ({ target }) => {
    const { id, name, value } = target;
    const formString = id.concat("_bool");
    setErrors({ ...errors, [id]: "", [formString]: false });
    setTodoFormData({
      ...todoFormData,
      [name]: value,
    });
  };

  const handleDropDownChange = ({ target }, newValue) => {
    const str = target.id;
    const index = str.indexOf("-");
    const res = str.slice(0, index);
    //console.log(res);
    if (index > 0) {
      //let formString = res.concat('_bool');
      //setErrors({ ...errors, [res]: '', [formString]: false });
      setTodoFormData({
        ...todoFormData,
        [res]: newValue,
      });
    } else {
      setTodoFormData({
        ...todoFormData,
        [target.closest("div").previousElementSibling.id]: null,
      });
    }
  };

  const handleDateChange = (date) => {
    setTodoFormData({
      ...todoFormData,
      dueDate: moment(date).format("YYYY-MM-DD"),
    });
  };

  const handleRadioChange = ({ target }) => {
    const { name, value } = target;
    const formString = name.concat("_bool");
    setErrors({ ...errors, [name]: "", [formString]: false });

    setTodoFormData({
      ...todoFormData,
      [name]: value,
    });
  };

  const handleCreate = () => {
    const { flag, _errors } = validateFormData();

    console.log(errors);
    if (!flag) {
      console.log(todoFormData);
      handleToggle();
      dispatch(createTodo(todoFormData));
    } else setErrors(_errors);
  };

  const handleUpdate = () => {
    const { flag, _errors } = validateFormData();

    if (!flag) {
      console.log(todoFormData);
      handleToggle();
      dispatch(updateTodo({ todo: todoFormData, _id: id }));
    } else setErrors(_errors);
  };

  const validateFormData = () => {
    const _errors = {};
    let flag = false;
    if (!todoFormData.title) {
      _errors.title_bool = true;
      _errors.title = "Title is required!";
      flag = true;
    }
    if (!todoFormData.priority) {
      _errors.priority_bool = true;
      _errors.priority = "Priority is required!";
      flag = true;
    }
    return { flag, _errors };
  };
  return (
    <>
      <Paper elevation={6} className={classes.paper2}>
        <Paper component="form" className={classes.paper}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={10} sm={11} md={12}>
              <TextField
                required
                id="title"
                name="title"
                fullWidth
                label="Title"
                variant="outlined"
                value={todoFormData.title}
                onChange={handleText}
                error={errors.title_bool}
                helperText={errors.title}
                disabled={viewForm}
              />
            </Grid>
            <Grid item xs={10} sm={11} md={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                fullWidth
                multiline
                minRows={4}
                variant="outlined"
                value={todoFormData.description}
                onChange={handleText}
                disabled={viewForm}
              />
            </Grid>
            <Grid container item spacing={4} justifyContent="center">
              <Grid item xs={10} sm={11} md={6}>
                <Autocomplete
                  id="status"
                  options={statusOptions}
                  getOptionLabel={(option) => option.status}
                  getOptionDisabled={(option) => option.disabled}
                  getOptionSelected={(option, value) =>
                    value.status === option.status
                  }
                  defaultValue={statusOptions.find((v) => v.status[0])}
                  value={todoFormData.status}
                  onChange={handleDropDownChange}
                  fullWidth
                  disabled={editForm ? false : true}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid container item xs={10} sm={11} md={6}>
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel required component="legend">
                      Priority
                    </FormLabel>
                    <RadioGroup
                      aria-label="priority"
                      name="priority"
                      value={todoFormData.priority}
                      onChange={handleRadioChange}
                      row
                    >
                      <FormControlLabel
                        value="Low"
                        control={<Radio />}
                        label="Low"
                        disabled={viewForm}
                      />
                      <FormControlLabel
                        value="Medium"
                        control={<Radio />}
                        label="Medium"
                        disabled={viewForm}
                      />
                      <FormControlLabel
                        value="High"
                        control={<Radio />}
                        label="High"
                        disabled={viewForm}
                      />
                    </RadioGroup>
                    {errors?.priority_bool ? (
                      <FormHelperText style={{ color: "red" }}>
                        {errors?.priority}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item spacing={4} justifyContent="center">
              <Grid item xs={10} sm={11} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    id="dueDate"
                    name="dueDate"
                    label="Due Date"
                    fullWidth
                    inputVariant="outlined"
                    disablePast
                    error={false}
                    helperText={null}
                    value={todoFormData.dueDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    disabled={viewForm}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={10} sm={11} md={6}>
                <TextField
                  id="standard-multiline-static"
                  label="Creator"
                  fullWidth
                  value={todoFormData.creator}
                  variant="outlined"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid item xs={10} sm={11} md={12}>
              {newForm ? (
                <Button
                  onClick={handleCreate}
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Create
                </Button>
              ) : editForm ? (
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Update
                </Button>
              ) : null}
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Paper>
      </Paper>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
