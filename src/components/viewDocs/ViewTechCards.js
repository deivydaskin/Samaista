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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextFieldMui from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../css/inline-style/createMenuStyle.js';
import SearchIcon from '@material-ui/icons/Search';

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


function ViewTechCards(props) {

    const classes = useStyles();

    const [techCardName, setTechCardName] = useState([]);
    const [edit, setEdit] = useState(false);
    const [techCardToEdit, setTechCardToEdit] = useState({
        recipeNumber: "",
        nameOfCard: "",
        description: "",
        data: [
            {
                number: null,
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

    useEffect(() => {
        getAllTechCards()
    }, []);

    function getAllTechCards() {
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
            query{
                TechCards {
                  recipeNumber
                  nameOfCard
                }
            }
            `
            }
        })
            .then((response) => {
                console.log(response);
                setTechCardName(response.data.data.TechCards);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getTechCard(recipeNumber) {
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
            query{
                TechCardByRecipeNumber(recipeNumber: "${recipeNumber}") {
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
                console.log(response);
                setTechCardToEdit(response.data.data.TechCardByRecipeNumber);
                setEdit(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChange = i => e => {

        let newArr = { ...techCardToEdit };
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
        else {
            newArr.data[i][e.target.id] = parseFloat(e.target.value);
        }
        setTechCardToEdit(newArr);

        if (e.target.id === "b" || e.target.id === "r" || e.target.id === "a" || e.target.id === "kcal") {
            countOverall()
        }

    }

    function countOverall() {
        let overallB = 0;
        let overallR = 0;
        let overallA = 0;
        let overallKcal = 0;
        for (let i = 0; i < techCardToEdit.data.length; i++) {
            overallB += techCardToEdit.data[i].b;
            overallR += techCardToEdit.data[i].r;
            overallA += techCardToEdit.data[i].a;
            overallKcal += techCardToEdit.data[i].kcal;
        }
        let newArr = { ...techCardToEdit };
        newArr.overallB = overallB;
        newArr.overallR = overallR;
        newArr.overallA = overallA;
        newArr.overallKcal = overallKcal;
        setTechCardToEdit(newArr);
    }

    function handleClick(recipeNumber, i, type) {
        if (type === "edit") {
            getTechCard(recipeNumber);
        }
        else if (type === "delete") {
            axios({
                url: 'http://localhost:3000/graphql',
                method: 'POST',
                data: {
                    query: `
                    mutation{
                        deleteTechCard (recipeNumber: "${recipeNumber}"){
                          recipeNumber
                        }
                      }
                    `
                }
            })
                .then((response) => {
                    alert(response.statusText);
                    getAllTechCards()
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function clearState() {
        setTechCardToEdit({
            recipeNumber: "",
            nameOfCard: "",
            description: "",
            data: [
                {
                    number: null,
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
    }

    function handleSubmit() {
        let payload = JSON.stringify(techCardToEdit.data);
        const unquoted = payload.replace(/"([^"]+)":/g, '$1:');
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
                mutation {
                    updateTechCard (recipeNumber: "${techCardToEdit.recipeNumber}", nameOfCard: "${techCardToEdit.nameOfCard}",
                    description: "${techCardToEdit.description}", data: ${unquoted}, overallB: ${techCardToEdit.overallB},
                    overallR: ${techCardToEdit.overallR}, overallA: ${techCardToEdit.overallA},
                    overallKcal: ${techCardToEdit.overallKcal}, yield: "${techCardToEdit.yield}"){
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
                console.log(response);
                alert(response.statusText);
                setEdit(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function addRow() {
        let newArr = { ...techCardToEdit };
        newArr.data.push({
            number: techCardToEdit.data.length + 1,
            name: "",
            code: null,
            bruto: null,
            neto: null,
            b: null,
            r: null,
            a: null,
            kcal: null
        })
        setTechCardToEdit(newArr);
    }

    function getProduct(arg, i, type) {
        if (type === "code") {
            axios({
                url: 'http://localhost:3000/graphql',
                method: 'POST',
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
                    console.log(response.data.data);
                    let newArr = { ...techCardToEdit };
                    newArr.data[i].name = response.data.data.ProductByCode.nameOfProduct;
                    newArr.data[i].bruto = response.data.data.ProductByCode.bruto;
                    newArr.data[i].neto = response.data.data.ProductByCode.neto;
                    newArr.data[i].b = response.data.data.ProductByCode.b;
                    newArr.data[i].r = response.data.data.ProductByCode.r;
                    newArr.data[i].a = response.data.data.ProductByCode.a;
                    newArr.data[i].kcal = response.data.data.ProductByCode.kcal;
                    setTechCardToEdit(newArr);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (type === "name") {
            axios({
                url: 'http://localhost:3000/graphql',
                method: 'POST',
                data: {
                    query: `
                    query{
                        ProductByName(nameOfProduct: "${arg}") {
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
                    console.log(response.data.data.Product);
                    let newArr = { ...techCardToEdit };
                    newArr.data[i].name = response.data.data.ProductByName.nameOfProduct;
                    newArr.data[i].bruto = response.data.data.ProductByName.bruto;
                    newArr.data[i].neto = response.data.data.ProductByName.neto;
                    newArr.data[i].b = response.data.data.ProductByName.b;
                    newArr.data[i].r = response.data.data.ProductByName.r;
                    newArr.data[i].a = response.data.data.ProductByName.a;
                    newArr.data[i].kcal = response.data.data.ProductByName.kcal;
                    setTechCardToEdit(newArr);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="viewProducts">
            <div className="backBtn">
                <Button variant="contained" color="primary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
            </div>
            {edit ?
                <div className="viewTechCard">
                    <div className="Container2">
                        <h3 style={{ color: "#FFFFFF" }}>{techCardToEdit.nameOfCard}</h3>
                    </div>
                    <div className="Container3">
                        <InputBase id="nameOfCard" label="Pavadinimas" value={techCardToEdit.nameOfCard} style={{ marginBottom: "20px", minWidth: 500, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
                    </div>
                    <div className="Container1">
                        <InputBase id="recipeNumber" disabled value={techCardToEdit.recipeNumber} style={{ marginBottom: "10px", marginLeft: "170px", minWidth: 50, color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
                    </div>
                    <div className="Container4">
                        <Container classes={classes.root} maxWidth="lg">
                            <Table className={classes.table} aria-label="spanning table">
                                <TableHead>
                                    <TableRow className={classes.blueHeader}>
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
                                    <TableRow className={classes.blueHeader}>
                                        <TableCell className={classes.border}>Bruto</TableCell>
                                        <TableCell className={classes.border}>Neto</TableCell>
                                        <TableCell className={classes.border}>B (g)</TableCell>
                                        <TableCell className={classes.border}>R (g)</TableCell>
                                        <TableCell className={classes.border}>A (g)</TableCell>
                                        <TableCell className={classes.border}>Kcal (g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {techCardToEdit.data.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell className={classes.border}><TextField1
                                                inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                                value={row.number}
                                                onChange={handleChange(i)}
                                                error
                                                id="number"
                                                style={{ width: "50px" }}
                                            /></TableCell>
                                            <TableCell className={classes.border} style={{ paddingRight: "0px" }}><TextField1
                                                inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                                value={row.code}
                                                onChange={handleChange(i)}
                                                error
                                                id="code"
                                                style={{ width: "75px" }}
                                            />
                                                <Button onClick={() => getProduct(row.code, i, "code")}><SearchIcon style={{ color: '#FFFFFF', paddingRight: "0px", marginRight: "0px" }} /></Button>
                                            </TableCell>
                                            <TableCell className={classes.border} style={{ paddingRight: "0px" }}><TextField1
                                                inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                                value={row.name}
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
                                                value={row.bruto}
                                                onChange={handleChange(i)}
                                                error
                                                id="bruto"
                                                style={{ width: "75px" }}
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
                                                style={{ width: "75px" }}
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
                                                style={{ width: "75px" }}
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
                                                style={{ width: "75px" }}
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
                                                    value={row.kcal}
                                                    onChange={handleChange(i)}
                                                    error
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
                                                value={techCardToEdit.yield}
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
                                        <TableCell align="center" className={classes.border}>{techCardToEdit.overallB}</TableCell>
                                        <TableCell align="center" className={classes.border}>{techCardToEdit.overallR}</TableCell>
                                        <TableCell align="center" className={classes.border}>{techCardToEdit.overallA}</TableCell>
                                        <TableCell align="center" className={classes.border}>{techCardToEdit.overallKcal}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Container>
                        <div className="Container5">
                            <InputLabel style={{ marginTop: '5px', marginLeft: '35px', alignSelf: 'flex-start', color: '#FFFFFF' }}>Aprašas:</InputLabel>
                            <InputBase id="description" label="Aprašas" value={techCardToEdit.description} multiline variant="outlined" style={{ marginBottom: "10px", marginTop: "10px", minWidth: "1125px", color: "#FFFFFF" }} className={classes.input} onChange={handleChange()} />
                            <Button onClick={addRow} variant="contained" color="primary" className={classes.button}>Pridėti eilutę</Button>
                            <div className="editProductButtons">
                                <Button onClick={() => { setEdit(false); clearState(); }} variant="contained" color="primary" className={classes.button} style={{ alignSelf: "flex-end" }}>Atšaukti</Button>
                                <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.button} style={{ alignSelf: "flex-end" }}>Išsaugoti</Button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Grid className="product">
                    <h3 style={{ color: "#FFFFFF" }}>Technologinės kortelės</h3>
                    <div className={classes.demo} >
                        <List classes={{ root: classes.root }}>
                            {techCardName.map((row, i) => (
                                < ListItem divider>
                                    <ListItemText
                                        primary={row.nameOfCard}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleClick(row.recipeNumber, i, "edit")} >
                                            <EditIcon style={{ color: '#FFFFFF' }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="pdf">
                                            <PictureAsPdfIcon style={{ color: '#FFFFFF' }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon style={{ color: '#FFFFFF' }} onClick={() => handleClick(row.recipeNumber, i, "delete")} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Grid>
            }
        </div >
    );
}

export default withRouter(ViewTechCards);