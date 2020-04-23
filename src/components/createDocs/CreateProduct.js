import React, { useState } from 'react';
import '../../css/createProduct.css';
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
import { useStyles } from '../../css/inline-style/createMenuStyle.js';
import { styles } from '../../css/inline-style/createMenuStyle.js';
import { Container } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

function CreateProduct(props) {
    const classes = useStyles();
    const [productDataState, setProductDataState] = useState({
        code: null,
        nameOfProduct: "",
        bruto: null,
        neto: null,
        b: null,
        r: null,
        a: null,
        kcal: null,
        category: ""
    });

    const handleChange = i => e => {

        let newArr = { ...productDataState };
        if (e.target.id === "nameOfProduct") {
            newArr.nameOfProduct = e.target.value;
        }
        else if (e.target.id === "b") {
            newArr.b = e.target.value;
        }
        else if (e.target.id === "r") {
            newArr.r = e.target.value;
        }
        else if (e.target.id === "a") {
            newArr.a = e.target.value;
        }
        else if (e.target.id === "bruto") {
            newArr.bruto = e.target.value;
        }
        else if (e.target.id === "neto") {
            newArr.neto = e.target.value;
        }
        else if (e.target.id === "kcal") {
            newArr.kcal = e.target.value;
        }
        else if (e.target.name === "category") {
            newArr.category = e.target.value;
        }
        else if (e.target.id === "code") {
            newArr.code = e.target.value;
        }
        setProductDataState(newArr);

    }

    function saveDoc() {
        axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: {
                query: `
                mutation{
                    addProduct (code: ${productDataState.code}, nameOfProduct: "${productDataState.nameOfProduct}", bruto: ${productDataState.bruto}, neto: ${productDataState.neto}, b: ${productDataState.b}, r: ${productDataState.r}, a: ${productDataState.a}, kcal: ${productDataState.kcal}, category: "${productDataState.category}"){
                      code
                      nameOfProduct
                      bruto
                      neto
                      b
                      r
                      a
                      kcal
                      category
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
        <div className="CreateProduct">
            <div className="Container1">
                <div className="backBtnContainer">
                    <Button variant="contained" color="secondary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
                </div>
            </div>
            <div className="createProductName">
                <h3 style={{ color: "#FFFFFF" }}>Produktas</h3>
            </div>
            <div className="createProductTable">
                <Container classes={classes.root} maxWidth="lg">
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                            <TableRow className={classes.header}>
                                <TableCell rowSpan={2} className={classes.border}>
                                    Kodas
                                </TableCell>
                                <TableCell rowSpan={2} className={classes.border}>Maisto produkto pavadinimas</TableCell>
                                <TableCell align="center" colSpan={2} className={classes.border}>Masė, g</TableCell>
                                <TableCell align="center" colSpan={4} className={classes.border}>Maistinė ir energinė vertė</TableCell>
                                <TableCell align="center" rowSpan={2} className={classes.border}>Kategorija</TableCell>
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
                            <TableRow>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                    value={productDataState.code}
                                    onChange={handleChange()}
                                    error
                                    id="code"
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                    value={productDataState.nameOfProduct}
                                    onChange={handleChange()}
                                    error
                                    id="nameOfProduct"
                                /></TableCell>
                                <TableCell className={classes.border}><TextField1
                                    inputProps={{
                                        style: { color: '#FFFFFF', width: 100 },
                                        type: 'number',
                                        step: '1',
                                        min: '0'
                                    }}
                                    value={productDataState.bruto}
                                    onChange={handleChange()}
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
                                    value={productDataState.neto}
                                    onChange={handleChange()}
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
                                    value={productDataState.b}
                                    onChange={handleChange()}
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
                                    value={productDataState.r}
                                    onChange={handleChange()}
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
                                    value={productDataState.a}
                                    onChange={handleChange()}
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
                                        value={productDataState.kcal}
                                        onChange={handleChange()}
                                        error
                                        id="kcal"
                                    />
                                </TableCell>
                                <TableCell className={classes.border} >
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            value={productDataState.category}
                                            onChange={handleChange()}
                                            displayEmpty
                                            className={classes.select}
                                            inputProps={{
                                                classes: {
                                                    icon: classes.icon,
                                                },
                                            }}
                                            name="category"
                                            noWrap
                                            style={{
                                                maxWidth: "100px",
                                                color: "#FFFFFF",
                                                icon: "#FFFFFF"
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Nėra</em>
                                            </MenuItem>
                                            <MenuItem value="Kiauliena, kiaulienos subproduktai ir gaminiai">Kiauliena, kiaulienos subproduktai ir gaminiai</MenuItem>
                                            <MenuItem value="Jautiena, jaulienos subproduktai ir gaminiai">Jautiena, jaulienos subproduktai ir gaminiai</MenuItem>
                                            <MenuItem value="Vištiena, vištienos subproduktai ir gaminiai">Vištiena, vištienos subproduktai ir gaminiai</MenuItem>
                                            <MenuItem value="Kalakutiena, kalakutienos subproduktai ir gaminiai">Kalakutiena, kalakutienos subproduktai ir gaminiai</MenuItem>
                                            <MenuItem value="Triušiena ">Triušiena</MenuItem>
                                            <MenuItem value="Žuvis ir jūros gėrybės">Žuvis ir jūros gėrybės</MenuItem>
                                            <MenuItem value="Pienas ir jo gaminiai">Pienas ir jo gaminiai</MenuItem>
                                            <MenuItem value="Kiaušiniai">Kiaušiniai</MenuItem>
                                            <MenuItem value="Kruopos, ankštiniai">Kruopos, ankštiniai</MenuItem>
                                            <MenuItem value="Perdirbtos daržovės ir grybai">Perdirbtos daržovės ir grybai</MenuItem>
                                            <MenuItem value="Šviežios daržovės ir grybai">Šviežios daržovės ir grybai</MenuItem>
                                            <MenuItem value="Švieži ir perdirbti vaisiai (uogos)">Švieži ir perdirbti vaisiai (uogos)</MenuItem>
                                            <MenuItem value="Sultys">Sultys</MenuItem>
                                            <MenuItem value="Arbatžolės">Arbatžolės</MenuItem>
                                            <MenuItem value="Prieskoniai ir kt.">Prieskoniai ir kt.</MenuItem>
                                            <MenuItem value="Riešutai">Riešutai</MenuItem>
                                            <MenuItem value="Sėklos">Sėklos</MenuItem>
                                            <MenuItem value="Miltiniai gaminiai">Miltiniai gaminiai</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Container>
                <div className="Container5">
                    <Button onClick={saveDoc} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "flex-end", marginRight: "30px" }}>Išsaugoti</Button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(CreateProduct);