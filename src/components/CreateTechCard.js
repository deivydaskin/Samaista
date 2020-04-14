import React, { useState, useEffect } from 'react';
import '../css/createMenu.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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
import { data } from './DataUtil';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../css/inline-style/createMenuStyle.js';
import { styles } from '../css/inline-style/createMenuStyle.js';
import { Container } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { InputLabel } from '@material-ui/core';


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

var overallB;
var overallR;
var overallA;
var overallKcal;

function CreateTechCard(props) {
    useEffect(() => {
        countOverall();
    }, [])

    const classes = useStyles();
    const [dataState, setDataState] = useState(data);

    const handleChange = i => e => {

        let newArr = { ...dataState };
        if (e.target.id === "nameOfCard") {
            newArr.nameOfCard = e.target.value;
        }
        else if (e.target.id === "description") {
            newArr.description = e.target.value;
        }
        else if (e.target.id === "name") {
            newArr.data[i][e.target.id] = e.target.value;
        } else if (e.target.id === "yield") {
            newArr.yield = e.target.value;
        } else {
            newArr.data[i][e.target.id] = parseFloat(e.target.value);
        }
        setDataState(newArr);

        if (e.target.id === "b" || e.target.id === "r" || e.target.id === "a" || e.target.id === "kcal") {
            countOverall()
        }

    }

    function countOverall() {
        overallB = 0;
        overallR = 0;
        overallA = 0;
        overallKcal = 0;
        for (let i = 0; i < dataState.data.length; i++) {
            overallB += dataState.data[i].b;
            overallR += dataState.data[i].r;
            overallA += dataState.data[i].a;
            overallKcal += dataState.data[i].kcal;
        }
        let newArr = { ...dataState };
        newArr.overallB = overallB;
        newArr.overallR = overallR;
        newArr.overallA = overallA;
        newArr.overallKcal = overallKcal;
        setDataState(newArr);
    }

    function addRow() {
        let newArr = { ...dataState };
        newArr.data.push({
            number: dataState.data.length + 1,
            name: "",
            bruto: null,
            neto: null,
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
                    addTechCard (nameOfCard: "${dataState.nameOfCard}", description: "${dataState.description}", data: ${unquoted}, overallB: ${dataState.overallB}, overallR: ${dataState.overallR}, overallA: ${dataState.overallA}, overallKcal: ${dataState.overallKcal}, yield: "${dataState.yield}"){
                      nameOfCard
                      description
                      data {
                        number
                        name
                        bruto
                        neto
                        b
                        r
                        a
                        kcal
                      }
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
                console.log(response);
                alert(response.statusText);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="CreateTechCard">
            <div className="Container1">
                <div className="backBtnContainer">
                    <Button variant="contained" color="secondary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
                </div>
            </div>
            <div className="Container2">
                <h3 style={{ color: "#FFFFFF" }}>Patiekalo technologinė kortelė</h3>
            </div>
            <div className="Container3">
                <InputBase id="nameOfCard" label="Pavadinimas" value={dataState.nameOfCard} style={{ marginBottom: "20px", minWidth: 500, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
            </div>
            <div className="Container4">
                <Container classes={classes.root} maxWidth="lg">
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                            <TableRow className={classes.header}>
                                <TableCell rowSpan={2} className={classes.border}>
                                    Eil. Nr.
                            </TableCell>
                                <TableCell rowSpan={2} className={classes.border}>Maisto produkto pavadinimas</TableCell>
                                <TableCell align="center" colSpan={2} className={classes.border}>Masė, g</TableCell>
                                <TableCell align="center" colSpan={4} className={classes.border}>Maistinė ir energinė vertė</TableCell>
                            </TableRow>
                            <TableRow className={classes.header}>
                                <TableCell className={classes.border}>Bruto</TableCell>
                                <TableCell className={classes.border}>Neto</TableCell>
                                <TableCell className={classes.border}>B (g)</TableCell>
                                <TableCell className={classes.border}>R (g)</TableCell>
                                <TableCell className={classes.border}>A (g)</TableCell>
                                <TableCell className={classes.border}>Kcal (g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataState.data.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.number}
                                        onChange={handleChange(i)}
                                        error
                                        id="number"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.name}
                                        onChange={handleChange(i)}
                                        error
                                        id="name"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '1',
                                            min: '0'
                                        }}
                                        value={row.bruto}
                                        onChange={handleChange(i)}
                                        error
                                        id="bruto"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '1',
                                            min: '0'
                                        }}
                                        value={row.neto}
                                        onChange={handleChange(i)}
                                        error
                                        id="neto"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '0.01',
                                            min: '0'
                                        }}
                                        value={row.b}
                                        onChange={handleChange(i)}
                                        error
                                        id="b"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '0.01',
                                            min: '0'
                                        }}
                                        value={row.r}
                                        onChange={handleChange(i)}
                                        error
                                        id="r"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '0.01',
                                            min: '0'
                                        }}
                                        value={row.a}
                                        onChange={handleChange(i)}
                                        error
                                        id="a"
                                    /></TableCell>
                                    <TableCell className={classes.border}>
                                        <TextField1
                                            inputProps={{
                                                style: { color: '#FFFFFF', width: 100 },
                                                type: 'number',
                                                step: '0.01',
                                                min: '0'
                                            }}
                                            value={row.kcal}
                                            onChange={handleChange(i)}
                                            error
                                            id="kcal"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell align="right" colSpan={2} className={classes.border}>Išeiga:
                            </TableCell>
                                <TableCell align="center" colSpan={2} className={classes.border}>
                                    <TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={dataState.yield}
                                        onChange={handleChange()}
                                        error
                                        id="yield"
                                    /></TableCell>
                                <TableCell align="center" className={classes.border}>-</TableCell>
                                <TableCell align="center" className={classes.border}>-</TableCell>
                                <TableCell align="center" className={classes.border}>-</TableCell>
                                <TableCell align="center" className={classes.border}>-</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={4} className={classes.border}>Patiekalo maistinė ir energinė vertė:</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallB}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallR}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallA}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallKcal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>
                <div className="Container5">
                    <InputLabel style={{ marginTop: '5px', marginLeft: '35px', alignSelf: 'flex-start', color: '#FFFFFF' }}>Aprašas:</InputLabel>
                    <InputBase id="description" label="Aprašas" value={dataState.description} multiline variant="outlined" style={{ marginBottom: "10px", marginTop: "10px", minWidth: 1160, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
                    <Button onClick={addRow} variant="contained" color="secondary" className={classes.button}>Pridėti eilutę</Button>
                    <Button onClick={saveDoc} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "flex-end" }}>Išsaugoti</Button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(CreateTechCard);