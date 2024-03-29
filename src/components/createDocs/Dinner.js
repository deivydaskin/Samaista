import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextFieldMui from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../../css/inline-style/createMenuStyle.js';
import { styles } from '../../css/inline-style/createMenuStyle.js';
import { Container } from '@material-ui/core';
import { useAuth0 } from "../../react-auth0-spa";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const TextField1 = withStyles(styles)(function TextField({ classes, ...props }) {
    return (
        <TextFieldMui
            InputLabelProps={{
                classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                    error: classes.erroredLabel
                }
            }}
            InputProps={{
                classes: {
                    root: classes.underline,
                    error: classes.error
                }
            }}
            {...props}
        />
    );
});

function Dinner(props) {

    const classes = useStyles();
    const { getTokenSilently } = useAuth0();

    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleChange = i => e => {
        let newArr = { ...props.dinnerState };
        if (e.target.id === "name") {
            newArr.dinnerData[i][e.target.id] = e.target.value;
        } else if (e.target.id === "recipeNumber") {
            newArr.dinnerData[i][e.target.id] = e.target.value;
        }
        props.setDinnerState(newArr);


        if (e.target.id === "b" || e.target.id === "r" || e.target.id === "a" || e.target.id === "kcal") {
            countOverall()
        }
    }

    function handleSnackbar(action) {
        if (action === "open") {
            setSnackbarState(true);
        } else if (action === "close") {
            setSnackbarState(false);
        }
    }

    async function getTechCard(arg, i, type) {
        const token = await getTokenSilently();
        if (type === "name") {
            axios({
                url: 'https://samaista.herokuapp.com/graphql',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    query: `
                query{
                    TechCardByName(nameOfCard:"${arg}") {
                      recipeNumber
                      nameOfCard
                      overallB
                      overallR
                      overallA
                      overallKcal
                      yield
                    }
                }
                `
                }
            })
                .then((response) => {
                    if (response.statusText === "OK" && !response.data.errors && response.data.data.TechCardByName != null) {
                        let newArr = { ...props.dinnerState };
                        newArr.dinnerData[i].recipeNumber = response.data.data.TechCardByName.recipeNumber;
                        newArr.dinnerData[i].b = response.data.data.TechCardByName.overallB;
                        newArr.dinnerData[i].r = response.data.data.TechCardByName.overallR;
                        newArr.dinnerData[i].a = response.data.data.TechCardByName.overallA;
                        newArr.dinnerData[i].kcal = response.data.data.TechCardByName.overallKcal;
                        newArr.dinnerData[i].yield = response.data.data.TechCardByName.yield;
                        props.setDinnerState(newArr);
                    } else {
                        setSnackbarText("Tokios techn. kortelės nėra!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    }
                })
                .then(() => countOverall())
                .catch((error) => {
                    if (error == "TypeError: Cannot read property 'toFixed' of null") {
                        setSnackbarText("Tokios techn. kortelės nėra!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    } else {
                        setSnackbarText("Įvyko klaida!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    }
                    console.log(error);
                });
        } else if (type === "recipeNumber") {
            axios({
                url: 'https://samaista.herokuapp.com/graphql',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    query: `
                    query{
                        TechCardByRecipeNumber(recipeNumber: "${arg}") {
                          recipeNumber
                          nameOfCard
                          overallB
                          overallR
                          overallA
                          overallKcal
                          yield
                        }
                    }
                    `
                }
            })
                .then((response) => {
                    if (response.statusText === "OK" && !response.data.errors && response.data.data.TechCardByRecipeNumber != null) {
                        let newArr = { ...props.dinnerState };
                        newArr.dinnerData[i].name = response.data.data.TechCardByRecipeNumber.nameOfCard;
                        newArr.dinnerData[i].recipeNumber = response.data.data.TechCardByRecipeNumber.recipeNumber;
                        newArr.dinnerData[i].b = response.data.data.TechCardByRecipeNumber.overallB;
                        newArr.dinnerData[i].r = response.data.data.TechCardByRecipeNumber.overallR;
                        newArr.dinnerData[i].a = response.data.data.TechCardByRecipeNumber.overallA;
                        newArr.dinnerData[i].kcal = response.data.data.TechCardByRecipeNumber.overallKcal;
                        newArr.dinnerData[i].yield = response.data.data.TechCardByRecipeNumber.yield;
                        props.setDinnerState(newArr);
                    } else {
                        setSnackbarText("Tokios techn. kortelės nėra!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    }
                })
                .then(() => countOverall())
                .catch((error) => {
                    if (error == "TypeError: Cannot read property 'toFixed' of null") {
                        setSnackbarText("Tokios techn. kortelės nėra!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    } else {
                        setSnackbarText("Įvyko klaida!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    }
                    console.log(error);
                });
        }
    }

    function countOverall() {

        let newArr = { ...props.dinnerState };
        newArr.dinnerOverallB = 0;
        newArr.dinnerOverallR = 0;
        newArr.dinnerOverallA = 0;
        newArr.dinnerOverallKcal = 0;
        for (let i = 0; i < props.dinnerState.dinnerData.length; i++) {
            newArr.dinnerOverallB += parseFloat((props.dinnerState.dinnerData[i].b.toFixed(2)));
            newArr.dinnerOverallR += parseFloat((props.dinnerState.dinnerData[i].r.toFixed(2)));
            newArr.dinnerOverallA += parseFloat((props.dinnerState.dinnerData[i].a.toFixed(2)));
            newArr.dinnerOverallKcal += parseFloat((props.dinnerState.dinnerData[i].kcal.toFixed(2)));
        }
        props.setDinnerState(newArr);
    }

    function addRow() {
        let margin = parseInt(document.getElementById("marginTop").style.marginTop);
        if (margin) {
            margin = margin + 70;
        } else {
            margin = 920;
        }
        document.getElementById("marginTop").style.marginTop = margin + "px";

        let newArr = { ...props.dinnerState };
        newArr.dinnerData.push({
            name: "",
            yield: '',
            b: null,
            r: null,
            a: null,
            kcal: null
        })
        props.setDinnerState(newArr);
    }

    return (
        <div className="CreateDinner">
            <div className="Container5">
                <h3 style={{ color: "#FFFFFF" }}>Vakarienė</h3>
            </div>
            <div className="Container4">
                <Container classes={classes.root} maxWidth="lg">
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                            <TableRow className={classes.header}>
                                <TableCell rowSpan={2} className={classes.border}>Patiekalo pavadinimas</TableCell>
                                <TableCell rowSpan={2} className={classes.border}>
                                    Receptūros Nr.
                                </TableCell>
                                <TableCell rowSpan={2} align="center" className={classes.border}>Išeiga</TableCell>
                                <TableCell align="center" colSpan={3} className={classes.border}>Patiekalo maistinė vertė, g</TableCell>
                                <TableCell rowSpan={2} className={classes.border}>Energinė vertė, kcal</TableCell>
                            </TableRow>
                            <TableRow className={classes.header}>
                                <TableCell className={classes.border}>B (g)</TableCell>
                                <TableCell className={classes.border}>R (g)</TableCell>
                                <TableCell className={classes.border}>A (g)</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.dinnerState.dinnerData.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.name}
                                        onChange={handleChange(i)}
                                        error
                                        id="name"
                                    />
                                        <Button onClick={() => getTechCard(row.name, i, "name")}><SearchIcon style={{ color: '#FFFFFF' }} /></Button>
                                    </TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.recipeNumber}
                                        onChange={handleChange(i)}
                                        error
                                        id="recipeNumber"
                                    /><Button value={row.recipeNumber} onClick={() => getTechCard(row.recipeNumber, i, "recipeNumber")}><SearchIcon style={{ color: '#FFFFFF' }} /></Button>
                                    </TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.yield}
                                        onChange={handleChange(i)}
                                        error
                                        id="yield"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.b}
                                        onChange={handleChange(i)}
                                        error
                                        id="b"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.r}
                                        onChange={handleChange(i)}
                                        error
                                        id="r"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.a}
                                        onChange={handleChange(i)}
                                        error
                                        id="a"
                                    /></TableCell>
                                    <TableCell className={classes.border}>
                                        <TextField1
                                            inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                            value={row.kcal}
                                            onChange={handleChange(i)}
                                            error
                                            id="kcal"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell align="right" colSpan={3} className={classes.border}>Iš viso:</TableCell>
                                <TableCell align="center" className={classes.border}>{props.dinnerState.dinnerOverallB}</TableCell>
                                <TableCell align="center" className={classes.border}>{props.dinnerState.dinnerOverallR}</TableCell>
                                <TableCell align="center" className={classes.border}>{props.dinnerState.dinnerOverallA}</TableCell>
                                <TableCell align="center" className={classes.border}>{props.dinnerState.dinnerOverallKcal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>

                <div className="Container5">
                    <Button onClick={addRow} variant="contained" color={props.btnColor} className={classes.button}>Pridėti eilutę</Button>
                </div>
                <Snackbar open={snackbarState} autoHideDuration={6000} onClose={() => handleSnackbar("close")}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                    <Alert onClose={() => handleSnackbar("close")} severity={snackbarSeverity}>
                        {snackbarText}
                    </Alert>
                </Snackbar>
            </div>
        </div >
    );
}

export default withRouter(Dinner);