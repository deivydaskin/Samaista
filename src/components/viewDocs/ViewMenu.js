import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from '../../css/inline-style/createMenuStyle.js';
import '../../css/viewProducts.css';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Breakfast from '../createDocs/Breakfast.js';
import Lunch from '../createDocs/Lunch.js';
import Dinner from '../createDocs/Dinner.js';
import { useAuth0 } from "../../react-auth0-spa";
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ViewMenus(props) {

    const classes = useStyles();

    const { getTokenSilently } = useAuth0();

    const [menuName, setMenuName] = useState([]);
    const [edit, setEdit] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [deleteConfirmation, setDeleteConfirmation] = useState({ code: "", row: "" });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [breakfastToEditState, setBreakfastToEditState] = useState({
        nameOfMenu: "Pavadinimas",
        breakfastData: [
            {
                recipeNumber: "",
                name: "",
                yield: "",
                b: null,
                r: null,
                a: null,
                kcal: null
            }],
        breakfastOverallB: 0,
        breakfastOverallR: 0,
        breakfastOverallA: 0,
        breakfastOverallKcal: 0
    });
    const [lunchToEditState, setLunchToEditState] = useState({
        lunchData: [
            {
                recipeNumber: "",
                name: "",
                yield: "",
                b: null,
                r: null,
                a: null,
                kcal: null
            }],
        lunchOverallB: 0,
        lunchOverallR: 0,
        lunchOverallA: 0,
        lunchOverallKcal: 0,
    });
    const [dinnerToEditState, setDinnerToEditState] = useState({
        dinnerData: [
            {
                recipeNumber: "",
                name: "",
                yield: "",
                b: null,
                r: null,
                a: null,
                kcal: null
            }],
        dinnerOverallB: 0,
        dinnerOverallR: 0,
        dinnerOverallA: 0,
        dinnerOverallKcal: 0
    });

    useEffect(() => {
        getAllMenus()
    }, []);

    function handleSnackbar(action) {
        if (action === "open") {
            setSnackbarState(true);
        } else if (action === "close") {
            setSnackbarState(false);
        }
    }

    async function getAllMenus() {
        const token = await getTokenSilently();
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
            query{
                Menus {
                  nameOfMenu
                }
            }
            `
            }
        })
            .then((response) => {
                console.log(response);
                setMenuName(response.data.data.Menus);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }

    async function getMenu(nameOfMenu) {
        const token = await getTokenSilently();
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
            query{
                MenuByName(nameOfMenu: "${nameOfMenu}") {
                    nameOfMenu
                    breakfastData{
                      recipeNumber
                            name
                      yield
                      b
                      r
                      a
                      kcal
                    }
                    breakfastOverallB
                    breakfastOverallR
                    breakfastOverallA
                    breakfastOverallKcal
                    lunchData{
                      recipeNumber
                            name
                      yield
                      b
                      r
                      a
                      kcal
                    }
                    lunchOverallB
                    lunchOverallR
                    lunchOverallA
                    lunchOverallKcal
                    dinnerData{
                      recipeNumber
                            name
                      yield
                      b
                      r
                      a
                      kcal
                    }
                    dinnerOverallB
                    dinnerOverallR
                    dinnerOverallA
                    dinnerOverallKcal
                  } 
            }
            `
            }
        })
            .then((response) => {
                console.log(response);

                let newBreakfastArr = {
                    nameOfMenu: "",
                    breakfastData: [],
                    breakfastOverallB: 0,
                    breakfastOverallR: 0,
                    breakfastOverallA: 0,
                    breakfastOverallKcal: 0
                };
                newBreakfastArr.nameOfMenu = response.data.data.MenuByName.nameOfMenu;
                newBreakfastArr.breakfastOverallB = response.data.data.MenuByName.breakfastOverallB;
                newBreakfastArr.breakfastOverallR = response.data.data.MenuByName.breakfastOverallR;
                newBreakfastArr.breakfastOverallA = response.data.data.MenuByName.breakfastOverallA;
                newBreakfastArr.breakfastOverallKcal = response.data.data.MenuByName.breakfastOverallKcal;
                for (let i = 0; i < response.data.data.MenuByName.breakfastData.length; i++) {
                    newBreakfastArr.breakfastData.push({
                        name: "",
                        yield: '',
                        b: null,
                        r: null,
                        a: null,
                        kcal: null
                    })
                    newBreakfastArr.breakfastData[i].recipeNumber = response.data.data.MenuByName.breakfastData[i].recipeNumber;
                    newBreakfastArr.breakfastData[i].name = response.data.data.MenuByName.breakfastData[i].name;
                    newBreakfastArr.breakfastData[i].b = response.data.data.MenuByName.breakfastData[i].b;
                    newBreakfastArr.breakfastData[i].r = response.data.data.MenuByName.breakfastData[i].r;
                    newBreakfastArr.breakfastData[i].a = response.data.data.MenuByName.breakfastData[i].a;
                    newBreakfastArr.breakfastData[i].kcal = response.data.data.MenuByName.breakfastData[i].kcal;
                    newBreakfastArr.breakfastData[i].yield = response.data.data.MenuByName.breakfastData[i].yield;
                };
                setBreakfastToEditState(newBreakfastArr);

                let newLunchArr = {
                    lunchData: [],
                    lunchOverallB: 0,
                    lunchOverallR: 0,
                    lunchOverallA: 0,
                    lunchOverallKcal: 0
                };
                newLunchArr.lunchOverallB = response.data.data.MenuByName.lunchOverallB;
                newLunchArr.lunchOverallR = response.data.data.MenuByName.lunchOverallR;
                newLunchArr.lunchOverallA = response.data.data.MenuByName.lunchOverallA;
                newLunchArr.lunchOverallKcal = response.data.data.MenuByName.lunchOverallKcal;
                for (let i = 0; i < response.data.data.MenuByName.lunchData.length; i++) {
                    newLunchArr.lunchData.push({
                        name: "",
                        yield: '',
                        b: null,
                        r: null,
                        a: null,
                        kcal: null
                    })
                    newLunchArr.lunchData[i].recipeNumber = response.data.data.MenuByName.lunchData[i].recipeNumber;
                    newLunchArr.lunchData[i].name = response.data.data.MenuByName.lunchData[i].name;
                    newLunchArr.lunchData[i].b = response.data.data.MenuByName.lunchData[i].b;
                    newLunchArr.lunchData[i].r = response.data.data.MenuByName.lunchData[i].r;
                    newLunchArr.lunchData[i].a = response.data.data.MenuByName.lunchData[i].a;
                    newLunchArr.lunchData[i].kcal = response.data.data.MenuByName.lunchData[i].kcal;
                    newLunchArr.lunchData[i].yield = response.data.data.MenuByName.lunchData[i].yield;
                };
                setLunchToEditState(newLunchArr);

                let newDinnerArr = {
                    dinnerData: [],
                    dinnerOverallB: 0,
                    dinnerOverallR: 0,
                    dinnerOverallA: 0,
                    dinnerOverallKcal: 0
                };
                newDinnerArr.dinnerOverallB = response.data.data.MenuByName.dinnerOverallB;
                newDinnerArr.dinnerOverallR = response.data.data.MenuByName.dinnerOverallR;
                newDinnerArr.dinnerOverallA = response.data.data.MenuByName.dinnerOverallA;
                newDinnerArr.dinnerOverallKcal = response.data.data.MenuByName.dinnerOverallKcal;
                for (let i = 0; i < response.data.data.MenuByName.dinnerData.length; i++) {
                    newDinnerArr.dinnerData.push({
                        name: "",
                        yield: '',
                        b: null,
                        r: null,
                        a: null,
                        kcal: null
                    })
                    newDinnerArr.dinnerData[i].recipeNumber = response.data.data.MenuByName.dinnerData[i].recipeNumber;
                    newDinnerArr.dinnerData[i].name = response.data.data.MenuByName.dinnerData[i].name;
                    newDinnerArr.dinnerData[i].b = response.data.data.MenuByName.dinnerData[i].b;
                    newDinnerArr.dinnerData[i].r = response.data.data.MenuByName.dinnerData[i].r;
                    newDinnerArr.dinnerData[i].a = response.data.data.MenuByName.dinnerData[i].a;
                    newDinnerArr.dinnerData[i].kcal = response.data.data.MenuByName.dinnerData[i].kcal;
                    newDinnerArr.dinnerData[i].yield = response.data.data.MenuByName.dinnerData[i].yield;
                };
                setDinnerToEditState(newDinnerArr);
                setEdit(true);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }

    async function deleteMenu(nameOfMenu) {
        const token = await getTokenSilently();
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
                mutation{
                    deleteMenu (nameOfMenu: "${nameOfMenu}"){
                      nameOfMenu
                    }
                  }
                `
            }
        })
            .then((response) => {
                if (response.statusText === "OK" && !response.data.errors) {
                    setSnackbarText("Valgiaraštis ištrintas sėkmingai!");
                    setSnackbarSeverity("success");
                    handleSnackbar("open");
                } else {
                    setSnackbarText("Ištrinti nepavyko!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                }
                getAllMenus();
                setDeleteConfirmation({ code: "", row: "" });
                setOpenDeleteModal(false);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }

    function handleClick(nameOfMenu, i, type) {
        if (type === "edit") {
            getMenu(nameOfMenu);
        }
        else if (type === "delete") {
            deleteMenu(nameOfMenu);
        }
    }

    function clearState() {
        setBreakfastToEditState({
            nameOfMenu: "Pavadinimas",
            breakfastData: [
                {
                    recipeNumber: "",
                    name: "",
                    yield: "",
                    b: null,
                    r: null,
                    a: null,
                    kcal: null
                }],
            breakfastOverallB: 0,
            breakfastOverallR: 0,
            breakfastOverallA: 0,
            breakfastOverallKcal: 0
        });
        setLunchToEditState({
            lunchData: [
                {
                    recipeNumber: "",
                    name: "",
                    yield: "",
                    b: null,
                    r: null,
                    a: null,
                    kcal: null
                }],
            lunchOverallB: 0,
            lunchOverallR: 0,
            lunchOverallA: 0,
            lunchOverallKcal: 0,
        });
        setDinnerToEditState({
            dinnerData: [
                {
                    recipeNumber: "",
                    name: "",
                    yield: "",
                    b: null,
                    r: null,
                    a: null,
                    kcal: null
                }],
            dinnerOverallB: 0,
            dinnerOverallR: 0,
            dinnerOverallA: 0,
            dinnerOverallKcal: 0
        });
    }

    async function handleSubmit() {
        let breakfastQuoted = JSON.stringify(breakfastToEditState.breakfastData);
        const breakfastUnquoted = breakfastQuoted.replace(/"([^"]+)":/g, '$1:');
        let lunchQuoted = JSON.stringify(lunchToEditState.lunchData);
        const lunchUnquoted = lunchQuoted.replace(/"([^"]+)":/g, '$1:');
        let dinnerQuoted = JSON.stringify(dinnerToEditState.dinnerData);
        const dinnerUnquoted = dinnerQuoted.replace(/"([^"]+)":/g, '$1:');
        const token = await getTokenSilently();
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
                mutation {
                    updateMenu (nameOfMenu: "${breakfastToEditState.nameOfMenu}", breakfastData: ${breakfastUnquoted}, breakfastOverallB: ${breakfastToEditState.breakfastOverallB}, 
                            breakfastOverallR: ${breakfastToEditState.breakfastOverallR}, breakfastOverallA: ${breakfastToEditState.breakfastOverallA}, breakfastOverallKcal: ${breakfastToEditState.breakfastOverallKcal},
                            lunchData: ${lunchUnquoted}, lunchOverallB: ${lunchToEditState.lunchOverallB}, 
                            lunchOverallR: ${lunchToEditState.lunchOverallR}, lunchOverallA: ${lunchToEditState.lunchOverallA}, lunchOverallKcal: ${lunchToEditState.lunchOverallKcal},
                            dinnerData: ${dinnerUnquoted}, dinnerOverallB: ${dinnerToEditState.dinnerOverallB}, 
                            dinnerOverallR: ${dinnerToEditState.dinnerOverallR}, dinnerOverallA: ${dinnerToEditState.dinnerOverallA}, dinnerOverallKcal: ${dinnerToEditState.dinnerOverallKcal}
                            ){
                                nameOfMenu
                                breakfastOverallB
                                breakfastOverallR
                                breakfastOverallA
                                breakfastOverallKcal
                                lunchOverallB
                                lunchOverallR
                                lunchOverallA
                                lunchOverallKcal
                                dinnerOverallB
                                dinnerOverallR
                                dinnerOverallA
                                dinnerOverallKcal                                
                            }
                  }

                `
            }
        })
            .then((response) => {
                if (response.statusText === "OK" && !response.data.errors) {
                    setSnackbarText("Valgiaraštis atnaujintas sėkmingai!");
                    setSnackbarSeverity("success");
                    handleSnackbar("open");
                } else {
                    setSnackbarText("Atnaujinti nepavyko!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                }
                setEdit(false);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }


    return (
        <div className="viewProducts">
            <div className="backBtn">
                <Button variant="contained" color="primary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
            </div>
            {edit ?
                <div className="viewMenu">
                    <div className="first" id="firstMargin">
                        <Breakfast setBreakfastState={setBreakfastToEditState} breakfastState={breakfastToEditState} btnColor="primary" />
                    </div>
                    <div className="second" >
                        <Lunch setLunchState={setLunchToEditState} lunchState={lunchToEditState} btnColor="primary" />
                    </div>
                    <div className="third" >
                        <Dinner setDinnerState={setDinnerToEditState} dinnerState={dinnerToEditState} btnColor="primary" />
                    </div>
                    <div style={{ alignSelf: "center" }}>
                        <Button onClick={() => { setEdit(false); clearState(); }} variant="contained" color="primary" className={classes.button}>Atšaukti</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>Išsaugoti</Button>
                    </div>
                </div >
                :
                <Grid className="product">
                    <h3 style={{ color: "#FFFFFF" }}>Meniu</h3>
                    {menuName.length ?
                        <div className={classes.demo} >
                            <List classes={{ root: classes.root }}>
                                {menuName.map((row, i) => (
                                    < ListItem divider>
                                        <ListItemText
                                            primary={row.nameOfMenu}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleClick(row.nameOfMenu, i, "edit")} >
                                                <EditIcon style={{ color: '#FFFFFF' }} />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="pdf">
                                                <PictureAsPdfIcon style={{ color: '#FFFFFF' }} />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon style={{ color: '#FFFFFF' }} onClick={() => { setDeleteConfirmation({ code: row.nameOfMenu, row: i }); setOpenDeleteModal(true) }} />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        :
                        <CircularProgress color="primary" size={68} disableShrink style={{ marginLeft: "10px" }} thickness={5} />
                    }
                    <Snackbar open={snackbarState} autoHideDuration={6000} onClose={() => handleSnackbar("close")}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                        <Alert onClose={() => handleSnackbar("close")} severity={snackbarSeverity}>
                            {snackbarText}
                        </Alert>
                    </Snackbar>
                    <Dialog
                        open={openDeleteModal}
                        onClose={() => setOpenDeleteModal(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Ar tikrai norite ištrinti šį valgiaraštį?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {deleteConfirmation.code}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteModal(false)} color="primary" autoFocus>
                                Ne
                            </Button>
                            <Button onClick={() => { handleClick(deleteConfirmation.code, deleteConfirmation.row, "delete") }} color="primary" >
                                Taip
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            }
        </div >
    );
}

export default withRouter(ViewMenus);