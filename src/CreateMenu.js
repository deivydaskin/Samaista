import React, { useState, useEffect } from 'react';
import './App.css';
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
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 50,
        backgroundColor: "#C29FFF",
        color: "#FFF",
        padding: '16px 59.5725px 16px',
        width: 'auto',
        boxShadow: 'none',
        margin: theme.spacing(2),
    },
    border: {
        border: '1px solid black'
    }
}));

const styles = theme => ({
    root: {
        width: '99vw',
        //height: '55vh',
        marginTop: theme.spacing.unit * 3,
        paddingBottom: 20,
        overflowX: 'auto',
        overflowY: 'hidden',
        backgroundColor: 'transparent'
    },
    table: {
        width: '50vw',
        position: 'relative',
        margin: 'auto',
        overflowY: 'hidden',
        //marginBottom: 0,
        borderTop: '1px solid white',
        borderLeft: '1px solid white',
        borderRight: '1px solid white'
    },
    font: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: '1.5rem',
        fontWeight: 500,
        borderLeft: '1px solid white',
        align: 'center',
        backgroundColor: 'rgba(45, 25, 107, 0.6)'
    },
    fontEditable: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: '1.5rem',
        fontWeight: 500,
        borderLeft: '1px solid white',
        align: 'center',
        backgroundColor: 'transparent'
    },
    Input: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: '1.5rem',
        fontWeight: 500,
        backgroundColor: 'transparent',
        marginLeft: 30,
        width: 65,
        padding: 0
    },
    InputOfX: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: '1.5rem',
        fontWeight: 500,
        backgroundColor: 'transparent',
        marginLeft: 30,
        width: 45,
        padding: 0
    },
    output: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: '1.5rem',
        fontWeight: 500,
        borderLeft: '1px solid white',
        align: 'center',
        width: 50,
        backgroundColor: 'rgba(45, 25, 107, 0.6)'
    },
    button: {
        boxShadow: 'none',
        textTransform: 'none',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: '.75rem',
        fontWeight: 500,
        margin: theme.spacing.unit,
        marginBottom: 0,
        backgroundColor: 'rgba(45, 25, 107, 0.6)',
        '&:hover': {
            backgroundColor: 'rgba(45, 25, 107, 0.9)'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgba(45, 25, 107, 0.8)'
        }
    },
    container: {
        position: 'relative',
        margin: 'auto',
        width: '50vw'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150
    },
    selected: {
        '&$selected': {
            color: 'white'
        }
    },
    label: {
        '&$focusedLabel': {
            color: 'white'
        },
        '&$erroredLabel': {
            color: 'white'
        }
    },
    focusedLabel: {},
    erroredLabel: {},
    underline: {
        '&$error:after': {
            borderBottomColor: 'white'
        },
        '&:after': {
            borderBottom: `1px solid white`
        }
    },
    error: {},
    '@media (max-width: 480px)': {
        table: {
            transform: 'scale(0.6)',
            transformOrigin: '8%'
        },
        root: {
            maxWidth: 'auto',
            height: 'auto'
        }
    }
});

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
        nameOfMenu: "Pirmadienis",
        data: [
            {
                number: 1,
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

    function getTechCard(name, i) {
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
                query{
                    TechCard(nameOfCard:"${name}") {
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
                newArr.data[i].b = response.data.data.TechCard.overallB;
                newArr.data[i].r = response.data.data.TechCard.overallR;
                newArr.data[i].a = response.data.data.TechCard.overallA;
                newArr.data[i].kcal = response.data.data.TechCard.overallKcal;
                newArr.data[i].yield = response.data.data.TechCard.yield;
                setDataState(newArr);
            })
            .catch((error) => {
                console.log(error);
            });
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
            <Button variant="contained" color="primary" className={classes.button} onClick={() => props.history.push('/createDoc')} style={{ alignSelf: "flex-start" }}>Atgal</Button>
            <h3>Valgiaraštis</h3>
            <TextField id="nameOfMenu" label="Pavadinimas" value={dataState.nameOfMenu} variant="outlined" style={{ marginBottom: "20px", minWidth: 500 }} onChange={handleChange()} />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow className={classes.border}>
                            <TableCell rowSpan={2} className={classes.border}>
                                Eil. Nr.
                            </TableCell>
                            <TableCell rowSpan={2} className={classes.border}>Patiekalo pavadinimas</TableCell>
                            <TableCell rowSpan={2} align="center" className={classes.border}>Išeiga</TableCell>
                            <TableCell align="center" colSpan={3} className={classes.border}>Patiekalo maistinė vertė, g</TableCell>
                            <TableCell rowSpan={2} className={classes.border}>Energinė vertė, kcal</TableCell>
                        </TableRow>
                        <TableRow className={classes.border}>
                            <TableCell className={classes.border}>B (g)</TableCell>
                            <TableCell className={classes.border}>R (g)</TableCell>
                            <TableCell className={classes.border}>A (g)</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataState.data.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.number}
                                    onChange={handleChange(i)}
                                    error
                                    label="Eil. Nr."
                                    id="number"
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.name}
                                    onChange={handleChange(i)}
                                    error
                                    label="Pavadinimas"
                                    id="name"
                                />
                                    <Button onClick={() => getTechCard(row.name, i)}><SearchIcon /></Button>
                                </TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.yield}
                                    onChange={handleChange(i)}
                                    error
                                    label="Išeiga"
                                    id="yield"
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.b}
                                    onChange={handleChange(i)}
                                    error
                                    label="Baltymai"
                                    id="b"
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.r}
                                    onChange={handleChange(i)}
                                    error
                                    label="Riebalai"
                                    id="r"
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.a}
                                    onChange={handleChange(i)}
                                    error
                                    label="Anglevandeniai"
                                    id="a"
                                /></TableCell>
                                <TableCell className={classes.border}>
                                    <TextField1
                                        inputProps={{ style: { color: '#000000', width: 100 } }}
                                        value={row.kcal}
                                        onChange={handleChange(i)}
                                        error
                                        label="Kilokalorijos"
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
            </TableContainer>
            <Button onClick={addRow} variant="contained" color="primary" className={classes.button}>Pridėti eilutę</Button>
            <Button onClick={saveDoc} variant="contained" color="primary" className={classes.button} style={{ alignSelf: "flex-end" }}>Išsaugoti</Button>
        </div>
    );
}

export default withRouter(CreateMenu);