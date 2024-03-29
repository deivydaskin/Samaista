import React, { useState, useEffect } from 'react';
import '../../css/createTechCard.css';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextFieldMui from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { data } from './DataUtil';
import axios from 'axios';
import { useStyles } from '../../css/inline-style/createMenuStyle.js';
import { styles } from '../../css/inline-style/createMenuStyle.js';
import { Container } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
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

function CreateTechCard(props) {
    useEffect(() => {
    }, [])

    const classes = useStyles();
    const { getTokenSilently } = useAuth0();
    const [dataState, setDataState] = useState(data);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [firstBruto, setFirstBruto] = useState();
    const [firstB, setFirstB] = useState();
    const [firstR, setFirstR] = useState();
    const [firstA, setFirstA] = useState();
    const [firstKcal, setFirstKcal] = useState();

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
        }
        else if (e.target.id === "code") {
            newArr.data[i][e.target.id] = parseInt(e.target.value);
            console.log(newArr);
        }
        else if (e.target.id === "yield") {
            newArr.yield = e.target.value;
        }
        else if (e.target.id === "recipeNumber") {
            newArr.recipeNumber = e.target.value;
        }
        else if (e.target.id === "neto") {
            newArr.data[i][e.target.id] = parseFloat(e.target.value);
            if (firstBruto) {
                calculations(i);
            }
            let overallB = 0;
            let overallR = 0;
            let overallA = 0;
            let overallKcal = 0;
            for (let i = 0; i < newArr.data.length; i++) {
                overallB += dataState.data[i].b;
                overallR += dataState.data[i].r;
                overallA += dataState.data[i].a;
                overallKcal += dataState.data[i].kcal;
            }
            newArr.overallB = overallB.toFixed(2);
            newArr.overallR = overallR.toFixed(2);
            newArr.overallA = overallA.toFixed(2);
            newArr.overallKcal = overallKcal.toFixed(2);
        }
        else {
            newArr.data[i][e.target.id] = parseFloat(e.target.value);
        }
        setDataState(newArr);

        if (e.target.id === "b" || e.target.id === "r" || e.target.id === "a" || e.target.id === "kcal") {
            countOverall();
        }
    }

    function handleSnackbar(action) {
        if (action === "open") {
            setSnackbarState(true);
        } else if (action === "close") {
            setSnackbarState(false);
        }
    }

    const countOverall = () => {
        let newArr = { ...dataState };
        let overallB = 0;
        let overallR = 0;
        let overallA = 0;
        let overallKcal = 0;
        for (let i = 0; i < newArr.data.length; i++) {
            overallB += dataState.data[i].b;
            overallR += dataState.data[i].r;
            overallA += dataState.data[i].a;
            overallKcal += dataState.data[i].kcal;
        }
        newArr.overallB = overallB.toFixed(2);
        newArr.overallR = overallR.toFixed(2);
        newArr.overallA = overallA.toFixed(2);
        newArr.overallKcal = overallKcal.toFixed(2);
        setDataState(newArr);
    }

    function addRow() {
        let newArr = { ...dataState };
        newArr.data.push({
            number: dataState.data.length + 1,
            name: "",
            code: null,
            bruto: null,
            neto: null,
            b: null,
            r: null,
            a: null,
            kcal: null
        })
        setDataState(newArr);
    }

    async function getProduct(arg, i, type) {
        const token = await getTokenSilently();
        if (type === "code") {
            axios({
                url: 'https://samaista.herokuapp.com/graphql',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    query: `
                query{
                    ProductByCode(code: "${arg}") {
                      nameOfProduct
                      bruto
                      neto
                      b
                      r
                      a
                      kcal
                    }
                }
                `
                }
            })
                .then((response) => {
                    if (response.statusText === "OK" && !response.data.errors && response.data.data.ProductByCode != null) {
                        let newArr = { ...dataState };
                        newArr.data[i].name = response.data.data.ProductByCode.nameOfProduct;
                        newArr.data[i].bruto = response.data.data.ProductByCode.bruto;
                        newArr.data[i].neto = response.data.data.ProductByCode.neto;
                        newArr.data[i].b = response.data.data.ProductByCode.b;
                        newArr.data[i].r = response.data.data.ProductByCode.r;
                        newArr.data[i].a = response.data.data.ProductByCode.a;
                        newArr.data[i].kcal = response.data.data.ProductByCode.kcal;
                        setDataState(newArr);
                        let newBruto = { ...firstBruto };
                        let newB = { ...firstB };
                        let newR = { ...firstR };
                        let newA = { ...firstA };
                        let newKcal = { ...firstKcal };
                        newBruto[i] = response.data.data.ProductByCode.bruto;
                        newB[i] = response.data.data.ProductByCode.b;
                        newR[i] = response.data.data.ProductByCode.r;
                        newA[i] = response.data.data.ProductByCode.a;
                        newKcal[i] = response.data.data.ProductByCode.kcal;
                        setFirstBruto(newBruto);
                        setFirstB(newB);
                        setFirstR(newR);
                        setFirstA(newA);
                        setFirstKcal(newKcal);
                    } else {
                        setSnackbarText("Tokio produkto nėra!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    }
                })
                .then(() => countOverall())
                .catch((error) => {
                    setSnackbarText("Įvyko klaida!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                    console.log(error);
                });
        } else if (type === "name") {
            axios({
                url: 'https://samaista.herokuapp.com/graphql',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    query: `
                    query{
                        ProductByName(nameOfProduct: "${arg}") {
                          nameOfProduct
                          code
                          bruto
                          neto
                          b
                          r
                          a
                          kcal
                        }
                    }
                    `
                }
            })
                .then((response) => {
                    if (response.statusText === "OK" && !response.data.errors && response.data.data.ProductByName != null) {
                        let newArr = { ...dataState };
                        newArr.data[i].name = response.data.data.ProductByName.nameOfProduct;
                        newArr.data[i].code = response.data.data.ProductByName.code;
                        newArr.data[i].bruto = response.data.data.ProductByName.bruto;
                        newArr.data[i].neto = response.data.data.ProductByName.neto;
                        newArr.data[i].b = response.data.data.ProductByName.b;
                        newArr.data[i].r = response.data.data.ProductByName.r;
                        newArr.data[i].a = response.data.data.ProductByName.a;
                        newArr.data[i].kcal = response.data.data.ProductByName.kcal;
                        setDataState(newArr);
                    } else {
                        setSnackbarText("Tokio produkto nėra!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    }
                })
                .then(() => countOverall())
                .catch((error) => {
                    setSnackbarText("Įvyko klaida!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                    console.log(error);
                });
        }
    }

    async function saveDoc() {
        //GraphQL reikalauja names of fields be "" todel panaudojau regex, nes nezinau kaip kitaip isparsint.
        let payload = JSON.stringify(dataState.data);
        const unquoted = payload.replace(/"([^"]+)":/g, '$1:');
        console.log(unquoted);
        const token = await getTokenSilently();
        const validacity = await validation();
        if (validacity) {
            axios({
                url: 'https://samaista.herokuapp.com/graphql',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    query: `
                mutation {
                    addTechCard (recipeNumber: "${dataState.recipeNumber}", nameOfCard: "${dataState.nameOfCard}", description: "${dataState.description}", data:${unquoted}, overallB: ${dataState.overallB}, overallR: ${dataState.overallR}, overallA: ${dataState.overallA}, overallKcal: ${dataState.overallKcal}, yield: "${dataState.yield}"){
                      recipeNumber
                      nameOfCard
                      description
                      data {
                        number
                        code
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
                    if (response.statusText === "OK" && !response.data.errors) {
                        setSnackbarText("Technologinė kortelė išsaugota!");
                        setSnackbarSeverity("success");
                        handleSnackbar("open");
                        setDataState({
                            recipeNumber: "",
                            nameOfCard: "",
                            description: "",
                            data: [
                                {
                                    number: 1,
                                    code: null,
                                    name: "",
                                    bruto: null,
                                    neto: null,
                                    b: null,
                                    r: null,
                                    a: null,
                                    kcal: null
                                },
                            ],
                            overallB: null,
                            overallR: null,
                            overallA: null,
                            overallKcal: null,
                            yield: ""
                        });
                    } else if (response.data.errors[0].message === "Toks receptūros numeris jau egzistuoja!") {
                        setSnackbarText("Toks receptūros numeris jau egzistuoja!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    } else {
                        setSnackbarText("Išsaugoti nepavyko!");
                        setSnackbarSeverity("error");
                        handleSnackbar("open");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setSnackbarText("Išsaugoti nepavyko!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                });
        }
    }

    function calculations(i) {
        let newArr = { ...dataState };
        let newNeto = newArr.data[i].neto;
        newArr.data[i].bruto = parseFloat(((firstBruto[i] * newNeto) / 100).toFixed(0));
        newArr.data[i].b = parseFloat(((firstB[i] * newNeto) / 100).toFixed(2));
        newArr.data[i].r = parseFloat(((firstR[i] * newNeto) / 100).toFixed(2));
        newArr.data[i].a = parseFloat(((firstA[i] * newNeto) / 100).toFixed(2));
        newArr.data[i].kcal = parseFloat(((firstKcal[i] * newNeto) / 100).toFixed(2));
        setDataState(newArr);
    }

    function validation() {
        let validationArr = { ...dataState };
        if (validationArr.nameOfCard === "") {
            setSnackbarText("Kortelės pavadinimas negali būti tusčias!");
            setSnackbarSeverity("error");
            handleSnackbar("open");
            return false;
        } else if (validationArr.recipeNumber === "") {
            setSnackbarText("Kortelės recepto numeris negali būti tusčias!");
            setSnackbarSeverity("error");
            handleSnackbar("open");
            return false;
        } else if (validationArr.description === "") {
            setSnackbarText("Kortelės aprašymas negali būti tusčias!");
            setSnackbarSeverity("error");
            handleSnackbar("open");
            return false;
        } else if (validationArr.yield === "") {
            setSnackbarText("Kortelės išeiga negali būti tusčias!");
            setSnackbarSeverity("error");
            handleSnackbar("open");
            return false;
        } else if (validationArr.data.length > 0) {
            for (let i = 0; i < validationArr.data.length; i++) {
                if (validationArr.data[i].code === null) {
                    setSnackbarText("Kortelės produkto laukas negali būti tusčias!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                    return false;
                }
            }
        }
        return true;
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
                <InputBase id="nameOfCard" placeholder="Pavadinimas" label="Pavadinimas" value={dataState.nameOfCard} style={{ marginBottom: "20px", minWidth: 500, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
            </div>
            <div className="Container1">
                <InputBase id="recipeNumber" placeholder="Receptūros nr." value={dataState.recipeNumber} style={{ marginBottom: "10px", marginLeft: "170px", minWidth: 50, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
            </div>
            <div className="Container4">
                <Container classes={classes.root} maxWidth="lg">
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                            <TableRow className={classes.header}>
                                <TableCell rowSpan={2} className={classes.border}>
                                    Eil. Nr.
                                </TableCell>
                                <TableCell rowSpan={2} className={classes.border}>
                                    Produkto Kodas
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
                                        value={row.number || ''}
                                        onChange={handleChange(i)}
                                        error
                                        id="number"
                                        style={{ width: "50px" }}
                                    /></TableCell>
                                    <TableCell className={classes.border} style={{ paddingRight: "0px" }}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.code || ''}
                                        onChange={handleChange(i)}
                                        error
                                        id="code"
                                        style={{ width: "75px" }}
                                    />
                                        <Button onClick={() => getProduct(row.code, i, "code")}><SearchIcon style={{ color: '#FFFFFF', paddingRight: "0px", marginRight: "0px" }} /></Button>
                                    </TableCell>
                                    <TableCell className={classes.border} style={{ paddingRight: "0px" }}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={row.name || ''}
                                        onChange={handleChange(i)}
                                        error
                                        id="name"
                                        style={{ width: "150px" }}
                                    /><Button onClick={() => getProduct(row.name, i, "name")}><SearchIcon style={{ color: '#FFFFFF', paddingRight: "0px", marginRight: "0px" }} /></Button>
                                    </TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '1',
                                            min: '0'
                                        }}
                                        value={row.bruto || 0}
                                        onChange={handleChange(i)}
                                        error
                                        id="bruto"
                                        disabled
                                        style={{ width: "75px" }}
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '1',
                                            min: '0'
                                        }}
                                        value={row.neto || 0}
                                        onChange={handleChange(i)}
                                        error
                                        id="neto"
                                        style={{ width: "75px" }}
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '0.01',
                                            min: '0'
                                        }}
                                        value={row.b || 0}
                                        onChange={handleChange(i)}
                                        error
                                        disabled
                                        id="b"
                                        style={{ width: "75px" }}
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '0.01',
                                            min: '0'
                                        }}
                                        value={row.r || 0}
                                        onChange={handleChange(i)}
                                        error
                                        disabled
                                        id="r"
                                        style={{ width: "75px" }}
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{
                                            style: { color: '#FFFFFF', width: 100 },
                                            type: 'number',
                                            step: '0.01',
                                            min: '0'
                                        }}
                                        value={row.a || 0}
                                        onChange={handleChange(i)}
                                        error
                                        disabled
                                        id="a"
                                        style={{ width: "75px" }}
                                    /></TableCell>
                                    <TableCell className={classes.border}>
                                        <TextField1
                                            inputProps={{
                                                style: { color: '#FFFFFF', width: 100 },
                                                type: 'number',
                                                step: '0.01',
                                                min: '0'
                                            }}
                                            value={row.kcal || 0}
                                            onChange={handleChange(i)}
                                            error
                                            disabled
                                            id="kcal"
                                            style={{ width: "75px" }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell align="right" colSpan={3} className={classes.border}>Išeiga:
                            </TableCell>
                                <TableCell align="center" colSpan={2} className={classes.border}>
                                    <TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={dataState.yield || ''}
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
                                <TableCell align="right" colSpan={5} className={classes.border}>Patiekalo maistinė ir energinė vertė:</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallB || ''}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallR || ''}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallA || ''}</TableCell>
                                <TableCell align="center" className={classes.border}>{dataState.overallKcal || ''}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>
                <div className="Container5">
                    <InputLabel style={{ marginTop: '5px', marginLeft: '35px', alignSelf: 'flex-start', color: '#FFFFFF' }}>Aprašas:</InputLabel>
                    <InputBase id="description" label="Aprašas" value={dataState.description} multiline variant="outlined" style={{ marginBottom: "10px", marginTop: "10px", minWidth: "1125px", color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
                    <Button onClick={addRow} variant="contained" color="secondary" className={classes.button}>Pridėti eilutę</Button>
                    <Button onClick={saveDoc} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "flex-end" }}>Išsaugoti</Button>
                </div>
                <Snackbar open={snackbarState} autoHideDuration={6000} onClose={() => handleSnackbar("close")}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                    <Alert onClose={() => handleSnackbar("close")} severity={snackbarSeverity}>
                        {snackbarText}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default withRouter(CreateTechCard);