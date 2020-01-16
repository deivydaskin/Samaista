import React, { useState } from 'react';
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
import { data } from './DataUtil';
import axios from 'axios';


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



function CreateTechCard(props) {
    const classes = useStyles();
    const [dataState, setDataState] = useState(data.data);
    console.log(dataState);

    const handleChange = i => e => {
        let newArr = [...dataState];
        if (e.target.id === "name") {
            newArr[i][e.target.id] = e.target.value;
        } else {
            newArr[i][e.target.id] = parseInt(e.target.value);
        }
        setDataState(newArr);
        console.log(newArr.toString())
    }

    function addRow() {
        setDataState(dataState.concat({
            number: dataState.length + 1,
            name: "",
            bruto: null,
            neto: null,
            b: null,
            r: null,
            a: null,
            kcal: null
        }));
    }

    function saveDoc() {
        console.log(dataState);
        axios
            .post('api/techCards', {
                data: dataState
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="CreateTechCard">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow className={classes.border}>
                            <TableCell rowSpan={2} className={classes.border}>
                                Eil. Nr.
                            </TableCell>
                            <TableCell rowSpan={2} className={classes.border}>Maisto produkto pavadinimas</TableCell>
                            <TableCell align="center" colSpan={2} className={classes.border}>Masė, g</TableCell>
                            <TableCell align="center" colSpan={4} className={classes.border}>Maistinė ir energinė vertė</TableCell>
                        </TableRow>
                        <TableRow className={classes.border}>
                            <TableCell className={classes.border}>Bruto</TableCell>
                            <TableCell className={classes.border}>Neto</TableCell>
                            <TableCell className={classes.border}>B (g)</TableCell>
                            <TableCell className={classes.border}>R (g)</TableCell>
                            <TableCell className={classes.border}>A (g)</TableCell>
                            <TableCell className={classes.border}>Kcal (g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataState.map((row, i) => (
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
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.bruto}
                                    onChange={handleChange(i)}
                                    error
                                    label="Bruto"
                                    id="bruto"
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#000000', width: 100 } }}
                                    value={row.neto}
                                    onChange={handleChange(i)}
                                    error
                                    label="Neto"
                                    id="neto"
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
                            <TableCell align="right" colSpan={2} className={classes.border}>Išeiga:</TableCell>
                            <TableCell align="center" colSpan={2} className={classes.border}>150/4</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right" colSpan={4} className={classes.border}>Patiekalo maistinė ir energinė vertė:</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                            <TableCell align="center" className={classes.border}>-</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={addRow}>Pridėti eilutę</Button>
            <Button onClick={saveDoc}>Išsaugoti</Button>
        </div>
    );
}

export default withRouter(CreateTechCard);