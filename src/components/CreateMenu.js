import React, { useState, useEffect } from 'react';
import '../css/createMenu.css';
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

function CreateMenu(props) {
    useEffect(() => {
        countOverall();
    }, [])

    const classes = useStyles();

    const [dataState, setDataState] = useState({
        nameOfMenu: "Pavadinimas",
        data: [
            {
                recipeNumber: null,
                name: "",
                yield: "",
                b: null,
                r: null,
                a: null,
                kcal: null
            }],
        overallB: null,
        overallR: null,
        overallA: null,
        overallKcal: null
    });

    const handleChange = i => e => {
        let newArr = { ...dataState };
        if (e.target.id === "nameOfMenu") {
            newArr.nameOfMenu = e.target.value;
        } else if (e.target.id === "name") {
            newArr.data[i][e.target.id] = e.target.value;
        }
        setDataState(newArr);


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
                    let newArr = { ...dataState };
                    newArr.data[i].recipeNumber = response.data.data.TechCardByName.recipeNumber;
                    newArr.data[i].b = response.data.data.TechCardByName.overallB;
                    newArr.data[i].r = response.data.data.TechCardByName.overallR;
                    newArr.data[i].a = response.data.data.TechCardByName.overallA;
                    newArr.data[i].kcal = response.data.data.TechCardByName.overallKcal;
                    newArr.data[i].yield = response.data.data.TechCardByName.yield;
                    setDataState(newArr);
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
                        TechCardByRecipeNumber(recipeNumber:"${arg}") {
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
                    let newArr = { ...dataState };
                    newArr.data[i].recipeNumber = response.data.data.TechCardRecipeNumber.recipeNumber;
                    newArr.data[i].b = response.data.data.TechCardRecipeNumber.overallB;
                    newArr.data[i].r = response.data.data.TechCardRecipeNumber.overallR;
                    newArr.data[i].a = response.data.data.TechCardRecipeNumber.overallA;
                    newArr.data[i].kcal = response.data.data.TechCardRecipeNumber.overallKcal;
                    newArr.data[i].yield = response.data.data.TechCardRecipeNumber.yield;
                    setDataState(newArr);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    function countOverall() {

        let newArr = { ...dataState };
        newArr.overallB = 0;
        newArr.overallR = 0;
        newArr.overallA = 0;
        newArr.overallKcal = 0;
        for (let i = 0; i < dataState.data.length; i++) {
            newArr.overallB += dataState.data[i].b;
            newArr.overallR += dataState.data[i].r;
            newArr.overallA += dataState.data[i].a;
            newArr.overallKcal += dataState.data[i].kcal;
        }
        setDataState(newArr);
        console.log(dataState);
    }

    function addRow() {
        let newArr = { ...dataState };
        newArr.data.push({
            number: dataState.data.length + 1,
            name: "",
            yield: '',
            b: null,
            r: null,
            a: null,
            kcal: null
        })
        setDataState(newArr);
    }

    function saveDoc() {

        //GraphQL reikalauja names of fields be "" todel panaudojau regex, nes nezinau kaip kitaip isparsint.
        let payload = JSON.stringify(dataState.data);
        const unquoted = payload.replace(/"([^"]+)":/g, '$1:');

        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
                mutation {
                    addMenu (nameOfMenu: "${dataState.nameOfMenu}", data: ${unquoted}, overallB: ${dataState.overallB}, overallR: ${dataState.overallR}, overallA: ${dataState.overallA}, overallKcal: ${dataState.overallKcal}){
                      nameOfMenu
                      data {
                        number
                        name
                        yield
                        b
                        r
                        a
                        kcal
                      }
                      overallB
                      overallR
                      overallA
                      overallKcal
                    }
                  }
                  
                `
            }
        })
            .then((response) => {
                console.log(response);
                alert(response.statusText);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="CreateMenu">
            <div className="Container1">
                <div className="backBtnContainer">
                    <Button variant="contained" color="secondary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
                </div>
            </div>
            <div className="Container2">
                <h3 style={{ color: "#FFFFFF" }}>Valgiaraštis</h3>
            </div>
            <div className="Container3">
                <InputBase id="nameOfMenu" label="Pavadinimas" value={dataState.nameOfMenu} style={{ marginBottom: "20px", minWidth: 500, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
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
                            {dataState.data.map((row, i) => (
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
                                    /><Button onClick={() => getTechCard(row.recipeNumber, i, "recipeNumber")}><SearchIcon style={{ color: '#FFFFFF' }} /></Button>
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
                                <TableCell align="center" className={classes.border}>{dataState.overallB}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallR}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallA}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallKcal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>

                <div className="Container5">
                    <Button onClick={addRow} variant="contained" color="secondary" className={classes.button}>Pridėti eilutę</Button>
                    <Button onClick={saveDoc} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "flex-end", marginRight: '30px' }}>Išsaugoti</Button>
                </div>
            </div>
        </div >
    );
}

export default withRouter(CreateMenu);