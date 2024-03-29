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
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../css/inline-style/createMenuStyle.js';
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


function ViewProducts(props) {
    const classes = useStyles();
    const { getTokenSilently } = useAuth0();

    const [productName, setProductName] = useState([]);
    const [searchState, setSearchState] = useState("");
    const [edit, setEdit] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [deleteConfirmation, setDeleteConfirmation] = useState({ code: "", row: "" });
    const [deleteProgress, setDeleteProgress] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [productToEdit, setProductToEdit] = useState({
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

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getAllProducts() {
        const token = await getTokenSilently();
        axios({
            url: 'https://samaista.herokuapp.com/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
            query{
                Products {
                  code
                  nameOfProduct
                }
            }
            `
            }
        })
            .then((response) => {
                setProductName(response.data.data.Products);
                setSearchState(response.data.data.Products);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }

    async function getProduct(code) {
        const token = await getTokenSilently();
        axios({
            url: 'https://samaista.herokuapp.com/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
            query{
                ProductByCode(code: "${code}") {
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
                setProductToEdit(response.data.data.ProductByCode);
                setEdit(true);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }

    const handleChange = i => e => {

        let newArr = { ...productToEdit };
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
        setProductToEdit(newArr);

    }

    function handleSnackbar(action) {
        if (action === "open") {
            setSnackbarState(true);
        } else if (action === "close") {
            setSnackbarState(false);
        }
    }

    async function deleteProduct(code) {
        const token = await getTokenSilently();
        axios({
            url: 'https://samaista.herokuapp.com/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
                mutation{
                    deleteProduct (code: ${code}){
                      code
                    }
                  }
                `
            }
        })
            .then((response) => {
                if (response.statusText === "OK" && !response.data.errors) {
                    setSnackbarText("Produktas ištrintas sėkmingai!");
                    setSnackbarSeverity("success");
                    handleSnackbar("open");
                } else {
                    setSnackbarText("Ištrinti nepavyko!");
                    setSnackbarSeverity("error");
                    handleSnackbar("open");
                }
                getAllProducts();
                setDeleteConfirmation({ code: "", row: "" });
                setOpenDeleteModal(false);
                setDeleteProgress(false);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }

    function handleClick(code, i, type) {
        if (type === "edit") {
            getProduct(code);
        }
        else if (type === "delete") {
            deleteProduct(code);
        }
    }

    function clearState() {
        setProductToEdit({
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
        setProductName(searchState);
    }

    async function handleSubmit() {
        const token = await getTokenSilently();
        axios({
            url: 'https://samaista.herokuapp.com/graphql',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                query: `
                mutation{
                    updateProduct (code: ${productToEdit.code}, nameOfProduct: "${productToEdit.nameOfProduct}", bruto: ${productToEdit.bruto}, neto: ${productToEdit.neto}, b: ${productToEdit.b}, r: ${productToEdit.r}, a: ${productToEdit.a}, kcal: ${productToEdit.kcal}, category: "${productToEdit.category}"){
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
                if (response.statusText === "OK" && !response.data.errors) {
                    setSnackbarText("Produktas atnaujintas sėkmingai!");
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

    const handleSearch = i => e => {
        let tempArr = [...searchState];
        let results = tempArr.filter(el => el.nameOfProduct.includes(e.target.value));
        setProductName(results);
    }

    return (
        <div className="viewProducts">
            <div className="backBtn">
                <Button variant="contained" color="primary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
            </div>
            {edit ?
                <div className="product">
                    <div className="createProductName">
                        <h3 style={{ color: "#FFFFFF", marginLeft: "550px" }}>Produktas</h3>
                    </div>
                    <Container classes={classes.root} maxWidth="lg">
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow className={classes.blueHeader}>
                                    <TableCell rowSpan={2} className={classes.border}>
                                        Kodas
                            </TableCell>
                                    <TableCell rowSpan={2} className={classes.border}>Maisto produkto pavadinimas</TableCell>
                                    <TableCell align="center" colSpan={2} className={classes.border}>Masė, g</TableCell>
                                    <TableCell align="center" colSpan={4} className={classes.border}>Maistinė ir energinė vertė</TableCell>
                                    <TableCell align="center" rowSpan={2} className={classes.border}>Kategorija</TableCell>
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
                                <TableRow>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={productToEdit.code}
                                        onChange={handleChange()}
                                        disabled
                                        error
                                        id="code"
                                    /></TableCell>
                                    <TableCell className={classes.border}><TextField1
                                        inputProps={{ style: { color: '#FFFFFF', width: 100 } }}
                                        value={productToEdit.nameOfProduct}
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
                                        value={productToEdit.bruto}
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
                                        value={productToEdit.neto}
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
                                        value={productToEdit.b}
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
                                        value={productToEdit.r}
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
                                        value={productToEdit.a}
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
                                            value={productToEdit.kcal}
                                            onChange={handleChange()}
                                            error
                                            id="kcal"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.border} >
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                value={productToEdit.category}
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
                                                <MenuItem value="Jautiena, jautienos subproduktai ir gaminiai">Jautiena, jautienos subproduktai ir gaminiai</MenuItem>
                                                <MenuItem value="Veršiena, veršienos subproduktai ir gaminiai">Veršiena, veršienos subproduktai ir gaminiai</MenuItem>
                                                <MenuItem value="Vištiena, vištienos subproduktai ir gaminiai">Vištiena, vištienos subproduktai ir gaminiai</MenuItem>
                                                <MenuItem value="Kalakutiena, kalakutienos subproduktai ir gaminiai">Kalakutiena, kalakutienos subproduktai ir gaminiai</MenuItem>
                                                <MenuItem value="Triušiena ">Triušiena</MenuItem>
                                                <MenuItem value="Aviena, avienos subproduktai ir gaminiai">Aviena, avienos subproduktai ir gaminiai</MenuItem>
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
                                                <MenuItem value="Vanduo">Vanduo</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Container>
                    <div className="editProductButtons">
                        <Button onClick={() => { setEdit(false); clearState(); }} variant="contained" color="primary" className={classes.button} style={{ alignSelf: "flex-end", marginRight: "30px" }}>Atšaukti</Button>
                        <Button onClick={() => { handleSubmit(); }} variant="contained" color="primary" className={classes.button} style={{ alignSelf: "flex-end", marginRight: "30px" }}>Išsaugoti</Button>
                    </div>
                </div>
                :
                <Grid className="product">
                    <TextField1
                        placeholder="Paieška"
                        onChange={handleSearch()}
                        id="search"
                    />
                    <h3 style={{ color: "#FFFFFF" }}>Produktai</h3>
                    {productName.length ?
                        <div className={classes.demo} >

                            <List classes={{ root: classes.root }}>
                                {productName.map((row, i) => (
                                    <ListItem divider >
                                        <ListItemText
                                            primary={row.nameOfProduct}
                                            secondary={row.code}
                                        />

                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleClick(row.code, i, "edit")} >
                                                <EditIcon style={{ color: '#FFFFFF' }} />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="pdf">
                                                <PictureAsPdfIcon style={{ color: '#FFFFFF' }} />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon style={{ color: '#FFFFFF' }} onClick={() => { setDeleteConfirmation({ code: row.code, row: row.i }); setOpenDeleteModal(true) }} />
                                            </IconButton>
                                        </ListItemSecondaryAction>

                                    </ListItem>
                                ))}
                            </List>


                        </div>
                        :
                        <CircularProgress color="primary" size={68} disableShrink style={{ marginLeft: "30px" }} thickness={5} />
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
                        <DialogTitle id="alert-dialog-title">{"Ar tikrai norite ištrinti šį produktą?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Ar tikrai norite ištrinti šį produktą?
                            </DialogContentText>
                            {deleteProgress ?
                                <CircularProgress color="primary" size={68} disableShrink style={{ marginLeft: "30px" }} thickness={5} />
                                : null}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteModal(false)} color="primary" autoFocus>
                                Ne
                            </Button>
                            <Button onClick={() => { handleClick(deleteConfirmation.code, deleteConfirmation.row, "delete"); setDeleteProgress(true) }} color="primary" >
                                Taip
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            }
        </div >
    );
}

export default withRouter(ViewProducts);