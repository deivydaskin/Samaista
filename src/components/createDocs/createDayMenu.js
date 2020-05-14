import React, { useState, useEffect } from "react";
import '../../css/createMenu.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Breakfast from './Breakfast.js';
import Lunch from './Lunch.js';
import Dinner from './Dinner.js';
import Button from '@material-ui/core/Button';
import { useStyles } from '../../css/inline-style/createMenuStyle.js';
import { useAuth0 } from "../../react-auth0-spa";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { age3, age7 } from './LegalLimits';
import Switch from '@material-ui/core/Switch';
import TextFieldMui from '@material-ui/core/TextField';
import { styles } from '../../css/inline-style/createMenuStyle.js';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import DayMenuPDF from './DayMenuPDF.js';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateDayMenu(props) {
    useEffect(() => {
        getAllMenus()
    }, []);

    const classes = useStyles();
    const { getTokenSilently } = useAuth0();

    const [lopselis, setLopselis] = useState({
        count: 0,
        cost: 0,
        sum: 0
    });
    const [darzelis, setDarzelis] = useState({
        count: 0,
        cost: 0,
        sum: 0
    });
    const [darbuotojai, setDarbuotojai] = useState({
        count: 0,
        cost: 0,
        sum: 0
    });

    const [spinner, setSpinner] = useState(false);

    const [menuName, setMenuName] = useState([]);
    const [selectedMenu1_3, setSelectedMenu1_3] = useState("");
    const [selectedMenu4_7, setSelectedMenu4_7] = useState("");
    const [ageGroup, setAgeGroup] = useState(false);

    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    function handleSnackbar(action) {
        if (action === "open") {
            setSnackbarState(true);
        } else if (action === "close") {
            setSnackbarState(false);
        }
    }

    function handleSwitchChange() {
        setAgeGroup(!ageGroup);
    }


    async function getAllMenus() {
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
                Menus {
                  nameOfMenu
                }
            }
            `
            }
        })
            .then((response) => {
                console.log(response.data.data.Menus.nameOfMenu);
                let newMen = [];
                for (let i = 0; i < response.data.data.Menus.length; i++) {
                    newMen[i] = response.data.data.Menus[i].nameOfMenu.toString();
                }
                setMenuName(newMen);
            })
            .catch((error) => {
                setSnackbarText("Įvyko klaida!");
                setSnackbarSeverity("error");
                handleSnackbar("open");
                console.log(error);
            });
    }


    function handleSubmit() {
        setSpinner(true);
        DayMenuPDF(selectedMenu1_3, selectedMenu4_7, getTokenSilently, lopselis, darzelis, darbuotojai);
        setTimeout(function () { setSpinner(spinner); }, 1500);

    }

    const handleChange = i => e => {

        if (e.target.id === 'lopselis') {
            let newLop = { ...lopselis };
            newLop.count = e.target.value;
            newLop.sum = newLop.count * newLop.cost;
            setLopselis(newLop);
        } else if (e.target.id === 'darzelis') {
            let newDarz = { ...darzelis };
            newDarz.count = e.target.value;
            newDarz.sum = newDarz.count * newDarz.cost;
            setDarzelis(newDarz);
        } else if (e.target.id === 'darbuotojai') {
            let newDarb = { ...darbuotojai };
            newDarb.count = e.target.value;
            newDarb.sum = newDarb.count * newDarb.cost;
            setDarbuotojai(newDarb);
        } else if (e.target.id === 'lopselisCost') {
            let newLopCost = { ...lopselis };
            newLopCost.cost = e.target.value;
            newLopCost.sum = newLopCost.count * newLopCost.cost;
            setLopselis(newLopCost);
        } else if (e.target.id === 'darzelisCost') {
            let newDarzCost = { ...darzelis };
            newDarzCost.cost = e.target.value;
            newDarzCost.sum = newDarzCost.count * newDarzCost.cost;
            setDarzelis(newDarzCost)
        } else if (e.target.id === 'darbuotojaiCost') {
            let newDarbCost = { ...darbuotojai };
            newDarbCost.cost = e.target.value;
            newDarbCost.sum = newDarbCost.count * newDarbCost.cost;
            setDarbuotojai(newDarbCost)
        } else if (e.target.name === "category1-3") {
            setSelectedMenu1_3(e.target.value);
        } else if (e.target.name === "category4-7") {
            setSelectedMenu4_7(e.target.value);
        }

    }

    return (
        <div className="CreateProduct">
            <div className="backBtn">
                <div className="backBtnContainer">
                    <Button variant="contained" color="secondary" className="backBtn" onClick={() => props.history.push('/menu')}>Atgal</Button>
                </div>
            </div>
            <div style={{ marginTop: "100px", color: "#FFFFFF" }}><h3>Valgiaraštis (Reikalavimas)</h3></div>

            <div className="MiscInputs">
                <div className="spacing">
                    <TextField1
                        inputProps={{
                            style: { color: '#FFFFFF', width: 100 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={lopselis.count || 0}
                        onChange={handleChange()}
                        error
                        label="Lopšelis"
                        id="lopselis"
                    />
                </div>
                <div className="MiscInputs">
                    <div className="spacing">
                        <TextField1
                            inputProps={{
                                style: { color: '#FFFFFF', width: 100 },
                                type: 'number',
                                step: '1',
                                min: '0'
                            }}
                            value={darzelis.count || 0}
                            onChange={handleChange()}
                            error
                            label="Darželis"
                            id="darzelis"
                        />
                    </div>
                    <div className="spacing">
                        <TextField1
                            inputProps={{
                                style: { color: '#FFFFFF', width: 100 },
                                type: 'number',
                                step: '1',
                                min: '0'
                            }}
                            value={darbuotojai.count || 0}
                            onChange={handleChange()}
                            error
                            label="Darbuotojai"
                            id="darbuotojai"
                        />
                    </div>
                </div>
            </div>
            <div className="MiscInputs">
                <div className="spacing">
                    <TextField1
                        inputProps={{
                            style: { color: '#FFFFFF', width: 100 },
                            type: 'number',
                            step: '0.01',
                            min: '0'
                        }}
                        value={lopselis.cost || 0}
                        onChange={handleChange()}
                        error
                        label="Lopš. vertė"
                        id="lopselisCost"
                    />
                </div>
                <div className="MiscInputs">
                    <div className="spacing">
                        <TextField1
                            inputProps={{
                                style: { color: '#FFFFFF', width: 100 },
                                type: 'number',
                                step: '0.01',
                                min: '0'
                            }}
                            value={darzelis.cost || 0}
                            onChange={handleChange()}
                            error
                            label="Darž. vertė"
                            id="darzelisCost"
                        />
                    </div>
                    <div className="spacing">
                        <TextField1
                            inputProps={{
                                style: { color: '#FFFFFF', width: 100 },
                                type: 'number',
                                step: '0.01',
                                min: '0'
                            }}
                            value={darbuotojai.cost || 0}
                            onChange={handleChange()}
                            error
                            label="Darb. vertė"
                            id="darbuotojaiCost"
                        />
                    </div>
                </div>
            </div>
            <div className="MiscInputs">
                <div className="spacing">
                    <TextField1
                        inputProps={{
                            style: { color: '#FFFFFF', width: 100 },
                            type: 'number',
                            step: '1',
                            min: '0'
                        }}
                        value={lopselis.sum.toFixed(2) || ''}
                        onChange={handleChange()}
                        error
                        disabled
                        label="Lopš. suma"
                        id="lopselisSum"
                    />
                </div>
                <div className="MiscInputs">
                    <div className="spacing">
                        <TextField1
                            inputProps={{
                                style: { color: '#FFFFFF', width: 100 },
                                type: 'number',
                                step: '1',
                                min: '0'
                            }}
                            value={darzelis.sum.toFixed(2) || ''}
                            onChange={handleChange()}
                            error
                            disabled
                            label="Darž. suma"
                            id="darzelisSum"
                        />
                    </div>
                    <div className="spacing">
                        <TextField1
                            inputProps={{
                                style: { color: '#FFFFFF', width: 100 },
                                type: 'number',
                                step: '1',
                                min: '0'
                            }}
                            value={darbuotojai.sum.toFixed(2) || ''}
                            onChange={handleChange()}
                            error
                            disabled
                            label="Darb. suma"
                            id="darbuotojaiSum"
                        />
                    </div>
                </div>
            </div>

            <div className="Select">
                <InputLabel id="demo-simple-select-helper-label" style={{ color: "#FFFFFF" }}>Valgiaraštis</InputLabel>
                <Select
                    value={selectedMenu1_3}
                    onChange={handleChange()}
                    displayEmpty
                    label="Valgiaraštis"
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    name="category1-3"
                    noWrap
                    style={{
                        minWidth: "355px",
                        color: "#FFFFFF",
                        icon: "#FFFFFF"
                    }}
                >
                    {menuName.length ?
                        menuName.map((row) => (
                            <MenuItem value={row}>{row}</MenuItem>
                        ))
                        :
                        <MenuItem value="">Nėra</MenuItem>
                    }

                </Select>
            </div>
            {/* <div className="Select">
                <InputLabel id="demo-simple-select-helper-label" style={{ color: "#FFFFFF", marginTop: "10px" }}>Valgiaraštis 4-7m.</InputLabel>
                <Select
                    value={selectedMenu4_7}
                    onChange={handleChange()}
                    displayEmpty
                    label="Valgiaraštis"
                    className={classes.select}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    name="category4-7"
                    noWrap
                    style={{
                        minWidth: "355px",
                        color: "#FFFFFF",
                        icon: "#FFFFFF"
                    }}
                >
                    {menuName.length ?
                        menuName.map((row) => (
                            <MenuItem value={row}>{row}</MenuItem>
                        ))
                        :
                        <MenuItem value="">Nėra</MenuItem>
                    }

                </Select>
            </div> */}
            {spinner ? <CircularProgress color="primary" size={68} disableShrink style={{ marginLeft: "30px" }} thickness={5} />
                :
                <Button onClick={handleSubmit} variant="contained" color="secondary" className={classes.button} style={{ alignSelf: "center" }}>Generuoti PDF</Button>
            }
            <Snackbar open={snackbarState} autoHideDuration={6000} onClose={() => handleSnackbar("close")}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert onClose={() => handleSnackbar("close")} severity={snackbarSeverity}>
                    {snackbarText}
                </Alert>
            </Snackbar>
        </div >
    );
}

export default withRouter(CreateDayMenu);