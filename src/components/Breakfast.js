import React, { useState, useEffect } from 'react';
//import '../css/createMenu.css';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextFieldMui from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../css/inline-style/createMenuStyle.js';
import { styles } from '../css/inline-style/createMenuStyle.js';
import { Container } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

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

function Breakfast(props) {
    const classes = useStyles();

    const handleChange = i => e => {
        let newArr = { ...props.breakfastState };
        if (e.target.id === "nameOfMenu") {
            newArr.nameOfMenu = e.target.value;
        } else if (e.target.id === "name") {
            newArr.breakfastData[i][e.target.id] = e.target.value;
        } else if (e.target.id === "recipeNumber") {
            newArr.breakfastData[i][e.target.id] = e.target.value;
        }
        props.setBreakfastState(newArr);


        if (e.target.id === "b" || e.target.id === "r" || e.target.id === "a" || e.target.id === "kcal") {
            countOverall()
        }

    }

    function getTechCard(arg, i, type) {
        if (type === "name") {
            axios({
                url: 'http://localhost:3000/graphql',
                method: 'POST',
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
                    let newArr = { ...props.breakfastState };
                    newArr.breakfastData[i].recipeNumber = response.data.data.TechCardByName.recipeNumber;
                    newArr.breakfastData[i].b = response.data.data.TechCardByName.overallB;
                    newArr.breakfastData[i].r = response.data.data.TechCardByName.overallR;
                    newArr.breakfastData[i].a = response.data.data.TechCardByName.overallA;
                    newArr.breakfastData[i].kcal = response.data.data.TechCardByName.overallKcal;
                    newArr.breakfastData[i].yield = response.data.data.TechCardByName.yield;
                    props.setBreakfastState(newArr);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (type === "recipeNumber") {
            axios({
                url: 'http://localhost:3000/graphql',
                method: 'POST',
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
                    let newArr = { ...props.breakfastState };
                    newArr.breakfastData[i].name = response.data.data.TechCardByRecipeNumber.nameOfCard;
                    newArr.breakfastData[i].recipeNumber = response.data.data.TechCardByRecipeNumber.recipeNumber;
                    newArr.breakfastData[i].b = response.data.data.TechCardByRecipeNumber.overallB;
                    newArr.breakfastData[i].r = response.data.data.TechCardByRecipeNumber.overallR;
                    newArr.breakfastData[i].a = response.data.data.TechCardByRecipeNumber.overallA;
                    newArr.breakfastData[i].kcal = response.data.data.TechCardByRecipeNumber.overallKcal;
                    newArr.breakfastData[i].yield = response.data.data.TechCardByRecipeNumber.yield;
                    props.setBreakfastState(newArr);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function countOverall() {

        let newArr = { ...props.breakfastState };
        newArr.breakfastOverallB = 0;
        newArr.breakfastOverallR = 0;
        newArr.breakfastOverallA = 0;
        newArr.breakfastOverallKcal = 0;
        for (let i = 0; i < props.breakfastState.breakfastData.length; i++) {
            newArr.breakfastOverallB += props.breakfastState.breakfastData[i].b;
            newArr.breakfastOverallR += props.breakfastState.breakfastData[i].r;
            newArr.breakfastOverallA += props.breakfastState.breakfastData[i].a;
            newArr.breakfastOverallKcal += props.breakfastState.breakfastData[i].kcal;
        }
        props.setBreakfastState(newArr);
    }

    function addRow() {
        let margin = parseInt(document.getElementById("firstMargin").style.marginTop);
        if (margin) {
            margin = margin + 70;
        } else {
            margin = 870;
        }
        document.getElementById("firstMargin").style.marginTop = margin + "px";

        let newArr = { ...props.breakfastState };
        newArr.breakfastData.push({
            name: "",
            yield: '',
            b: null,
            r: null,
            a: null,
            kcal: null
        })
        props.setBreakfastState(newArr);
    }

    return (
        <div className="CreateBreakfast">
            <div className="Container1">
                <div className="backBtnContainer">
                    <Button variant="contained" color="secondary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
                </div>
            </div>
            <div className="Container5">
                <h3 style={{ color: "#FFFFFF" }}>Valgiaraštis</h3>
            </div>
            <div className="Container5">
                <InputBase id="nameOfMenu" label="Pavadinimas" value={props.breakfastState.nameOfMenu} style={{ marginBottom: "20px", minWidth: 500, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
            </div>
            <div className="Container5">
                <h3 style={{ color: "#FFFFFF" }}>Pusryčiai</h3>
            </div>
            <div className="Container">
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
                            {props.breakfastState.breakfastData.map((row, i) => (
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
                                <TableCell align="center" className={classes.border}>{props.breakfastState.breakfastOverallB}</TableCell>
                                <TableCell align="center" className={classes.border}>{props.breakfastState.breakfastOverallR}</TableCell>
                                <TableCell align="center" className={classes.border}>{props.breakfastState.breakfastOverallA}</TableCell>
                                <TableCell align="center" className={classes.border}>{props.breakfastState.breakfastOverallKcal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>

                <div className="Container5">
                    <Button onClick={addRow} variant="contained" color="secondary" className={classes.button}>Pridėti eilutę</Button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Breakfast);